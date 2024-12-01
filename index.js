const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./modal/chat");
const path = require("path");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
main()
  .then((res) => console.log("connection establish"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("chats.ejs", { chats });
});

app.get("/chat/add", (req, res) => {
  res.render("new.ejs");
});

app.post("/chat", (req, res) => {
  let { from, msg, to } = req.body;
  const chat = new Chat({
    from: from,
    msg: msg,
    to: to,
    created_at: new Date(),
  });
  chat
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.redirect("/chats");
});

app.get("/chat/:id/edit", async (req, res) => {
  let { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let chat = await Chat.findByIdAndUpdate(
    id,
    { $set: { msg: msg } },
    { runValidators: true }
  );
  res.redirect("/chats");
});

app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  const chat = await Chat.findByIdAndDelete(id);
  console.log(chat);
  res.redirect("/chats");
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
});

const express = require("express");
const app = express();
const PORT = 3000;
const bcrypt = require("bcrypt");

const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Fatma" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }

  console.log(users);
});

app.listen(PORT, () => console.info(`App Listeing on Port ${PORT}`));

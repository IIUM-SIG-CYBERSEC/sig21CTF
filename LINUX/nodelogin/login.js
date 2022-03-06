const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");
const flag_1 = "sig21CTF{wh0_s4id_1_need_passw0rd_t0_l0g1n}";
const port = 3000

os.hostname() === "arch-uefi"
  ? (connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "abuyusif",
      password: "abuyusif",
      database: "nodelogin",
    }))
  : (connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "abuyusif",
      password: "hfST9bmsQeFWkaQS",
      database: "nodelogin",
    }));

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

var setCustomHeaderFunc = function (request, response, next) {
  if (request.session.loggedin) {
    response.set("flag1", flag_1);
    response.set("ssh", "sshuser:qP9jjbYeWzf7zs9t:2222");
  } else {
    response.set("flag1", "sig21CTF{login_to_get_the_flag_hehe}");
  }
  next();
};

app.all("/dash", setCustomHeaderFunc);

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", (request, response) => {
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
    username = username.toString().replace(";", "");
    username = username.toString().replace("'", "");
    password = password.toString().replace(";", "");
    password = password.toString().replace("'", "");
    const query =
      "SELECT * FROM accounts WHERE username = " +
      `"${username}"` +
      " AND password = " +
      `"${password}"`;
    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect("/home");
      } else {
        response.send("Incorrect Username and/or Password!");
      }
      response.end();
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/home", (request, response) => {
  if (request.session.loggedin) {
    response.redirect("/dash");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

app.get("/dash", (request, response) => {
  if (request.session.loggedin) {
    let alert = require("alert");
    alert(flag_1);
    response.sendFile(path.join(__dirname + "/dashboard.html"));
  } else {
    response.redirect("/");
  }
});

const sanitize = (value) => {
  blocked = {
    cat: "cat",
    less: "less",
    more: "more",
    strings: "strings",
    head: "head",
    tail: "tail",
    rm: "rm",
  };
  return Object.values(blocked).includes(value.split(" ")[0]);
};

app.post("/dash", (request, response) => {
  if (request.session.loggedin) {
    let command = request.body.command;
    !command
      ? response.send("Enter some command brooo!!!")
      : !sanitize(command)
      ? exec(`/bin/zsh -c "${command}"`, (error, stdout, stderr) => {
          // ? exec(command, (error, stdout, stderr) => {
          if (error) {
            response.send(`error: ${stderr}`);
            return;
          }
          if (stderr) {
            response.send(`error: ${stderr}`);
            return;
          }
          // console.log(stdout)
          response.send(stdout);
          response.end();
        })
      : response.send(
          `<b>${command.split(" ")[0]}</b> is blacklisted by the admin :(`
        );
  } else {
    response.send('<script>alert("Need to login")</script>');
    response.end();
  }
});

app.listen(port);

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", (req, res, next) => {
  res.send("<h1>User:" + req.body.username + "</h1>");
}); //will trigger only incoming post request

// to reduce the below code from body we use body-parser
// app.use((req, res, next) => {
//   let body = "";
//   req.on("end", () => {
//     const userName = body.split("=")[1];
//     if (userName) {
//       req.body = { name: userName };
//     }
//     next();
//   });
//   req.on("data", (chunk) => {
//     body += chunk;
//   });
// });

//middleware
app.get("/", (req, res, next) => {
  // no need to check of req.body as using body parser
  //   if (req.body) {
  //     return res.send("<h1>User:" + req.body.name + "</h1>");
  //   }
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );

  // next();//to send to next middleware if not added then will not reach to next middleware
});

app.listen(5000);

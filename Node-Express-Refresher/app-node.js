// http request
const http = require("http");

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST");
  console.log(req.method, req.url);
  //   res.setHeader("Content-Type", "text/plain"); //for not considering as html
  //   res.end("<h1>Success!</h1>"); //not final way to write like this

  if (req.method === "POST") {
    let body = "";
    req.on("end", () => {
      const userName = body.split("=")[1];
      res.end("<h1>" + userName + "</h1>");
    });
    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    res.setHeader("Content-Type", "text/html"); //for not considering as html

    res.end(
      '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
    );
  }
});

// need to manualy shutdown
server.listen(5000);

// Basic write file
// const fs = require("fs");

// const userName = "Kush";

// fs.writeFile("user-data.txt", "Name: " + userName, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("WROTE FILE");
// });

var dotenv = require("dotenv");
var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();
// var dotenv = require("dotenv");
var path = require("path");
let alert = require('alert');  
var md5 = require('md5');
const fs = require("fs")
const PORT = process.env.PORT || 8080

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  }

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey)
const { request } = require("http");
const { render } = require("ejs");
const { send } = require("process");
app.use(express.json())

var connection = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b0b9390bf5e72c",
    password: "9cf8699f",
    database: "heroku_bdd562487c5b902"
  });

  

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    })
  );
var session_id = "";
var IsLogin = false;
var LogedUser = "";
// console.log(IsLogin + "dddd");
  app.get("/login", function(request, response) {
    if (request.IsLogin) {
      response.redirect("/home");
    } else {
    response.sendFile(path.join(__dirname + "/login2.html"));
    }

  });

  app.get('/loginfail',function(req,res){
    res.render('login_fail');
});
app.get('/success',function(req,res){
  res.render('login_success');
});

  app.post("/auth", function(request, response) {
    var username = request.body.username;
    var password = md5(request.body.password);
    if (username && password) {
      connection.query(
        "SELECT * FROM Account WHERE username = ? AND password = ?",
        [username, password],
        function(error, results, fields) {
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            request.session.uid = results[0].uid;
            IsLogin = request.session.loggedin;
            LogedUser = request.session.username;
            session_id = request.session.uid;
            
            // response.redirect("/home");
            // var usernameses = request.session.username;
            response.redirect("/success");
          } else {
            
            response.redirect("/loginfail");
            // delay + alert

            // setInterval(function(){ 
            //   response.send(
            //     alert("hellpword")
            //     )}, 3000);


            // ending
          }
          response.end();
        }
      );
    } else {
      response.send("Please enter Username and Password!");
      response.end();
    }
  });

app.get("/register",function(req,res){
  res.sendFile(path.join(__dirname + "/register.html"))
});

app.get("/home", function(request, response) {
    // response.sendFile(path.join(__dirname + "/home.html"));
    // console.log(request.params.abc);
    // response.send("hello world ! ");
    response.render("home.ejs",{
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin
    });
  });
  app.get("/", function(request, response) {
    // response.sendFile(path.join(__dirname + "/home.html"));
    // console.log(request.params.abc);
    response.send("hello world ! ");
    // response.render("home.ejs",{
    //   username : LogedUser,
    //   session_id : session_id,
    //   isLoggedIn : IsLogin
    // });
  });

  app.get("/about", function(request, response) {
    response.render("about.ejs",{
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin
    });
  });
  // app.get("/order", function(request, response) {
  //   // get data from sql
  //   connection.query("SELECT * FROM Product", (err, result) => {
  //     // console.log(result);
  //     response.render("order",{
  //       username : LogedUser,
  //       session_id : session_id,
  //       isLoggedIn : IsLogin,
  //       productlist : result
  //     });
  //     });
  // });
  // ----- order old--------
  // app.get("/order", function(request, response) { 
  //   // get data from sql
  //   connection.query("SELECT * FROM Product", (err, result) => {
  //     // console.log(result);
  //     response.render("cartt",{
  //       username : LogedUser,
  //       session_id : session_id,
  //       isLoggedIn : IsLogin,
  //       productlist : result
  //     });
  //     });
  // });
  app.get("/order", function(request, response) {
    // get data from sql
    fs.readFile("items.json",function (error,data) {
      if(error){
          res.status(500).end()
      } else {
        connection.query("SELECT * FROM Product", (err, result) => {
          // console.log(result);
          response.render("store",{
            stripePublicKey: stripePublicKey,
            items: JSON.parse(data),
            username : LogedUser,
            session_id : session_id,
            isLoggedIn : IsLogin,
            productlist : result
          });
          });
          // res.render("store",{
          //     stripePublicKey: stripePublicKey,
          //     items: JSON.parse(data),
          //     username : LogedUser,
          //     session_id : session_id,
          //     isLoggedIn : IsLogin
          // })
      }
  })

  });
  app.post("/order", function(request, response) {
    const product_id = request.body.pid;
    const amount = request.body.quantity;
    const uid = request.body.uid;
    const pname = request.body.pname;
    const imurl = request.body.imgurl;
    // console.log(uid + " this is uid");
    const post = {
      Product_ID:product_id,
      U_ID:uid,
      quantity:amount,
      imgurl : imurl,
      Product_name : pname
    };
    
    // console.log(post + " this is order for input");
  
    connection.query("INSERT INTO Inventory SET ?", post, err => {
      console.log("Data Inserted");
      console.log(err);
      return response.redirect("/cart");
    });
  
  });
  app.get("/product1", function(request, response) {
    response.render("product1.ejs",{
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin
    });
  });
  app.get("/product2", function(request, response) {
    response.render("product2.ejs",{
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin
    });
  });
  app.get("/review", function(request, response) {
    response.render("review")
  });
  app.get("/why", function(request, response) {
    response.render("why")
  });

  app.get('/gg', function(req, res){
    res.sendFile(path.join(__dirname + '/home.html'));
  }); 
  
  app.get("/webboard", (req, res) => {
    connection.query("SELECT * FROM Transaction_u_p", (err, result) => {
      res.render("index.ejs", {
        posts: result,
        username: req.session.username
      });
    // console.log(result);
    });
    res.send("hi " + req.session.username);
});
app.post("/orderitem", (req, res) => {
  // console.log(itemID);
  const itemID = req.body.id;
  // console.log(itemID + " item id");
  connection.query("INSERT INTO Transaction_u_p SET ?", itemID, err => {
    console.log("Data Inserted");
    return res.redirect("/webboard");
  });
  res.send("this is order item -> " + itemID);
});
app.get("/contact",(req,res) => {
  res.render("contact.ejs",{
    username : LogedUser,
      session_id : session_id,
    isLoggedIn : IsLogin
  });
  // console.log(IsLogin + "IN CONTACT");
});
app.get("/signout", function(request, response) {
  request.session.destroy(function (err) {
        // response.send("Signout ready!");
        IsLogin = false;
        response.redirect("/login");
        response.end();
  });
});
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
app.post("/regist", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const birthday = req.body.birthday;
  const sex = req.body.sex;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  const post = {
    uid:uuidv4(),
    username: username,
    password: md5(password),
    email: email,
    firstname:firstname,
    lastname:lastname,
    DOB:birthday,
    sex:sex,
    address:address,
    phone:phone

  };
  // console.log(post + " post in /regist");

  connection.query("INSERT INTO Account SET ?", post, err => {
    console.log("Data Inserted");
    console.log(err);
    return res.redirect("/login");
  });

});
app.get("/pmt",(req,res) => {
  res.sendFile(path.join(__dirname + "/payment.html"));
});
app.get("/charge",(req,res) => {
  omise.charges.create({
    'amount': '100000',
    'currency': 'thb',
    'card': 'tokn_test_4xs9408a642a1htto8z'
  }, function(err, charge) {
    /* Response. */
  });
});
app.get("/list",(req,res) => {
  connection.query("SELECT * FROM Account", (err, result) => {
    res.render("list.ejs", {
      posts: result,
    });
  // console.log(result);
  });
});
// app.get("/cart2",(req,res) => {
//   connection.query("SELECT * FROM Inventory WHERE uid = ?",[session_id], (err, result) => {
//     response.render("cart2.ejs",{
//       username : LogedUser,
//       session_id : session_id,
//       isLoggedIn : IsLogin,
//       posts : result
//       });
//       console.log(result + " res in cart2");
//     });
app.get("/cart2",(req,res) => {
  // console.log(session_id + " session_id cart2")
  connection.query("SELECT * FROM Inventory WHERE U_ID = ?",[session_id], (err, result) => {
    // console.log(result + " res in cart2");
    // res.send("hi");
    res.render("cart2.ejs", {
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin,
      posts : result
    });
  });
});
app.get("/cart",(req,res) => {
  // console.log(session_id + " session_id cart")
  connection.query("SELECT * FROM Inventory WHERE U_ID = ?",[session_id], (err, result) => {
    // console.log(result + " res in cart");
    // res.send("hi");
    res.render("cart.ejs", {
      username : LogedUser,
      session_id : session_id,
      isLoggedIn : IsLogin,
      posts : result
    });
  });
});
app.post("/auth2", function(request, response) {
  var username = "1";
  var password = md5("1");
  if (username && password) {
    connection.query(
      "SELECT * FROM Account WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          request.session.uid = results[0].uid;
          IsLogin = request.session.loggedin;
          LogedUser = request.session.username;
          session_id = request.session.uid;
          
          // response.redirect("/home");
          // var usernameses = request.session.username;
          response.redirect("/success");
        } else {
          
          response.redirect("/loginfail");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
app.get("/2", function(request, response) {
  response.sendFile(path.join(__dirname + "/fk.html"));
});
app.get("/profile", function(request, response) {
  if (IsLogin) {
    connection.query("SELECT * FROM Account WHERE uid = ?",[session_id], (err, result) => {
      // console.log(session_id + "  sess id in profile" + result);
      response.render("profile.ejs", {
        username : LogedUser,
        session_id : session_id,
        isLoggedIn : IsLogin,
        profile : result
      });
    });
  } else {
    response.send("END!");
    response.end();
  }
});
app.post("/profile", function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const birthday = request.body.DOB;
  const sex = request.body.sex;
  const email = request.body.email;
  const address = request.body.address;
  const phone = request.body.phone;

  connection.query(
    "UPDATE Account SET username = ?,password = ?,firstname = ?,lastname = ?,DOB = ?,sex = ?,email = ?,address = ?,phone = ? WHERE uid = ?",
    [username, password, firstname, lastname,birthday,sex,email,address,phone,session_id],
    (err, results) => {
      console.log("err -> " + err);
      // console.log(results + " <-- res " + session_id);
      response.redirect("/profile");
    }
  );

});

app.post("/test",function(req,res){
  console.log(req.body)
})

app.post("/cartt",(req,res)=>{
  console.log(req.body);
res.send(
  "price recive = "
);
});
app.get("/test",(req,res) => {
res.render("cartt");
});

app.use("/store",function (req,res) {
  fs.readFile("items.json",function (error,data) {
      if(error){
          res.status(500).end()
      } else {
          res.render("store",{
              stripePublicKey: stripePublicKey,
              items: JSON.parse(data),
              username : LogedUser,
              session_id : session_id,
              isLoggedIn : IsLogin
          })
      }
  })
})

app.use("/purchase",function (req,res) {
  fs.readFile("items.json",function (error,data) {
      if(error){
          res.status(500).end()
      } else {
          const itemsJson = JSON.parse(data)
          const itemArray = itemsJson.music.concat(itemsJson.merch)
          let total = 0
          req.body.items.forEach(function(item){
              const itemJson = itemArray.find(function(i){
                  return i.id == item.id
              })
              total = total + itemJson.price * item.quantity
          })

          stripe.charges.create({
              amount: total,
              source: req.body.stripeTokenId,
              currency: 'thb'
              // currency: 'usd 55'
          }).then(function(){
              console.log('Charge Successful')
              res.json({message: 'successfully purchased items'})
          }).catch(function(){
              console.log("Charge Fail")
              res.status(500).end()
          })

      }
  })
})

  app.listen(PORT);
  console.log("running on port " + PORT);  
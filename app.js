//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const loadash = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

let homeValues = {
  firstPara: homeStartingContent,
  posts: posts
};
let aboutValues = { description: aboutContent };
let contactValues = { description: contactContent };

function adjustString(str) {
  str = loadash.toLower(str);
  str = str.split(" ").join("-")
  return(str);
}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//get
app.get("/", function(req, res) {
  res.render("home", homeValues);
});
app.get("/about", function(req, res) {
  res.render("about", aboutValues);
});
app.get("/contact", function(req, res) {
  res.render("contact", contactValues);
});
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts", function(req, res) {
  res.render("post", homeValues);
});
app.get('/posts/:post', function (req, res) {
  let found = false;
  let element;

  posts.forEach(function(val) {
    if(val.url == req.params.post || val.url == adjustString(req.params.post)) {
      element = val;
      found = true;
    }
  });

  if(found)
    res.render("post", { posts: [element] });
  else {
    console.log("url not found: /posts/" + req.params.post);
    res.redirect("/");
  }
});

//post
app.post("/compose", function(req, res) {
  let composePost = {
    title: req.body.title,
    post: req.body.post,
    url: adjustString(req.body.title)
  };
  posts.push(composePost);
  res.redirect("/");
});

//start server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

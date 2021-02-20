const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology:true})
const app=express();

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

const postSchema={
  name:String,
title:String,
content:String
}

const Post=mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,foundPosts){
      res.render('home',{posts:foundPosts});
    })
  })

app.get("/about",function(req,res){
  res.render('about',{aboutPage:aboutContent});
})
app.get("/contact",function(req,res){
  res.render('contact',{contactPage:contactContent});
})
app.get("/compose",function(req,res){
  res.render('compose');
})

app.get("/posts/:postId",function(req,res){
  let id=req.params.postId;
   Post.findOne({_id:id},function(err,found){
       res.render('post',{name:found.name,postTitle:found.title,postBody:found.content})
   })
})
app.post("/compose",function(req,res){
  const post=new Post({
    name:req.body.f_name,
    title:req.body.title,
    content:req.body.post
  })
  post.save(function(){
  res.redirect("/");
})
})
app.post("/",function(req,res){
res.redirect("/compose");
})

app.listen(3000,function(){
  console.log("server is running");
})

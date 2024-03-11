const { Blog, User } = require("../model/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
module.exports = {
  createAccount: async (req, res) => {
    const { username, emailId, password } = req.body;
    console.log(username);
    const existingUser = await User.findOne({
      $or: [{ username }, { emailId }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      username,
      emailId,
      password: hashedPassword,
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "username or password is incorrect" });
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(400).json({ message: "password is incorrect" });
      }

      const token = jwt.sign(
        {
          userid: user.id,
          username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ success: "user logged in successfully", token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "internal error" });
    }
  },

  userList: async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
  },
  createBlog: async (req, res) => {
    const { title, content, author, createdAt } = req.body;
    console.log(title);
    console.log(content);
    console.log(author);
    console.log(createdAt);
    const blog = await Blog.create({
      title,
      content,
      author,
      createdAt,
    });
    res.status(200).json({ message: "blog created successfully" });
  },
  getAllBlogs: async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  },

  getById: async (req, res) => {
    const id = req.params.id;
    console.log("ID:", id); // Log the ID value
    console.log("ID Length:", id.length); // Log the length of the ID
    console.log(id, "................................");
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.status(200).json({ blog });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
      console.log(id);
      try {
          const {title,content,author,createdAt} = req.body
         const blog = await Blog.findByIdAndUpdate(id, {
           title,
           content,
           author,
           createdAt,
         });
         if (!blog) {
           res.status(400).json({ error: "blog not found to update" });
         }
         res.status(200).json({ blog });
      } catch (error) {
        res.status(500).json({ error: "internal error" });
      }
     
    },
    delete: async(req, res)=>{
        const id = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.status(200).json({message:"deleted succesfully"})
  }
};

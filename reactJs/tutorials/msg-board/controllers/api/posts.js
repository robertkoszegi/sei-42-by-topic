const Post = require("../../models/Post");

async function index(req, res) {
  try {
    const allPosts = await Post.find({});
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(400).json({ error: err.message, success: false });
  }
}

async function create(req, res) {
  //req.body = {content: "here is my new message"}
  const newPost = new Post(req.body);
  const response = await newPost.save();

  // Alternative ---> await Post.create(req.body)

  res.status(200).send(response);
}

module.exports = {
  index,
  create,
};

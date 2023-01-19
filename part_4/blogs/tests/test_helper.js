const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "How to go fishing",
    author: "Marco Tidu",
    url: "www.example.com",
    likes: 12,
  },
  {
    title: "My day in Umag",
    author: "Marco Tidu",
    url: "www.example.com",
    likes: 120,
  },
  {
    title: "Today I have an interview!",
    author: "Marco Tidu",
    url: "www.example.com",
    likes: 1200,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Not a fancy title",
    author: "Marco Tidu",
    url: "www.example.com",
    likes: 12,
  });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");
const { lastIndexOf } = require("lodash");
const blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("blog post should have 'id' property by default", async () => {
  const blogPost = await Blog.findOne();

  expect(blogPost.id).toBeDefined();
});

test("successful HTTP POST request", async () => {
  const newBlog = {
    title: "When we will receive an answer?",
    author: "Marco Tidu",
    url: "www.example.com",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("How to go fishing");
});

test("Likes property defaults to 0 if missing in request", async () => {
  const newBlog = {
    title: "Is this post worth 1 like?",
    author: "Marco Tidu",
    url: "www.example.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const allBlogs = await helper.blogsInDb();
  const lastBlog = allBlogs.find(
    (blog) => blog.title === "Is this post worth 1 like?"
  );

  expect(lastBlog.likes).toBe(0);
});

test("Missing title or url returns 400 Bad Request", async () => {
  const newBlog1 = {
    url: "http://www.example.com",
    content: "This is the content of my awesome blog.",
  };

  await api.post("/api/blogs").send(newBlog1).expect(400);

  const newBlog2 = {
    title: "My awesome blog",
    content: "This is the content of my awesome blog.",
  };

  await api.post("/api/blogs").send(newBlog2).expect(400);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

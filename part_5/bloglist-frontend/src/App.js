import { useState, useEffect } from "react";
import "./App.css";
import Blog from "./components/Blog";
import FormInputs from "./components/FormInputs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("USER", user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(`${error.response.data.error}`);
      console.log(error.response.data);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload(false);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    console.log("BLOG OBJECT", blogObject);
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage(`${blogObject.title} has been added to the blogs!`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    });
  };

  const deleteBlog = (id) => {
    const blogId = blogs.find((blog) => blog.id === id);
    const blogToDelete = { ...blogId };
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    if (window.confirm(`Do you want to delete ${blogToDelete.title}?`)) {
      blogService.deleteBlog(blogToDelete.id);
      setMessage(
        `${blogToDelete.title} successfully deleted from the phonebook!`
      );
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setBlogs([...updatedBlogs]);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? "none" : "" };
    const showWhenVisible = { display: formVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <FormInputs
            addBlog={addBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleURLChange={handleURLChange}
          />
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const increaseLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const likes = blog.likes + 1;
    const newBlog = { ...blog, likes };
    blogService.update(blog.id, newBlog).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
    });
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Notification message={message} />

        <button onClick={handleLogout}>Logout</button>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={increaseLikes}
            deleteBlog={deleteBlog}
          />
        ))}

        {user !== null && blogForm()}
        {user === null && ""}
      </div>
    );
  }
};

export default App;

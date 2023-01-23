import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, increaseLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!visible) {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view details</button>
        <button onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    );
  } else {
    return (
      <div className="blog" style={blogStyle}>
        <ul>
          <li>Title: {blog.title}</li>
          <li>Blog Author:{blog.author}</li>
          <li>Url: {blog.url}</li>
          <li>
            Likes: {blog.likes}
            <button
              title="like-button"
              onClick={() => increaseLikes(blog.id)}
            >
              like
            </button>
          </li>
          <button onClick={() => setVisible(false)}>back</button>
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </ul>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;

import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, deleteBlog }) => {
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
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view details</button>
        <button onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <ul>
          <li>{blog.title}</li>
          <li>{blog.author}</li>
          <li>{blog.url}</li>
          <li>{blog.likes}</li>
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

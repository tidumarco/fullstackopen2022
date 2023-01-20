function FormInputs({
  title,
  author,
  url,
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
}) {
  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </label>
        <br />
        <label>
          URL:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleURLChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormInputs;

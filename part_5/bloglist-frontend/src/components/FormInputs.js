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
      <form className="form" onSubmit={addBlog}>
        <label>
          Title:
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={handleTitleChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={handleAuthorChange}
          />
        </label>
        <br />
        <label>
          URL:
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            placeholder="url"
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

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import FormInputs from "../components/FormInputs";

describe("Blog component tests", () => {
  let mockHandler = jest.fn();
  const user = userEvent.setup();
  let blog = {
    title: "A nice blog",
    author: "Johnny Depp",
    url: "www.example.com",
    likes: 17,
  };

  test("renders title and author", () => {
    const utils = render(<Blog blog={blog} onClick={mockHandler} />);

    expect(utils.container).toHaveTextContent("A nice blog", "Johnny Depp");
  });

  test("clicking the view button displays url and number of likes", async () => {
    const utils = render(<Blog blog={blog} onClick={mockHandler} />);

    const button = screen.getByText("view details");
    await user.click(button);

    expect(utils.container).toHaveTextContent("www.example.com");
    expect(utils.container).toHaveTextContent(17);
  });

  test("<FormInputs /> updates parent state and calls onSubmit", async () => {
    const addBlog = jest.fn();
    const handleTitleChange = jest.fn();
    const handleAuthorChange = jest.fn();
    const handleURLChange = jest.fn();

    const component = render(
      <FormInputs
        addBlog={addBlog}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleURLChange={handleURLChange}
      />
    );
    const inputTitle = component.getByPlaceholderText("title");
    const inputAuthor = component.getByPlaceholderText("author");
    const inputUrl = component.getByPlaceholderText("url");
    const form = component.container.querySelector("form");

    fireEvent.change(inputTitle, {
      target: { value: "Go To Condition Considered Harmful" },
    });
    fireEvent.change(inputAuthor, { target: { value: "John Snow" } });
    fireEvent.change(inputUrl, { target: { value: "www.example.com" } });

    fireEvent.submit(form);

    expect(addBlog).toHaveLength(1);
    // expect(addBlog.mock.calls[0][0].title).toBe(
    //   "Go To Condition Considered Harmful"
    // );
  });
  test("clicking like twice works", () => {
    render(
      <Blog blog={blog} onClick={mockHandler} increaseLikes={mockHandler} />
    );
    const button = screen.getByText("view details");
    fireEvent.click(button);
    const likeButton = screen.getByTitle("like-button");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});

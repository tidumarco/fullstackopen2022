import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Blog component tests", () => {
  let mockHandler = jest.fn();

  let blog = {
    title: "A nice blog",
    author: "Johnny Depp",
    url: "www.example.com",
    likes: 17,
  };

  test("renders title and author", () => {
    const component = render(<Blog blog={blog} onClick={mockHandler} />);

    expect(component.container).toHaveTextContent("A nice blog", "Johnny Depp");
  });

  test("clicking the view button displays url and number of likes", async () => {
    const component = render(<Blog blog={blog} onClick={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("view details");
    await user.click(button);

    expect(component.container).toHaveTextContent("www.example.com");
    expect(component.container).toHaveTextContent(17);
  });
  
  test("clicking the view button displays url and number of likes", async () => {
    const component = render(<Blog blog={blog} onClick={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("view details");
    await user.click(button);

    expect(component.container).toHaveTextContent("www.example.com");
    expect(component.container).toHaveTextContent(17);
  });
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("renders title and author", () => {
  const blog = {
    title: "A nice blog",
    author: "Johnny Depp",
    url: "www.example.com",
    likes: 17,
  };
  const { container } = render(<Blog blog={blog} />);

  screen.debug();

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("A nice blog", "Johnny Depp");
});

//   test("clicking the view button displays url and number of likes", () => {
//     const component = render(
//       <Blog
//         blog={blog}
//         updateBlog={mockUpdateBlog}
//         deleteBlog={mockDeleteBlog}
//       />
//     );

//     const button = component.getByText("view");
//     fireEvent.click(button);

//     expect(component.container).toHaveTextContent("https://reactpatterns.com/");

//     expect(component.container).toHaveTextContent("7");
//   });

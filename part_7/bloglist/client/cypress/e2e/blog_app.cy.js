/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Marco Tidu",
      username: "tidumarco",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("login is shown", function () {
    cy.contains("Log in to application");
  });
  describe("when logged in", function () {
    it("a new blog can be created", function () {
      cy.get("#username").type("tidumarco");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("www.cypress.com");
      cy.contains("Submit").click();
      cy.contains("a blog created by cypress");
    });
    it("an user can like a blog", function () {
      cy.get("#username").type("tidumarco");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("www.cypress.com");
      cy.contains("Submit").click();
      cy.contains("a blog created by cypress");
      cy.contains("view details").click();
      cy.contains("like").click();
    });
  });
  it("user who created a blog can delete it", function () {
    cy.get("#username").type("tidumarco");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("new blog").click();
    cy.get("#title").type("Nothing else matters");
    cy.get("#author").type("Edgar Allan Poe");
    cy.get("#url").type("www.edgar.com");
    cy.contains("Submit").click();

    cy.contains("Nothing else matters").click();

    cy.get("#delete").click();

    cy.get("html").should("not.contain", "Nothing else matters");
  });
  describe("Blogs ordered by number of likes", function () {
    beforeEach(function () {
      cy.get("#username").type("tidumarco");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("test1");
      cy.get("#author").type("Edgar Allan Poe");
      cy.get("#url").type("www.edgar.com");
      cy.contains("Submit").click();

      cy.get("#title").type("test2");
      cy.get("#author").type("Edgar Allan Joe");
      cy.get("#url").type("www.edgar2.com");
      cy.contains("Submit").click();

      cy.get("#title").type("test3");
      cy.get("#author").type("Edgar Allan Doe");
      cy.get("#url").type("www.edgar3.com");
      cy.contains("Submit").click();

      cy.contains("test1").parent().parent().as("blog1");
      cy.contains("test2").parent().parent().as("blog2");
      cy.contains("test3").parent().parent().as("blog3");
    });

    it("they are ordered by number of likes", function () {
      cy.get("@blog1").contains("view").click();
      cy.get("@blog2").contains("view").click();
      cy.get("@blog3").contains("view").click();
      cy.get("@blog1").contains("like").as("like1");
      cy.get("@blog2").contains("like").as("like2");
      cy.get("@blog3").contains("like").as("like3");

      cy.get("@like2").click();
      cy.wait(500);
      cy.get("@like1").click();
      cy.wait(500);
      cy.get("@like1").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);
      cy.get("@like3").click();
      cy.wait(500);

      cy.get(".blog").then((blogs) => {
        cy.wrap(blogs[0]).contains("3");
        cy.wrap(blogs[1]).contains("2");
        cy.wrap(blogs[2]).contains("1");
      });
    });
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tidumarco");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
    });
    it("fails with wrong credentials", function () {
      it("user can login", () => {
        cy.get("#username").type("tidumarco");
        cy.get("#password").type("piero");
        cy.get("#login-button").click();
      });
    });
  });
});

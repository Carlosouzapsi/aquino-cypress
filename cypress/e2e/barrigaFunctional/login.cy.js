/// <reference types="Cypress" />
import loginPage from "../../support/pages/login";

describe("login", function () {
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
  };

  before(function () {
    cy.visit("/");
  });

  it("should do login successfully", function () {
    loginPage.doLogin(user.email, user.password);

    const msg = `Bem vindo, ${user.name}!`;

    loginPage.toast.shouldHaveMsg(msg);
  });
});

/// <reference types="Cypress" />
import loginPage from "../../support/pages/login";

describe("login", function () {
  before(function () {
    cy.apiLogin();
    cy.visit("/");
  });

  it("should do login successfully", function () {
    const user = {
      name: "carlos souza",
      email: "carlos.souza@email.com",
      password: "pwd123",
    };
    loginPage.doLogin(user.email, user.password);

    const msg = `Bem vindo, ${user.name}!`;

    loginPage.toast.shouldHaveMsg(msg);
  });
});

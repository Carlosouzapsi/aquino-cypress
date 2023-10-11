/// <reference types="Cypress" />
import loginPage from "../../support/pages/login";
import buildEnv from "../../support/buildEnv";
import { user } from "../../support/factories";

describe("login", function () {
  before(function () {
    buildEnv();
    cy.visit("/");
  });

  it("should do login successfully", function () {
    loginPage.doLogin(user.email, user.password);

    const msg = `Bem vindo, ${user.name}!`;
    loginPage.toast.shouldHaveMsg(msg);
  });
});

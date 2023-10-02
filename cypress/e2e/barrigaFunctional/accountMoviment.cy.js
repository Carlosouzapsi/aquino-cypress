import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import AccountMovimentPage from "../../support/pages/AccountMoviment";

import { faker } from "@faker-js/faker";

describe("Account moviment", function () {
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
    accountName: faker.string.alpha(5),
  };
  beforeEach(function () {
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
    header.navToAccounts();
  });

  after(function () {
    header.resetAccounts();
  });

  it.only("", function () {
    cy.log("test");
  });
});

import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import AccountMovimentPage from "../../support/pages/AccountMoviment";

import { faker } from "@faker-js/faker";

describe.skip("Account moviment", function () {
  // Considerar usar um arquivo de fixture ou arquivo de factories
  const accMovData = {
    descricao: "Desc",
    valor: "100",
    interessado: "TestInteressado",
  };
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
    accountName: faker.string.alpha(5),
  };
  before(function () {
    // Refatorar, cadastrar via API no futuro.
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
    accountPage.addAccount(user.accountName);
    accountPage.accountNameShouldBeVisible(user.accountName);
    cy.pause();
  });
  beforeEach(function () {
    header.navToAccountMovement();
  });

  after(function () {
    header.resetAccounts();
  });

  it.only("Should create a transaction sucessfully", function () {
    AccountMovimentPage.addAccountMov(
      accMovData.descricao,
      accMovData.valor,
      accMovData.interessado
    );
    cy.log("test");
  });
});

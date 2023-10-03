import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import accountMovimentPage from "../../support/pages/AccountMoviment";

import { faker } from "@faker-js/faker";

describe("Account moviment", function () {
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
    accountName: faker.string.alpha(5) + " viaAPI",
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiAddAccount(user.accountName);
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });
  beforeEach(function () {
    header.navToAccountMovement();
  });

  after(function () {
    header.resetAccounts();
  });
  // TODO
  it.only("Should create a transaction sucessfully", function () {
    accountMovimentPage.addAccountMov(
      accMovData.descricao,
      accMovData.valor,
      accMovData.interessado
    );
    cy.log("test");
  });
});

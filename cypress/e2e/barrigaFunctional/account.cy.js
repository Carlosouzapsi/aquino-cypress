import loginPage from "../../support/pages/login";
import homePage from "../../support/pages/home";
import accountPage from "../../support/pages/accounts";
import header from "../../support/components/header";

import { faker } from "@faker-js/faker";

describe("Account", function () {
  // usar massa de dados em fixture ou factories
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
    accountName: faker.string.alpha(5),
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiResetAccounts();
  });
  beforeEach(function () {
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });
  it("should create an account successfully", function () {
    const newAccount = "newAccountTestUI";
    header.navToAccounts();
    accountPage.addAccount(newAccount);
    accountPage.accountNameShouldBeVisible(newAccount);

    const msg = "Conta inserida com sucesso!";
    accountPage.toast.shouldHaveMsg(msg);
  });
  it("should update an account successfully", function () {
    const newAccount = "newAccountUpdate";
    cy.apiAddAccount(newAccount);
    header.navToAccounts();
    const newAccountUpdated = "AccUpdated";

    // Preciso refatorar o page object esse locator pode ser util na hora de excluir
    accountPage.accountNameShouldBeUpdated(newAccount, newAccountUpdated);
  });
  // it.skip("should remove an account successfully", function () {});

  it("should not create an account with same name", function () {
    const sameAccount = "sameAccountName";
    cy.apiAddAccount(sameAccount);

    header.navToAccounts();
    accountPage.addAccount(sameAccount);

    const msg = "Erro: Error: Request failed with status code 400";
    accountPage.toast.shouldHaveMsg(msg);
  });
});

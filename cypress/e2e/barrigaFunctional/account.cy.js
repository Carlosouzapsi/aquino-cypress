import loginPage from "../../support/pages/login";
import homePage from "../../support/pages/home";
import accountPage from "../../support/pages/accounts";
import header from "../../support/components/header";

import { faker } from "@faker-js/faker";

describe("Account", function () {
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

  it("should create an account successfully", function () {
    accountPage.addAccount(user.accountName);
    accountPage.accountNameShouldBeVisible(user.accountName);

    const msg = "Conta inserida com sucesso!";
    accountPage.toast.shouldHaveMsg(msg);
  });
  // Teste possui dependência com o de cima, pensar em melhoria..
  it("should update an account successfully", function () {
    const newAccName = "AccEdited";
    accountPage.accountNameShouldBeUpdated(user.accountName, newAccName);
  });
  // it.skip("should remove an account successfully", function () {});
});

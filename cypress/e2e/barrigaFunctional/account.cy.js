import loginPage from "../../support/pages/login";
import homePage from "../../support/pages/home";
import accountPage from "../../support/pages/accounts";

describe("Account", function () {
  before(function () {
    cy.visit("/");
    const user = {
      name: "carlos souza",
      email: "carlos.souza@email.com",
      password: "pwd123",
    };
    loginPage.doLogin(user.email, user.password);
  });

  it("should create an account successfully", function () {
    const account = {
      accountName: "contaDeTeste",
    };

    homePage.goToAccounts();
    accountPage.addAccount(account.accountName);
    accountPage.accountNameShouldBeVisible(account.accountName);

    const msg = "Conta inserida com sucesso!";
    accountPage.toast.shouldHaveMsg(msg);
  });
  it.skip("should remove an account successfully", function () {});
});

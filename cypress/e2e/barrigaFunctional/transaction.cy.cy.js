import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import accountMovimentPage from "../../support/pages/AccountMoviment";
import balancePage from "../../support/pages/balance";

import { faker } from "@faker-js/faker";

// Need refactor:
describe("Account moviment", function () {
  // Considerar usar um arquivo de fixture ou arquivo de factories
  const accMovData = {
    descricao: faker.string.alpha(5) + " Desc",
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
    cy.apiResetAccounts();
    cy.apiAddAccount(user.accountName);
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });
  beforeEach(function () {
    header.navToAccountMovement();
  });

  after(function () {
    cy.visit("/");
    cy.apiResetAccounts();
  });
  // TODO
  it("Should create a transaction sucessfully", function () {
    accountMovimentPage.addAccountMov(
      accMovData.descricao,
      accMovData.valor,
      accMovData.interessado
    );

    const msg = "Movimentação inserida com sucesso!";
    accountMovimentPage.toast.shouldHaveMsg(msg);

    const size = 7;
    balancePage.shouldHaveListLength(size);
  });

  it.only("Should remove a transaction sucessfully", function () {
    accountMovimentPage.addAccountMov(
      accMovData.descricao,
      accMovData.valor,
      accMovData.interessado
    );

    // Hook to validate the correct url
    cy.url().should("be.equal", "https://barrigareact.wcaquino.me/extrato");

    // Usando o within como uma alternativa ao .find()
    cy.get("[data-test=mov-row]")
      .eq(-1)
      .within(() => {
        // cria um contexto e não limita igual o find pra achar uma tag
        cy.get("a[href='#']").click();
      })
      .then(() => {
        const msg = "Movimentação removida com sucesso!";
        balancePage.toast.shouldHaveMsg(msg);
      });

    cy.contains(`${accMovData.descricao}`).should("not.exist");
  });
});

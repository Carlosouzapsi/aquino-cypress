import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

describe("Transactions", function () {
  // Usar massa de dados em fixture ou factories
  const user = {
    email: "carlos.souza@email.com",
    password: "pwd123",
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiResetAccounts();
  });

  it("Should create a transaction sucessfully", function () {
    const account = {
      nome: `${faker.string.alpha(5)}`,
    };
    cy.apiAddAccount(account.nome);
    cy.apiGetAccountId(account.nome).then(function (id) {
      cy.request({
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
        headers: {
          Authorization: `JWT ${Cypress.env("jwtToken")}`,
        },
        body: {
          tipo: "REC",
          data_transacao: dayjs().format("DD/MM/YYYY"),
          data_pagamento: dayjs().add(1, "day").format("DD/MM/YYYY"),
          descricao: `${faker.string.alpha(5)}`,
          valor: "123",
          envolvido: "Teste",
          conta_id: id,
          status: true,
        },
      }).then(function (response) {
        expect(response.status).to.eq(201);
        cy.wrap(response).its("body.id").should("exist");
      });
    });
  });
  it("Should update a transaction status sucessfully", function () {
    const account = {
      nome: `conta movimentação - ${faker.string.alpha(5)}`,
      descricao: "Descricao",
    };
    cy.apiAddAccount(account.nome);
    cy.apiGetAccountId(account.nome).then(function (id) {
      cy.apiAddAccountMovement(id);
      cy.apiGetAccountMovementId(account.descricao).then(function (
        idTransaction
      ) {
        cy.request({
          method: "PUT",
          url: `https://barrigarest.wcaquino.me/transacoes/${idTransaction}`,
          headers: {
            Authorization: `JWT ${Cypress.env("jwtToken")}`,
          },
          body: {
            data_transacao: "06/10/2023",
            data_pagamento: "06/10/2023",
            descricao: "Movimentacao de conta",
            valor: 1500,
            envolvido: "BBBadsa",
            conta_id: id,
            status: true,
          },
        }).then(function (response) {
          expect(response.status).to.eq(200);
        });
        // Checking
        cy.request({
          method: "GET",
          url: "https://barrigarest.wcaquino.me/saldo",
          headers: {
            Authorization: `JWT ${Cypress.env("jwtToken")}`,
          },
        }).then(function (response) {
          let saldoConta = null;
          response.body.forEach(function (c) {
            if (c.conta === account.nome) {
              saldoConta = c.saldo;
            }
          });
          expect(response.status).to.be.equal(200);
          expect(saldoConta).to.be.equal("1500.00");
        });
      });
    });
  });
  it("Should remove a transaction sucessfully", function () {
    const account = {
      nome: `conta movimentação - ${faker.string.alpha(5)}`,
      descricao: "Descricao",
    };
    cy.apiAddAccount(account.nome);
    cy.apiGetAccountId(account.nome).then(function (id) {
      cy.apiAddAccountMovement(id);
      cy.apiGetAccountMovementId(account.descricao).then(function (
        idTransaction
      ) {
        // DELETING
        cy.request({
          method: "DELETE",
          url: `https://barrigarest.wcaquino.me/transacoes/${idTransaction}`,
          headers: {
            Authorization: `JWT ${Cypress.env("jwtToken")}`,
          },
        }).then(function (response) {
          expect(response.status).to.eq(204);
        });
      });
    });
  });
});

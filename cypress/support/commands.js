// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("apiLogin", function (emailUser, passUser) {
  cy.request({
    method: "POST",
    url: "https://barrigarest.wcaquino.me/signin",
    body: {
      email: emailUser,
      redirecionar: false,
      senha: passUser,
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    const token = response.body.token;

    Cypress.env("jwtToken", token);
  });
});

// Não está funcionando, rever futuramente:
Cypress.Commands.add("apiResetAccounts", function () {
  cy.request({
    method: "GET",
    url: "https://barrigarest.wcaquino.me/reset",
    headers: {
      Authorization: "Bearer " + Cypress.env("jwtToken"),
    },
  }).then((response) => expect(response.status).to.equal(200));
});

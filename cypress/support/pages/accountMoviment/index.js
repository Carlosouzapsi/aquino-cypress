import { el } from "./elements";

class AccountMovimentPage {
  constructor() {}

  addAccountMov(desc, valor, interessado) {
    cy.get(el.inputDescricao).clear().type(desc);
    // cy.get(el.inputValor).clear().type(valor);
    // cy.get(el.inputInteressado).type(interessado);
    // cy.get(el.btnSalvar).click();
  }
}

export default new AccountMovimentPage();

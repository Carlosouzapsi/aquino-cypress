import { el } from "./elements";
import toast from "../../components/toast";

class AccountMovimentPage {
  constructor() {
    this.toast = toast;
  }

  addAccountMov(desc, valor, interessado) {
    cy.get(el.inputDescricao).clear().type(desc);
    cy.get(el.inputValor).clear().type(valor);
    cy.get(el.inputInteressado).type(interessado);
    cy.contains(el.btnSalvar).click();
  }
}

export default new AccountMovimentPage();

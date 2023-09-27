import { el } from "./elements";
import toast from "../../components/toast";

class Account {
  constructor() {
    this.toast = toast;
  }
  addAccount(accName) {
    cy.get(el.inputConta).should("be.visible");
    cy.get(el.inputConta).clear().type(accName);
  }

  accountNameShouldBeVisible(accName) {
    cy.contains(el.accNameRow, accName).should("be.visible");
  }
}

export default new Account();

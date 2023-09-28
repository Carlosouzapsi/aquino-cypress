import { el } from "./elements";
import toast from "../toast";

class Header {
  constructor() {
    this.toast = toast;
  }
  navToAccounts() {
    cy.get(el.menuSettings).should("be.visible").click();
    cy.get(el.menuContas).should("be.visible").click();
  }
  resetAccounts() {
    cy.get(el.menuSettings).should("be.visible").click();
    cy.get(el.resetAccounts).should("be.visible").click();
  }
}

export default new Header();

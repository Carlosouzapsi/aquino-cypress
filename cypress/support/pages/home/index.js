import { el } from "./elements";

class HomePage {
  goToAccounts() {
    cy.get(el.menuSettings).should("be.visible").click();
    cy.get(el.menuContas).should("be.visible").click();
  }
}

export default new HomePage();

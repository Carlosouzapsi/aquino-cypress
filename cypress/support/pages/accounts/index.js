import { el } from "./elements";
import toast from "../../components/toast";

class AccountPage {
  constructor() {
    this.toast = toast;
  }
  addAccount(accName) {
    cy.get(el.inputConta).should("be.visible");
    cy.get(el.inputConta).clear().type(accName);
    cy.get(el.btnSalvar).click();
  }

  accountNameShouldBeVisible(accName) {
    cy.contains(el.accNameRow, accName).should("be.visible");
  }

  accountNameShouldBeUpdated(oldAccName, newAccName) {
    cy.contains("td", oldAccName)
      .siblings("td")
      .should("be.visible")
      .find("a > i")
      .eq(0)
      .should("have.class", el.btnEdit)
      .click();
    cy.get(el.inputConta).should("be.visible");
    cy.get(el.inputConta).clear().type(newAccName);
    cy.get(el.btnSalvar).click();

    cy.contains("td", newAccName).siblings("td").should("be.visible");
  }
}

export default new AccountPage();

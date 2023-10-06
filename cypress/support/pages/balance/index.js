import { el } from "./elements";

class BalancePage {
  constructor() {}

  shouldHaveListLength(size = 7) {
    cy.get(el.balanceList).should("have.length", size);
  }

  accountInfoShouldExist(budget) {
    // TODO
  }
}

export default new BalancePage();

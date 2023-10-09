import { el } from "./elements";
import toast from "../../components/toast";

// Revisar se precisa mesmo dessa page..
class BalancePage {
  constructor() {
    this.toast = toast;
  }

  shouldHaveListLength(size = 7) {
    cy.get(el.balanceList).should("have.length", size);
  }

  accountInfoShouldExist(budget) {
    // TODO
  }
}

export default new BalancePage();

export class SummaryStepPage {
  private proceedToCheckoutButtonSelector: string;

  constructor() {
    this.proceedToCheckoutButtonSelector = '.cart_navigation span';
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(this.proceedToCheckoutButtonSelector).click();
  }
}

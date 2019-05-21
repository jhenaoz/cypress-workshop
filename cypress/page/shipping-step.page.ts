export class ShippingStepPage {
  private acceptTermsAndConditionCheckSelector: string;
  private proceedToCheckoutButtonSelector: string;

  constructor () {
    this.acceptTermsAndConditionCheckSelector = '#cgv';
    this.proceedToCheckoutButtonSelector = '[name="processCarrier"]';
  }

  public  acceptAndContinue(): Cypress.Chainable {
    return cy.get(this.acceptTermsAndConditionCheckSelector)
      .click()
      .get(this.proceedToCheckoutButtonSelector)
      .click();
  }
}

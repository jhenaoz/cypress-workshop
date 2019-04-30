export class OrderResumePage {
  private orderTitleLabelSelector: string;

  constructor() {
    this.orderTitleLabelSelector = '#center_column .dark';
  }

  public getOrderTitle(): Cypress.Chainable {
    return cy.get(this.orderTitleLabelSelector);
  }
}

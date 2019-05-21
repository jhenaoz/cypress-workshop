export class ProductListPage {
  private productsSelector: string;

  constructor() {
    this.productsSelector = '.product-container';
  }

  private findByProduct(productName: string): Cypress.Chainable {
    return cy.get(this.productsSelector)
      .find('.product-name')
      .contains(productName).first();
  }

  public selectProduct(productName: string): Cypress.Chainable {
    return this.findByProduct(productName)
      .get('.ajax_add_to_cart_button.btn.btn-default')
      .click();
  }
}

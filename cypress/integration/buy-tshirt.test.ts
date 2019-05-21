import {
  AddressStepPage,
  BankPaymentPage,
  MenuContentPage,
  OrderResumePage,
  PaymentStepPage,
  ProductListPage,
  ProductAddedModalPage,
  SummaryStepPage,
  SignInStepPage,
  ShippingStepPage
} from '../page';
describe('Given a shopping page', () => {
  before(() => {
    cy.visit('http://automationpractice.com/');
  });

  describe('when i try to buy a T shirt', () => {
    before(() => {
      const  menuContentPage: MenuContentPage = new MenuContentPage();
      const productListPage: ProductListPage = new ProductListPage;
      const productAddedModalPage: ProductAddedModalPage = new ProductAddedModalPage();
      const summaryStepPage: SummaryStepPage = new SummaryStepPage();

      menuContentPage.goToTShirtMenu();
      productListPage.selectProduct('Faded Short Sleeve T-shirts');
      productAddedModalPage.proceedToCheckout();
      summaryStepPage.proceedToCheckout();
    });

    describe('and login to the application', () => {
      before(() => {
        const signInStepPage: SignInStepPage = new SignInStepPage();
        signInStepPage.login('aperdomobo@gmail.com', 'WorkshopProtractor');
      });

      describe('and select default address', () => {
        before(() => {
          const addressStepPage: AddressStepPage = new AddressStepPage();
          addressStepPage.proceedToCheckout();
        });

        describe('and pay to the bank', () => {
          before(() => {
            const shippingStepPage: ShippingStepPage = new ShippingStepPage();
            const bankPaymentPage: BankPaymentPage = new BankPaymentPage();
            const paymentStepPage: PaymentStepPage = new PaymentStepPage();

            shippingStepPage.acceptAndContinue();
            paymentStepPage.payByBankWire();
            bankPaymentPage.confirmOrder();

          });

          it('then the order should be completed', () => {
            const orderResumePage: OrderResumePage = new OrderResumePage();
            orderResumePage.getOrderTitle()
              .should('have.text', 'Your order on My Store is complete.');
          });
        });
      });
    });
  });
});

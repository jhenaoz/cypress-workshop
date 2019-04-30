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
describe('Buy a t-shirt', () => {
  const  menuContentPage: MenuContentPage = new MenuContentPage();
  const productListPage: ProductListPage = new ProductListPage;
  const productAddedModalPage: ProductAddedModalPage = new ProductAddedModalPage();
  const summaryStepPage: SummaryStepPage = new SummaryStepPage();
  const signInStepPage: SignInStepPage = new SignInStepPage();
  const shippingStepPage: ShippingStepPage = new ShippingStepPage();
  const addressStepPage: AddressStepPage = new AddressStepPage();
  const bankPaymentPage: BankPaymentPage = new BankPaymentPage();
  const paymentStepPage: PaymentStepPage = new PaymentStepPage();
  const orderResumePage: OrderResumePage = new OrderResumePage();

  it('Then should be bought a t-shirt', () => {
    cy.visit('http://automationpractice.com/');
    menuContentPage.goToTShirtMenu();
    productListPage.selectProduct('Faded Short Sleeve T-shirts');
    productAddedModalPage.proceedToCheckout();
    summaryStepPage.proceedToCheckout();

    signInStepPage.login('aperdomobo@gmail.com', 'WorkshopProtractor');
    addressStepPage.proceedToCheckout();
    shippingStepPage.acceptAndContinue();
    paymentStepPage.payByBankWire();
    bankPaymentPage.confirmOrder();

    orderResumePage.getOrderTitle()
      .should('have.text', 'Your order on My Store is complete.');
  });
});

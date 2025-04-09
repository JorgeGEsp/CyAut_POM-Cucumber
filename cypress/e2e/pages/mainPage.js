import { CommonPage } from "./commonPage";


///Locators on Main Page
const productCard = '[data-test="inventory-item"]';
const price = '[data-test="inventory-item-price"]';
const productDescription = '[data-test="inventory-item-description"]';
const productList = '[data-test="inventory-list"]';
const sortContainner = '[data-test="product-sort-container"]';



export class MainPage extends CommonPage{

  checkUrlMainPage () {
    cy.url().should('include', 'inventory.html');
  }

// Ejercicios

checkPrice(productName, productPrice) {
  cy.get(productCard).contains(productDescription, productName).find(price).should('contain', productPrice);
}

getFirstProductFromProductList() {
  return cy.get(productCard).first();
}

getLastProductFromProductList() {
  return cy.get(productList).children().last();
}

checkFirstProductContent(productContent) {
  this.getFirstProductFromProductList().should('contain', productContent);
}

checkLastProductContent(productContent) {
  this.getLastProductFromProductList().should('contain', productContent);
}

getActiveSortingOption() {
  return cy.get('.select_container').find('[data-test="active-option"]');
}

checkActiveSortingOption(activeSortingOption) {
  this.getActiveSortingOption().should('have.text', activeSortingOption)
}

selectSortingOption(sortOption) {
  cy.get(sortContainner).select(sortOption);
  this.checkActiveSortingOption(sortOption);
};

}
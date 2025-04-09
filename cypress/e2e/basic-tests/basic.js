
import { LoginPage } from "../pages/loginPage";

// Better practice to POM without cucumber

import {commonPage, loginPage, mainPage, shoppingCartPage} from "../pages/indexPage"

// Instancias de clase



describe("basic test", () => {

  beforeEach("visit saucedemo", () => {
    cy.visit("https://www.saucedemo.com/");

  })

  it("login happy path", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.url().should('not.include', 'inventory.html');
    cy.get('[data-test="primary-header"]').should('not.exist');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', 'inventory.html');
    cy.get('[data-test="primary-header"]').should('contain', 'Swag Labs');
  });

  it("login happy path using page object model", () => {
    loginPage.correctLogin()
  });

})
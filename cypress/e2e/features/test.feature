@regression
Feature: Checkout process test suite

Background: Login
  Given I login and keep the sesion for the standar_user

  Scenario: Complete checkout process with two products in the cart
    Given I check that the element with data-test "shopping-cart-badge" should "not.exist"
    And I click on the element with data-test "add-to-cart-sauce-labs-backpack"
    And I click on the element with data-test "add-to-cart-sauce-labs-onesie"
    And I check that the element with data-test "shopping-cart-badge" contain the text "2"
    And I click on the element with data-test "shopping-cart-link"
    And I check that the element with data-test "inventory-item-name" contain the text "Sauce Labs Backpack"
    And I check that the element with data-test "inventory-item-name" contain the text "Sauce Labs Onesie"
    And I check that the element with data-test "shopping-cart-badge" contain the text "2"
    When I click on the element with data-test "checkout"
    And I check that the url include the endpoint "checkout-step-one"
    And I type in the text box with data test "firstName" the text "Javier"
    And I type in the text box with data test "lastName" the text "Flores"
    And I type in the text box with data test "postalCode" the text "0000"
    And I click on the element with data-test "continue"
    And I check that the url include the endpoint "checkout-step-two"
    And I check that the item with name "Sauce Labs Backpack" and prince "29.99" appears
    And I check that the item with name "Sauce Labs Onesie" and prince "7.9" appears
    And I check that the element with data-test "total-label" contain the text "41.02"
    And I click on the element with data-test "finish"
    Then I check that the url include the endpoint "checkout-complete"
    And I check that the element with data-test "complete-header" contain the text "Thank you for your order!"
    And I click on the element with data-test "back-to-products"
    And I check that the element with data-test "shopping-cart-badge" should "not.exist"

      Scenario: Complete checkout process with two products in the cart
    Given I check that the element with data-test "shopping-cart-badge" should "not.exist"
    And I click on the element with data-test "add-to-cart-sauce-labs-backpack"
    And I click on the element with data-test "add-to-cart-sauce-labs-onesie"
    And I check that the element with data-test "shopping-cart-badge" contain the text "2"
    And I click on the element with data-test "shopping-cart-link"
    And I check that the element with data-test "inventory-item-name" contain the text "Sauce Labs Backpack"
    And I check that the element with data-test "inventory-item-name" contain the text "Sauce Labs Onesie"
    And I check that the element with data-test "shopping-cart-badge" contain the text "2"
    When I click on the element with data-test "checkout"
    And I check that the url include the endpoint "checkout-step-one"
    And I type in the text box with data test "firstName" the text "Javier"
    And I type in the text box with data test "lastName" the text "Flores"
    And I type in the text box with data test "postalCode" the text "0000"
    And I click on the element with data-test "continue"
    And I check that the url include the endpoint "checkout-step-two"
    And I check that the item with name "Sauce Labs Backpack" and prince "29.99" appears
    And I check that the item with name "Sauce Labs Onesie" and prince "7.9" appears
    And I check that the element with data-test "total-label" contain the text "41.02"
    And I click on the element with data-test "finish"
    Then I check that the url include the endpoint "checkout-complete"
    And I check that the element with data-test "complete-header" contain the text "Thank you for your order!"
    And I click on the element with data-test "back-to-products"
    And I check that the element with data-test "shopping-cart-badge" should "not.exist"
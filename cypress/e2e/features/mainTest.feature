@regression @main
Feature: Main test suite

Background: Login and keep session
  Given I login and keep the sesion for the standar_user

  @smoke
  Scenario: Add a product to cart from products overview
    Given I check that the element with data-test "shopping-cart-badge" should "not.exist"
    When I click on the element with data-test "add-to-cart-sauce-labs-backpack"
    And I check that the element with data-test "shopping-cart-badge" should "be.visible" 
    And I check that the element with data-test "shopping-cart-badge" contain the text "1"
    And I click on the element with data-test "shopping-cart-link"
    And I check that the url include the endpoint "cart.html"
    Then I check that the element with data-test "inventory-item-name" contain the text "Sauce Labs Backpack"

## Ejercicios 26/03/2025

  Scenario: Verify that can go to product detail without add the product to the cart
    Given I check that the element with data-test "shopping-cart-badge" should "not.exist"
    And I check that the element with data-test "add-to-cart-sauce-labs-bolt-t-shirt" should "be.visible"
    And I check that the element with data-test "back-to-products" should "not.exist"
    When I click on the element with the text "Sauce Labs Bolt T-Shirt"
    Then I check that the url include the endpoint "?id="    
    And I check that the element with data-test "add-to-cart-sauce-labs-bolt-t-shirt" should "not.exist"
    And I check that the element with data-test "back-to-products" should "be.visible"
    And I click on the element with data-test "back-to-products"
    And I check that the url doesn't include the endpoint "?id="
    And I check that the element with data-test "add-to-cart-sauce-labs-bolt-t-shirt" should "be.visible"
    And I check that the element with data-test "shopping-cart-badge" should "not.exist"
    And I click on the element with data-test "shopping-cart-link"
    And I check that the url include the endpoint "cart.html"
    And I Check that the body should "not.contain" the text "Sauce Labs Bolt T-Shirt"

  Scenario: Verify sorting by price
      Given I check that the price for the product "Sauce Labs Onesie" is "7.99"
      And I check that the price for the product "Sauce Labs Fleece Jacket" is "49.99"
      And I check that the active sorts option is "Name (A to Z)"
      And I check that the first product of the list contain "Sauce Labs Backpack"
      And I check that the first product of the list contain "29.99"
      And I check that the last product of the list contain "Test.allTheThings() T-Shirt (Red)"
      And I check that the last product of the list contain "15.99"
      When I select the option "Price (low to high)" from the sorting dropdown
      And I check that the first product of the list contain "Sauce Labs Onesie"
      Then I check that the first product of the list contain "7.99"
      And I check that the last product of the list contain "Sauce Labs Fleece Jacket"
      Then I check that the last product of the list contain "49.99"
      When I select the option "Price (high to low)" from the sorting dropdown
      And I check that the last product of the list contain "Sauce Labs Onesie"
      Then I check that the last product of the list contain "7.99"
      And I check that the first product of the list contain "Sauce Labs Fleece Jacket"
      Then I check that the first product of the list contain "49.99"
      And I check that the first product of the list contain "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office."
      

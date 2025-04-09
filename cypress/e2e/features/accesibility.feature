@regression @accesibility
Feature: Accesibility tests

  Background: Visit and login with valid credencials
    Given I visit "https://www.saucedemo.com/"
    When I login with valid user and password
    
    Scenario: Test the accesibility in all the screen
      Given I test the accesibility in all the screen

    Scenario: Test the accesibility on the element "imagen"
      Given I test the accesibility on the element with locator "[data-test='inventory-item-sauce-labs-backpack-img']"

    Scenario: Test the accesibility on the element "sort container"
      Given I test the accesibility on the element with locator "[data-test='product-sort-container']"

@regression
Feature: Intercept good practices


  Scenario: Uso de intercept
    Given I visit "https://www.max.com/es/es"
    When I wait until the api call for the cookies in HBO page
    Then I click on the element with the text "Aceptar todo"



  Scenario: Uso de intercept parameterized step
    Given I visit "https://www.max.com/es/es"
    When I wait until the api call "**/ot_guard_logo.svg"
    Then I click on the element with the text "Aceptar todo"




  Scenario: Uso de intercept super parameterized
    Given I visit "https://www.max.com/es/es"
    When I wait until the api call with method "GET", endpoint "**/ot_guard_logo.svg" for the max time 5000
    Then I click on the element with the text "Aceptar todo"


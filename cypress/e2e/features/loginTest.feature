#Para comentar en un archivo .feature se hace con este símbolo #
#Esto es la descripción de la batería de test contenida en este archivo

@regression @login
Feature: Login test suite

Background: Visit the page saucedemo
#Esto es equivalente al beforeEach
 Given I visit "https://www.saucedemo.com/"
 
# # Los Scenarios son los tests (lo que antes era "it")
  @smoke
  Scenario: login happy path
    Given I type standar user in login page
    And I type the correct password in login page
    And I check that url doesn't contain the endpoint inventory.html
    When I click on the login button  
    Then I check url include the endpoint inventory.html

  Scenario: simple login
    Given I login with valid user and password

  Scenario: Better login
    Given I type the user name "standard_user"
    And I type the password "secret_sauce"
    And I check that the url doesn't include the endpoint "inventory.html"
    When I click on the button with data-test "login-button"
    Then I check that the url include the endpoint "inventory.html"

  @smoke
  Scenario: The very best login test
    Given I type in the text box with data test "username" the text "standard_user"
    And I type in the text box with data test "password" the text "secret_sauce"
    And I check that the url doesn't include the endpoint "inventory.html"
    When I click on the button with data-test "login-button"
    Then I check that the url include the endpoint "inventory.html"


  Scenario: The very best login test
    Given I type in the text box with data test "username" the text "standard_user"
    And I type in the text box with data test "password" the text "secret_sauce"
    And I check that the url doesn't include the endpoint "inventory.html"
    When I click on the button with data-test "login-button"


#---------------------------------------------------------------------------------------------------------------------------#

# Ejercicios 24/03/2025

# Ejercicio 1: Crea un test automático que compruebe que aparecen todos los "Accepted usernames" en la pantalla del login

  Scenario: Check all accepted user names that appears in login page with a specific function
    Given I check that all Accepted usernames appears in login page

  Scenario: Check all user in the const accepterUserNames appears in login page with a specific function
    Given I check that all user in the const accepterUserNames appears in login page

  Scenario: Check all accepted user names that appears in login page using parameterized steps
    Given I check that the element with data-test "login-credentials" contain the text "standard_user"
    And I check that the element with data-test "login-credentials" contain the text "locked_out_user"
    And I check that the element with data-test "login-credentials" contain the text "problem_user"
    And I check that the element with data-test "login-credentials" contain the text "performance_glitch_user"
    And I check that the element with data-test "login-credentials" contain the text "error_user"
    And I check that the element with data-test "login-credentials" contain the text "visual_user"

  Scenario:Check all accepted user names that appears in login page using parameterized function with one step
    Given I check that the element login credentials contain the all the accepted users

  Scenario:Check all accepted user names that appears in login page using parameterized function with one step
    Given I check that the user names in the const acceptedtUserNames appears in the login credentials element

  Scenario: Check error messages in login - "Username is required"
    Given I check that the element with data-test "error" should "not.exist"
    And I Check that the body should "not.contain" the text "Epic sadface: Username is required"
    When I click on the button with data-test "login-button"
    Then I check that the element with data-test "error" should "be.visible"
    And I check that the error message "Epic sadface: Username is required" appears

  Scenario: Check error messages in login - "Password is required"
    Given I type in the text box with data test "username" the text "Javier"
    And I check that the element with data-test "error" should "not.exist"
    And I Check that the body should "not.contain" the text "Epic sadface: Password is required"
    When I click on the button with data-test "login-button"
    Then I check that the element with data-test "error" should "be.visible"
    And I check that the element with data-test "error" contain the text "Epic sadface: Password is required"

  @smoke
  Scenario Outline: Check all error messages in login - Scenario outline
    Given I type in the text box with data test "username" the text "<username>"    
    And I type in the text box with data test "password" the text "<password>"
    And I check that the element with data-test "error" should "not.exist"
    And I Check that the body should "not.contain" the text "Epic sadface: Password is required"
    When I click on the button with data-test "login-button"
    Then I check that the element with data-test "error" contain the text "<errorMessage>"

    Examples:
      | username                | password     |     errorMessage                                                              |    
      |                         |              |     Epic sadface: Username is required                                        |             
      |                         |contraseña    |     Epic sadface: Username is required                                        |             
      | Javier                  |              |     Epic sadface: Password is required                                        |
      | Javier                  | contraseña   |     Epic sadface: Username and password do not match any user in this service |
      | standard_user           | contraseña   |     Epic sadface: Username and password do not match any user in this service |
      | Javier                  | secret_sauce |     Epic sadface: Username and password do not match any user in this service |
      | locked_out_user         | secret_sauce |     Epic sadface: Sorry, this user has been locked out.                       |


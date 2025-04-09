import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-mochawesome-reporter/cucumberSupport';

// Clases importadas
import { MainPage} from "../pages/mainPage"

//Instancias de clase
let mainPage = new MainPage();

Given("I check url include the endpoint inventory.html", () => {
  mainPage.checkUrlMainPage();
 });


// Ejercicios 26/03/2025

Given("I check that the price for the product {string} is {string}", (productName, productPrice) => {
  mainPage.checkPrice(productName, productPrice);
});

Given("I check that the active sorts option is {string}", (activeSortingOption) => {
  mainPage.checkActiveSortingOption(activeSortingOption);
});

Given("I check that the first product of the list contain {string}", (productContent) => {
  mainPage.checkFirstProductContent(productContent);
});

Given("I check that the last product of the list contain {string}", (productContent) => {
  mainPage.checkLastProductContent(productContent);
});

Given("I select the option {string} from the sorting dropdown", (productContent) => {
  mainPage.selectSortingOption(productContent);
});
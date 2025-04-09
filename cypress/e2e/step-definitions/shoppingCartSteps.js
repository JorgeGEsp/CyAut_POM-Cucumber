import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-mochawesome-reporter/cucumberSupport';

// Clases importadas
import { ShoppingCartPage} from "../pages/shoppingCartPage"

//Instancias de clase
let shoppingCartPage = new ShoppingCartPage();

// Ejercicio 31-03-2025
Given("I check that the item with name {string} and prince {string} appears", (itemName, itemPrice) => {
  shoppingCartPage.checkInventoryItem(itemName, itemPrice);
 });






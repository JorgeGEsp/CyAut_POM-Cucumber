import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-mochawesome-reporter/cucumberSupport';

// Clases importadas
import { CommonPage} from "../pages/commonPage"

//Instancias de clase
let commonPage = new CommonPage();

Given("I visit {string}", (url) => {
  commonPage.visitLink(url);
 });

 Given("I check that the url doesn't include the endpoint {string}", (endpoint) => {
  commonPage.checkUrlnotInclude(endpoint);
 });

 Given("I check that the url include the endpoint {string}", (endpoint) => {
  commonPage.checkUrlInclude(endpoint);
 });
 
 Given("I click on the button with data-test {string}", (buttonByDataTest) => {
  commonPage.clickButtonByDataTest(buttonByDataTest);
 });

 Given("I type in the text box with data test {string} the text {string}", (texBoxByDataText, text) => {
  commonPage.typeInTextBoxByDataTest(texBoxByDataText, text);
 });
 
 // Ejercicios 24/03/2025

 Given("I check that the element with data-test {string} contain the text {string}", (elementByDataTest, text) => {
  commonPage.checkElementContains(elementByDataTest, text);
 });

 Given("I check that the element with data-test {string} should {string}", (elementByDataTest, assertion) => {
  commonPage.checkElementBydataTest(elementByDataTest, assertion);
 });
 
 Given("I Check that the body should contain the text {string}", (text) => { 
  commonPage.checkBodyContainText(text);
 });

 Given("I Check that the body should not contain the text {string}", (text) => { 
  commonPage.checkBodyNotContainText(text);
 });

 Given("I Check that the body should {string} the text {string}", (assertion, text) => { 
  commonPage.checkBodyText(assertion, text);
  //assertion can be "contain", "not.contain", "have.text", "not.have.text"
 });

Given("I click on the element with data-test {string}", (elementDataTest) => {
  commonPage.clickElementByDataTest(elementDataTest);
});
 
// Ejercicios 26/03/2025

Given("I click on the element with the text {string}", (elementDataTest) => {
  commonPage.clickElementByContent(elementDataTest);
});



//-------------------------------------------------------------------------------------------//
  // Steps para test de accesibilidad
Given('I test the accesibility in all the screen', () => {
  commonPage.testAccesibilityInScreen()
})

Given('I test the accesibility on the element with locator {string}', (elementLocator) => {
  commonPage.testAccesibilityOnElement(elementLocator)
})



// -------------------------------------------------------------------------------------------//
  // Steps para intercept

Given('I wait until the api call for the cookies in HBO page', () => {
  commonPage.interceptHBOApiCall()
})

Given('I wait until the api call {string}', (interceptApiCall) => {
  commonPage.interceptApiCall(interceptApiCall)
})


Given('I wait until the api call with method {string}, endpoint {string} for the max time {int}', (method, interceptApiCall, timeoutTime) => {
  commonPage.interceptApiCallMethodTimeout(method, interceptApiCall, timeoutTime)
})



const links = require("../links.json");
const credentials = {}
try {
  credentials = require("../credentials.json");
} catch (error) {
  
} 
const sauce_locators = require("../locators/sauce_locators").sauce_locators;
const text_resources = "../text_resources.json";
const { expect } = require("@playwright/test");
export class webpageNavigators {
  constructor(page) {
    this.page = page;
  }

  //Click the add to cart button for a specific item
  async addToCart(itemToAdd) {
    await this.page
      .locator("div")
      .filter({ hasText: itemToAdd })
      .getByRole("button")
      .click();
  }

  //Navigate to the cart part of the website
  async goToCart() {
    await this.page.goto(links.sauceCart);
  }

  //After adding items to a cart, the following navigator navigates to the checkout page.
  async goToPayMentDetailsPage() {
    await sauce_locators.checkOutButton(this.page).click();
  }

  //Given an itemName locators name, clicks the locator.
  async clickAnything(itemName) {
    await sauce_locators[itemName](this.page).click();
  }

  //Clicks the first itemName locator on the page
  async clickFirstAnything(itemName) {
    await sauce_locators[itemName](this.page).first().click();
  }

  //Clicks the nth number specified object
  async clickNthAnything(itemName, number) {
    await sauce_locators[itemName](this.page).nth(number).click();
  }

  //Function validates the presence of a specified locator
  async verifyPresenceOfLocator(itemName) {
    await expect(sauce_locators[itemName](this.page)).toBeVisible();
  }

  //Function  validates the presence of a specified locator
  async verifyAbsenceOfLocator(itemName) {
    await expect(sauce_locators[itemName](this.page)).not.toBeVisible();
  }

  async goToLoginPage() {
    await this.page.goto(links.saucedemo);
  }

  //Login utilizing the provided "Name" parameter on the starting page
  async loginUsername(name) {
    await this.goToLoginPage();
    await sauce_locators.userNameField(this.page).fill(name);
  }

  async tabAddItemsIntoCart(itemCount) {
    await this.clickAnything("homePageCheck");

    for (let i = 0; i < 4; i++) {
     await this.pressTabOnKeyboard();
    }

    for (let i = 0; i < itemCount; i++) {
     await this.pressEnterOnKeyBoard();
      for (let i = 0; i < 3; i++) {
       await this.pressTabOnKeyboard();
      }
    }
  }

  async verifyItemCountInCart(expectedNumber) {
    let itemsInCart = sauce_locators.removeFromCartButton(this.page);
    let itemsInCartCount = await itemsInCart.count();

    expect (itemsInCartCount).toEqual(expectedNumber);
    
    // expect (expectedNumber).toEqual(cartCount);
  }

  async loginUserNameNoClick(name) {
    await sauce_locators.userNameField(this.page).fill(name);
  }

  //Clicks the first name purchasing field and fills it with the postal code from credentials
  async addNItemsToCart(numberOfItems) {
    let buttonList = await this.page.locator(".btn_primary.btn_inventory");
    const count = await buttonList.count();

    while (
      (await this.page.locator(".btn_primary.btn_inventory").count()) >
      count - numberOfItems
    ) {
      await sauce_locators.addToCart(this.page).first().click();
    }
  }

  async loginUsernameWithName() {
    await sauce_locators.firstNameField(this.page).fill(credentials.firstName);
  }
  //Clicks the last name purchasing field and fills it with the postal code from credentials

  async loginUsernameWithLastName() {
    await sauce_locators.lastNameField(this.page).fill(credentials.lastName);
  }

  //Clicks the postal code field and fills it with the postal code from credentials
  async postalCode() {
    await sauce_locators
      .postalCodeField(this.page)
      .fill(credentials.postalCode);
  }

  //Logs in with the standard user credentials PASSWORD ONLY
  async loginPassword(passWord) {
    await sauce_locators.passwordField(this.page).click();
    await sauce_locators.passwordField(this.page).fill(passWord);
  }

  //Click the login button on the starting page
  async clickLoginButton() {
    await sauce_locators.loginButton(this.page).click();
  }

  //Function to verify the visibility of text on a homepage
  async textVisibility(text) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible({
    });
  }

  //Function reduces 
  async pressTabOnKeyboard() {
    await this.page.keyboard.press("Tab");
  }

    //Function inputs a tab keyboard input

  async pressEnterOnKeyBoard() {
    await this.page.keyboard.press("Enter");
  }

  //Function to compare two list
  async compareListsOriginal(actualList) {
    const sortedProducts = await [...actualList].sort((a, b) =>
      a.localeCompare(b)
    );
    expect(actualList).toEqual(sortedProducts);
  }

  async compareListsReverse(actualList) {
    const sortedProducts = await [...actualList].sort((a, b) =>
      b.localeCompare(a)
    );
    expect(actualList).toEqual(sortedProducts);
  }

  async compareTwoLists(actual, expectedList) {
    expect(actual).toEqual(expectedList);
  }

  //Calculate total price of all items in cart, clean them up and parse to a number.
  async totalPriceCheck() {
    let priceWithSign = await this.page.locator(".inventory_item_price");
    let priceWithoutSign = await priceWithSign.allTextContents();

    const sumPrice = priceWithoutSign
      .map((text) => parseFloat(text.replace("$", "")))
      .reduce((acc, val) => acc + val, 0);

    return sumPrice;
    //await this.totalPriceComparison(sumPrice);
  }

  //Compare calculated total to listed total. Cleans up listed total (removes excessive text) and parses to a number
  async totalPriceComparison(sumPrice) {
    let summarySubTotal = await sauce_locators.totalPriceCheckoutPage(
      this.page
    );
    let subTotalPriceWithText = await summarySubTotal.allTextContents();
    let numberWithoutSign = await this.convertPriceStringToNumber(
      subTotalPriceWithText
    );
    let totalPrice = await this.totalPriceCheck();

    expect(totalPrice).toEqual(numberWithoutSign);
  }

  //Helper method to remove dollar signs and other unnecessary string part
  async convertPriceStringToNumber(numberToConvert) {
    let priceString = numberToConvert[1] || numberToConvert[0];
    let match = priceString.match(/[\d,.]+/);
    let subTotalPriceWithoutText = match
      ? parseFloat(match[0].replace(",", ""))
      : NaN;
    return subTotalPriceWithoutText;
  }

  //Cleans up the tax string into a number used for calculations
  async convertTaxToNumber(taxInput) {
    const inputString = Array.isArray(taxInput) ? taxInput[0] : taxInput;
    const match = inputString.match(/[\d.]+/);
    const value = match ? parseFloat(match[0]) : NaN;
    return value;
  }

  //Given the expected error text on the checkout page, checks if the text is actually visible
  async verifyErrorTextOnCheckOutPage(errorTextExpected, focusOfTest) {
    await this.addNItemsToCart(1);
    await this.goToCart();
    await this.clickAnything("checkOutButton");

    if (focusOfTest === "firstName") {
      await this.clickAnything("continueButtonPurchasing");
      await this.verifyPresenceOfLocator(errorTextExpected);
    } else if (focusOfTest === "lastName") {
      await this.loginUsernameWithName();
      await this.clickAnything("continueButtonPurchasing");
      await this.verifyPresenceOfLocator(errorTextExpected);
    } else {
      await this.loginUsernameWithName();
      await this.loginUsernameWithLastName();
      await this.verifyAbsenceOfLocator(errorTextExpected);
    }
  }

  async calculateTax() {
    //0.08 is the assumed tax rate.

    let taxListedOnHomepage = await sauce_locators.taxCheckoutPage(this.page);
    let taxListedInText = await taxListedOnHomepage.allTextContents();

    let taxNumberProcessed = await this.convertTaxToNumber(taxListedInText);
    let totalPriceOnHomepage = await this.totalPriceCheck();

    let calculatedTax = (totalPriceOnHomepage * 0.08).toFixed(2);

    expect(parseFloat(calculatedTax)).toEqual(taxNumberProcessed);
  }

  async getToPaymentOverview() {
    await this.page.goto(links.checkOutOverviewPage);
  }
}

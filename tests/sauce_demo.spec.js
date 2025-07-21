import { test } from "@playwright/test";
import { webpageNavigators } from "../helpers/WebpageNavigators.js";
import { createZstdDecompress } from "zlib";
const sauce_locators = require("../locators/sauce_locators").sauce_locators;
const links = require("../links.json");
const text_resources = require("../text_resources.js").text_resources;
let credentials = {};
try {
  credentials = require("../credentials.json");
} catch (e) {
  console.log("Github Secrets Rejected, wants to use credentials");
}

//After each hook to logout annd close the page after each test
test.afterEach(async ({ page }) => {
  await page.close();
});

//Overarching Test Suite for the Login Functionality of the Website
test.describe("Group of Login Functionality Tests", () => {
  //Test the standard login functionality

  test("Standard Login Test", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    if (!credentials.standard_user && !process.env.STANDARD_USERNAME) {
      throw new Error("No standard user credentials found!");
    }
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
    await navigator.verifyPresenceOfLocator("homePageCheck");
  });

  //Test the standard logout functionality post successful login
  test("Login & Logout Test", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
    await sauce_locators.openMenu(page).click();
    await sauce_locators.logOutButton(page).click();
  });

  //Test an arbitrary login attempt with an incorrect username
  test("Unsuccessful Login Test With Invalid Username", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.invalid_user || process.env.INVALID_USER;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
    await navigator.verifyPresenceOfLocator("errorLogin");
  });

  test("Unsuccessful Login Test With Invalid Password", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.invalid_password || process.env.INVALID_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
    await navigator.verifyPresenceOfLocator("errorLogin");
  });

  //Testing login attempt of a locked out user (SHOULD RESULT ERROR)
  test("Login Attempt of a Locked Out User", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName =
      credentials.locked_out_user || process.env.LOCKED_OUT_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");

    await navigator.verifyPresenceOfLocator("errorLogin");
  });
});

test.describe("Tests that pertain to the purchase flow", () => {
  test.beforeEach(async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
  });

  //Test missing first name error message in checkout

  test("First name error message", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.verifyErrorTextOnCheckOutPage(
      "firstNameRequiredDetailsPage",
      "firstName"
    );
  });

  //Test missing last name error message in checkout

  test("Last name Error Message", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.verifyErrorTextOnCheckOutPage(
      "lastNameRequiredDetailsPage",
      "lastName"
    );
  });

  //Test missing postal code error message in checkout
  test("Postal Code Error Message", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.verifyErrorTextOnCheckOutPage(
      "postalCodeRequiredDetailsPage",
      "postalCode"
    );
  });

  //Test the entire purchasing process flow
  test("Purchase an item", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.clickAnything("bikeLightCartHome");
    await navigator.goToCart();
    await navigator.clickAnything("checkOutButton");
    await navigator.loginUsernameWithName();
    await navigator.loginUsernameWithLastName();
    await navigator.postalCode();
    await navigator.clickAnything("continueButtonPurchasing");
    await navigator.clickAnything("finishButtonPurchasing");
    await navigator.verifyPresenceOfLocator("successfullPurchaseText");
  });

  //TO DO
  //Test Negative Cart Scenario

  test.skip("Negative Cart Scenario", async ({ page }) => {
    const navigator = new webpageNavigators(page);
  });
});

//The following test suite tests the accesibility of the website by utilizing only keyboard functions and minimal clicks

test.describe.skip("Accessibility tests", () => {
  //Test accesibility of login page by only utilizing tab
  test("Tab Test Through Login Page", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.goToLoginPage();
    await navigator.pressTabOnKeyboard();
    await navigator.loginUserNameNoClick(userName);
    await navigator.pressTabOnKeyboard();
    await navigator.loginPassword(passWord);
    await navigator.pressTabOnKeyboard();
    await navigator.pressEnterOnKeyBoard();
    await navigator.verifyPresenceOfLocator("homePageCheck");
  });

  test("Tab Add All Items to Cart", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.pressTabOnKeyboard();
    await navigator.pressEnterOnKeyBoard();

    //The following values need to be 1-6 as there are only 6 items on the homepage as of now.
    await navigator.tabAddItemsIntoCart(4);
    await navigator.verifyItemCountInCart(4);
  });

  test("Tab through the entire purchase flow", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.loginUsername(credentials.standard_user);
    await navigator.loginPassword(credentials.standard_password);
    await navigator.clickAnything("loginButton");
  });
});

test.describe("Session Persistence Tests", () => {
  test.beforeEach(async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
  });

  test.skip("Login Add Item, Logout and Log Back in", async ({ page }) => {
    const navigator = new webpageNavigators(page);
  });
});

//Test Suite for the Shopping Cart Functionalities and Purchasing
test.describe("Tests that pertain to the shopping cart functionalities and purchasing", () => {
  // Before Each Test Case, Navigate to the Test Website & Login
  test.beforeEach(async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
  });

  //Test the addition of all available items into the shopping cart
  test("Addition of All Available Items into Shopping Cart", async ({
    page,
  }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(6);
    await navigator.verifyItemCountInCart(6);
    await navigator.goToCart();
    await navigator.verifyPresenceOfLocator("bikeLight");
    await navigator.verifyPresenceOfLocator("backPack");
    await navigator.verifyPresenceOfLocator("boltTshirt");
    await navigator.verifyPresenceOfLocator("fleeceJacket");
    await navigator.verifyPresenceOfLocator("onesie");
    await navigator.verifyPresenceOfLocator("testTshirt");
  });

  //Test the removal function from the shopping cart
  test("Test removal of an item from the shopping cart,", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.clickAnything("onesieCartHome");
    await navigator.goToCart();
    await navigator.verifyPresenceOfLocator("onesie");
    await navigator.clickAnything("removeFromCart");
    await navigator.verifyAbsenceOfLocator("onesieCartHome");
  });
});

//Test Suite for the Sorting of Items on the Homepage
test.describe("Test the Item Sorting Function on the homepage", () => {
  test.beforeEach(async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
  });

  //Test the A-Z alphabetical ordering function on the homepage
  test("A-Z Order Sort of Items on Homepage", async ({ page }) => {
    const itemLinkList = page.getByRole("link");
    const itemProducts = await itemLinkList.allTextContents();
    const navigator = new webpageNavigators(page);
    const filteredList = itemProducts.filter((name) =>
      text_resources.filteredListAZ.includes(name)
    );
    navigator.compareListsOriginal(filteredList);
  });

  //Test the Z-A alphabetical ordering function on the homepage
  test("Z-A Order Sort of Items on Homepage", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await sauce_locators.sortZToA(page);
    const itemLinkList = page.getByRole("link");
    const itemProductNames = await itemLinkList.allTextContents();
    const expectedList = itemProductNames.filter((name) =>
      text_resources.filteredListZA.includes(name)
    );
    navigator.compareListsReverse(expectedList);
  });

  //Tests the Low to High Price Sorting Function on the Homepage
  test("Sort by price: Low to High", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await sauce_locators.sortLowToHighPrice(page);
    const priceList = await sauce_locators.itemPrice(page);
    const itemPrices = await priceList.allTextContents();
    navigator.compareTwoLists(itemPrices, text_resources.priceListLoToHi);
  });

  //Tests the High to low Price Sorting Function on the Homepage
  test("Sort by price: High to Low", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await sauce_locators.sortHighToLowPrice(page);
    const priceList = await sauce_locators.itemPrice(page);
    const itemPrices = await priceList.allTextContents();
    navigator.compareTwoLists(itemPrices, text_resources.priceListHiToLo);
  });
});

//Test Suite That Covers the Cost and Prices Listing in the
test.describe("Cost Calculation Functions", () => {
  test.beforeEach(async ({ page }) => {
    const navigator = new webpageNavigators(page);
    const userName = credentials.standard_user || process.env.STANDARD_USERNAME;
    const passWord =
      credentials.standard_password || process.env.STANDARD_PASSWORD;
    await navigator.loginUsername(userName);
    await navigator.loginPassword(passWord);
    await navigator.clickAnything("loginButton");
  });

  //Tests the Accuracy of the Total Price Listed on the Last Payment Overview Page
  test("Test Accuracy of Total Price Calculation of Three Items", async ({
    page,
  }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    await navigator.totalPriceCheck();
  });

  //Tests if removing an arbitrary item is accurately reflected in the total price
  test("Test Updating of Total Price When Removing an Item", async ({
    page,
  }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    let cleanedPrice = await navigator.totalPriceCheck();
    await navigator.totalPriceComparison(cleanedPrice);
    await navigator.goToCart();
    await navigator.clickNthAnything("removeItemCart", 1);
    await navigator.goToPayMentDetailsPage();
    await navigator.loginUsernameWithName();
    await navigator.loginUsernameWithLastName();
    await navigator.postalCode();
    await navigator.clickAnything("continueButtonPurchasing");
    cleanedPrice = await navigator.totalPriceCheck();
    await navigator.totalPriceComparison(cleanedPrice);
  });

  //Tests if adding an arbitrary item is accurately reflected in the total price
  test("Test Updating of Total Price Adding One Item", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    let cleanedPrice = await navigator.totalPriceCheck();
    await navigator.totalPriceComparison(cleanedPrice);
    await navigator.clickAnything("openMenu");
    await navigator.clickAnything("allItemsButton");
    await navigator.addNItemsToCart(1);
    await navigator.getToPaymentOverview();
    cleanedPrice = await navigator.totalPriceCheck();
    await navigator.totalPriceComparison(cleanedPrice);
  });

  //Tests if the tax calculation is correct
  test("Tax Calculation Test", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    await navigator.calculateTax();
  });

  test("Tax Update Test", async ({ page }) => {
    const navigator = new webpageNavigators(page);
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    await navigator.calculateTax();
    await navigator.clickAnything("openMenu");
    await navigator.clickAnything("allItemsButton");
    await navigator.addNItemsToCart(2);
    await navigator.getToPaymentOverview();
    await navigator.calculateTax();
  });
});

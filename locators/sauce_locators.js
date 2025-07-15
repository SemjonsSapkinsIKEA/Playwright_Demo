export const sauce_locators = {
  //Texts
  homePageCheck: (page) => page.locator("text=Products"), // Check for the presence of "Products" text on the home page after login
  acceptedUsernamesText: (page) =>
    page.getByRole("heading", { name: "Accepted usernames are:" }), //Check for the starting page
  successfullPurchaseText: (page) =>
    page.getByRole("heading", { name: "THANK YOU FOR YOUR ORDER" }), //Check for the successful purchase text
  errorLogin: (page) => page.locator('[data-test="error"]'), //Error logging in on homepage of website text
  itemNotFound: (page) => page.getByText("ITEM NOT FOUND"), //Item not found upon logging in with glitched user account text
  itemPrice: (page) => page.locator(".inventory_item_price"), //Item Price listed on final overview page
  totalPriceCheckoutPage: (page) => page.locator(".summary_subtotal_label"), //Total Price Listed on final overview page
  taxCheckoutPage: (page) => page.locator(".summary_tax_label"), //Total Tax Listed on final overview page
  cartQuantityNumber: (page) => page.locator(".cart_quantity"), //Text listing the amount of items in cart
  firstNameRequiredDetailsPage: (page) =>
    page.locator(
      "xpath=//h3[normalize-space()='Error: First Name is required']"
    ), //XPath describing the first name missing error text in the overview page
  lastNameRequiredDetailsPage: (page) =>
    page.locator(
      "xpath=//h3[normalize-space()='Error: Last Name is required']"
    ), //Xpath describing the last name missing error text in the overview page
  postalCodeRequiredDetailsPage: (page) =>
    page.locator(
      "xpath=//h3[normalize-space()='Error: Postal Code is required']"
    ), //Xpath describing postal code missing error text in the overview page

  //Buttons
  openMenu: (page) => page.getByRole("button", { name: "Open Menu" }), // Open Menu button on the top left corner
  logOutButton: (page) => page.getByRole("link", { name: "Logout" }), // Logout button in the menu
  loginButton: (page) => page.getByRole("button", { name: "LOGIN" }), //login button on the starting page
  continueButtonPurchasing: (page) =>
    page.getByRole("button", { name: "CONTINUE" }), //Continue button in cart
  finishButtonPurchasing: (page) => page.getByRole("link", { name: "FINISH" }), //Finishing purchasing button in cart
  checkOutButton: (page) => page.getByRole("link", { name: "CHECKOUT" }), //Checkout button in the shopping cart
  addToCartButton: (page) => page.getByRole("button", { name: "ADD TO CART" }), //Add to cart button for the products
  removeFromCart: (page) => page.getByRole("button", { name: "REMOVE" }), //Button to remove selected items from the cart
  sortZToA: (page) => page.getByRole("combobox").selectOption("za"), //Reverse Alphabetic Item Sorting Button Found on Homepage (Z-A)
  sortLowToHighPrice: (page) => page.getByRole("combobox").selectOption("lohi"), //Low to High Price Item Sorting Button Found on Homepage
  sortHighToLowPrice: (page) => page.getByRole("combobox").selectOption("hilo"), //High to Low Price Item Sorting Button Found on Homepage
  removeItemCart: (page) => page.locator(".btn_secondary.cart_button"), //Button used to remove items from the cart on the cart page
  continueButtonCart: (page) => page.locator(".btn_primary cart_button"), // Button used to continue on the cart page UNUSED AT THE MOMENT
  addToCart: (page) => page.locator(".btn_primary.btn_inventory"), //Buttons used to add items to cart
  errorButton: (page) => page.locator(".error-button"), //Error button listed on many pages, reused in multiple parts of the website
  allItemsButton: (page) => page.getByRole("link", { name: "All Items" }),
  //Button found in the topleft meny that navigates back to the page with all items listed
  userNameField: (page) => page.locator('[data-test="username"]'), //Username field on the starting page
  passwordField: (page) => page.locator('[data-test="password"]'), //Password field on the starting page
  firstNameField: (page) => page.locator('[data-test="firstName"]'), //First name field in the purchashing page
  lastNameField: (page) => page.locator('[data-test="lastName"]'), //Last name field in the purchasing page
  postalCodeField: (page) => page.locator('[data-test="postalCode"]'), //Postal code field in the purchasing page

  //Locators for Items Once Added to Shopping Cart
  bikeLight: (page) => page.locator("text=1Sauce Labs Bike LightA red"), //Button for the bike light product
  boltTshirt: (page) => page.locator("text=1Sauce Labs Bolt T-ShirtGet"), //Button for the Bolt T-Shirt product
  fleeceJacket: (page) => page.locator("text=1Sauce Labs Fleece JacketIt's"), //Button for the Fleece Jacket product
  onesie: (page) => page.locator("text=1Sauce Labs OnesieRib snap"), //Button for the Onesie product
  testTshirt: (page) => page.locator("text=1Test.allTheThings() T-Shirt"), //Button for the Test T-Shirt product
  backPack: (page) => page.locator("text=1Sauce Labs Backpackcarry."), //Button for the Backpack product

  //Locators for an items "Add to cart" button on home page utilizing XPaths
  backPackCartHome: (page) =>
    page.locator(
      "xpath=//body/div/div/div/div/div/div/div[1]/div[3]/button[1]"
    ),

  bikeLightCartHome: (page) =>
    page.locator(
      "xpath=//body//div[@id='page_wrapper']//div[@id='inventory_container']//div[@id='inventory_container']//div[2]//div[3]//button[1]"
    ),

  tShirtCartHome: (page) => page.locator("xpath=//div[3]//div[3]//button[1]"),

  fleeceJacketCartHome: (page) =>
    page.locator("xpath=//div[4]//div[3]//button[1]"),

  onesieCartHome: (page) => page.locator("xpath=//div[5]//div[3]//button[1]"),

  testTshirtCartHome: (page) =>
    page.locator("xpath=//div[6]//div[3]//button[1]"),
};

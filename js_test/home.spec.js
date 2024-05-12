// Require Selenium Webdriver
let webDriver = require('selenium-webdriver'),
    By = webDriver.By,
    until = webDriver.until
let assert = require('assert')

// Require Webdriver for Chrome
// Browser called Chromedriver
require('chromedriver')

const { urlContains, urlIs } = require('selenium-webdriver/lib/until')
// Get the credentials
let { base_url,
    valid_username, valid_password,
    invalid_username, invalid_password,
    valid_assertion, invalid_assertion } = require('../credentials.json')

// Create login function
function loginTest(username, password, assertion) {
    // Build new window of Chrome
    let driver = new webDriver.Builder().forBrowser('chrome').build()
    
    // Open the URL
    driver.get(base_url)
        .then(() => {
            // Find username element
            return driver.findElement(By.id('user-name')).sendKeys(username);
        })
        .then(() => {
            // Find password element
            return driver.findElement(By.id('password')).sendKeys(password);
        })
        .then(() => {
            // Login button click
            return driver.findElement(By.id('login-button')).click();
        })
        .then(() => {
            // Assertion
            return driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "' + assertion + '")]')), 5000);
        })
        .then(() => {
            return driver.findElement(By.xpath('//*[contains(text(), "' + assertion + '")]')).isDisplayed();
        })
        .then((isVisible) => {
            assert.equal(isVisible, true);
            console.log('Element found: ', isVisible);
        })
        .catch((error) => {
            console.log('Error occurs: ', error);
        })
        .finally(() => {
            // Quit the driver after completing all actions
            return driver.quit();
        });
}


// Positive Case - Valid User
loginTest(valid_username, valid_password, valid_assertion)

// Negative Case - Invalid Username
loginTest(invalid_username, valid_password, invalid_assertion)

// Negative Case - Invalid Password
loginTest(valid_username, invalid_password, invalid_assertion)

// Negative Case - Invalid Username & Password
loginTest(invalid_username, invalid_password, invalid_assertion)
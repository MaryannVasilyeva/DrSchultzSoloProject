var pageObject = {}
var data = require('../testAssets/schulzeData')
var fs = require('fs')

module.exports = {
    beforeEach: browser => {
        pageObject = browser.page.schulze()
        pageObject.navigate()
    },
    'Login Test': browser => {
        pageObject
            .loginAndLogout("Sign In")
            .login(data)
    },
    'Add to Shopping Cart Test': browser => {
        pageObject
            .useXpath()
            .selectingItem(navbarData[0].nutrition, shoppingCart[0].superFood)
            .clickButtonByText('Tablets, 390 ct')
            .clickButtonByText('ADD TO CART')
            .checkCart('1')
            .twoSecondPause()
            .selectingItem(navbarData[0].shop, shoppingCart[0].heart)
            .clickButtonByText('4-oz')
            .clickIncreaseButton()
            pageObject.clickButtonByText('ADD TO CART')
            .checkCart('3')
            .twoSecondPause()
            .selectingItem(navbarData[0].immune, shoppingCart[0].cPlus)
            pageObject.clickButtonByText('Powder')
            .twoSecondPause()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickIncreaseButton()
            pageObject.clickButtonByText('ADD TO CART')
            .checkCart('11')
    },
    'Removing from Shopping Cart Test': browser => {
        pageObject
            .useXpath()
            .click('//a[@id="cartDropdownToggleBtn"]')
            .checkCartSummary(shoppingCart[0].superFood)
            .checkCartSummary(shoppingCart[0].heart)
            .checkCartSummary(shoppingCart[0].cPlus)
    },
    'NavBar Test': browser => {
        pageObject
            .clickLinkByText(navbarData[0].shop)
            .verifyUrl(navbarData[0].shopURL)
            .clickLinkByText(navbarData[0].nutrition)
            .verifyUrl(navbarData[0].nutrition)
            .clickLinkByText(navbarData[0].eliminate)
            .verifyUrl(navbarData[0].eliminate)
            .clickLinkByText(navbarData[0].immune)
            .verifyUrl(navbarData[0].immune)
            .clickLinkByText(navbarData[0].detox)
            .verifyUrl(navbarData[0].detox)
            .clickLinkByText(navbarData[0].specifics)
            .verifyUrl(navbarData[0].specifics)
            .clickLinkByText(navbarData[0].naturalHealing)
            .verifyUrl(navbarData[0].naturalHealingURL)
            .clickLinkByText(navbarData[0].blog)
            .verifyUrl(navbarData[0].blog)
            .clickLinkByText(navbarData[0].specials)
            .verifyUrl(navbarData[0].specialsURL)
            .twoSecondPause()
    },
    'Search Test': browser => {
        browser.useCss()
        browser.click('#searchBarToggleBtn')
        pageObject.setValue('@searchInput', ['heart', browser.Keys.ENTER])
        browser
            .useXpath()
            .click('//h3[contains(text(), "Heart Formula")]')
            .useCss()
            .expect.element('h1.name').text.to.equal('HEART FORMULA')
        browser
            .useXpath()
            .moveToElement('(//div[@class="content ingredients-list"]//p)[3]', 0, 0)
            pageObject.twoSecondPause()
        browser
            .getText('(//div[@class="content ingredients-list"]//p)[3]', function (result) {
                var results = result.value
                var herbs = results.split('\n')
                var index = herbs.indexOf('');
                if (index > -1) {
                    herbs.splice(index, 1);
                    herbs.splice(index, 2);
                    herbs.splice(index, 3);
                }
                fs.writeFileSync('./testAssets/herbs.js', JSON.stringify(herbs))
            })
    },
    'Google Search Results TEST': browser => {
        browser.windowHandles(function (results) {
            browser.openNewWindow()
            browser.windowHandles(function (results) {
                var Google = results.value[1]
                browser.switchWindow(Google)
                browser.url('https://www.google.com')
                var herbFile = fs.readFileSync('./testAssets/herbs.js')
                let herbObject = JSON.parse(herbFile)
                herbObject.forEach(function (herb, index) {
                    browser.windowHandles(function (results) {
                        var searchString = herb.split(' ').join('+')
                        Google = results.value[1]
                        browser.switchWindow(Google)
                        browser.url(`https://www.google.com/search?q=${searchString}+wikipedia`)
                        browser.getText('(//h3[contains(text(), "Wikipedia")])[1]', function(result){
                            var results = result.value
                            var scientificName = results.replace(" - Wikipedia", "")
                            browser.useCss()
                            browser.waitForElementVisible('#res')
                            browser.useXpath()
                            browser.click('(//h3[contains(text(), "Wikipedia")])[1]')
                            browser.expect.element('//div[@class="mw-parser-output"]').text.to.contain(scientificName)
                            browser.back()
                        })
                    })
                })
            })
        })
    },
    'Closing Windows and Logging Out': browser => {
        browser.windowHandles(function(results){
            var DrSchulze = results.value[0]
            var Google = results.value[1]
            browser.switchWindow(Google)
            browser.closeWindow()
            browser.switchWindow(DrSchulze)
            pageObject.twoSecondPause()
            pageObject.loginAndLogout("Logout")
        })
    }
}


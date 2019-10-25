var customCommands = {
    clickButtonByText: function (text) {
        this.api.useXpath()
        this.click(`//button[contains( text(), "${text}")]`)
        this.api.useCss()
        return this
    },
    clickLinkByText: function (text) {
        this.api.useXpath()
        this.click(`//li//a//h2[contains(text(), "${text}")]`)
        return this
    },
    verifyUrl: function (url) {
        this.verify.urlContains('https://www.herbdoc.com/' + url)
        return this
    },
    clickIncreaseButton: function (button) {
        this.api.useXpath()
        this.click('//button[@id="increaseBtn"]')
    },
    loginAndLogout: function (data) {
        this.waitForElementPresent('@homepage')
        this.api.useXpath()
        this.waitForElementPresent(`(//a[contains(text(), "${data}")])[1]`)
        this.click(`(//a[contains(text(), "${data}")])[1]`)
        return this
    },
    login: function (loginData) {
        this.api.useCss()
        this.twoSecondPause()
        this.waitForElementPresent('@signInModal')
        this.waitForElementPresent('@emailLogin', 20000)
        this.setValue('@emailLogin', loginData[0].email)
        this.setValue('@passwordLogin', loginData[0].password)
        this.clickButtonByText('SIGN IN')
        this.waitForElementPresent('@signInName')
        return this
    },
    checkCart: function (number) {
        this.twoSecondPause()
        this.api.useXpath()
        this.verify.containsText('//span[@class="badge"]', number)
        return this
    },
    selectingItem: function (navbar, item) {
        this
        if (navbar == "nutrition") {
            this.moveToElement(`//li//a//h2[contains(text(), "${navbar}")]`, 0, 0)
            this.moveToElement(`//div[@class="row product-list"]//h4[contains(text(), "${item}")]`, 0, 0)
            this.click(`//div[@class="row product-list"]//h4[contains(text(), "${item}")]`)
        }
        else if (navbar == "Shop") {
            this.moveToElement(`//li//a//h2[contains(text(), "${navbar}")]`, 0, 0)
            this.moveToElement(`(//h4[contains(text(), "${item}")])[1]`, 0, 0)
            this.click(`(//h4[contains(text(), "${item}")])[1]`)
        }
        else if (navbar == "immune") {
            this.moveToElement(`//li//a//h2[contains(text(), "${navbar}")]`, 0, 0)
            this.moveToElement(`(//h4[contains(text(), "${item}")])[4]`, 0, 0)
            this.click(`(//h4[contains(text(), "${item}")])[4]`)
        }
        return this
    },
    checkCartSummary: function (text) {
        this.api.useXpath()
        this.waitForElementPresent('(//div[@class="panel-body"])[1]')
        this.waitForElementPresent(`(//div[@class="title"]//a[contains(text(), "${text}")])`, 8000)
        this.waitForElementPresent('(//a[@class="remove"])[1]', 8000)
        this.api.pause(3000)
        this.click('(//a[@class="remove"])[1]')
        this.twoSecondPause()
        this.verify.elementNotPresent(`(//div[@class="title"]//a[contains(text(), "${text}")])`, 8000)
        return this
    },
    twoSecondPause: function () {
        this.api.pause(2000)
        return this
    }
}
module.exports = {
    url: 'https://www.herbdoc.com',
    commands: [customCommands],
    elements: {
        homepage: '#home_page',
        signInModal: '#signInModalBody',
        emailLogin: {
            selector: '(//input[@type="email"])[2]',
            locateStrategy: 'xpath'
        },
        passwordLogin: {
            selector: '(//input[@type="password"])[1]',
            locateStrategy: 'xpath'
        },
        signInName: {
            selector: '(//a[contains(text(), "Hi Maryann")])[1]',
            locateStrategy: 'xpath'
        },
        searchInput: {
            selector: '(//input[@type="search"])[2]',
            locateStrategy: 'xpath'
        }
    }

}
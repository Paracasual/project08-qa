const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    
    it('should set the address', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    });

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const supportiveCard = await $(page.supportiveCard);
        await supportiveCard.waitForDisplayed();
        const classes = await supportiveCard.getAttribute('class');
        await expect(classes.split(' ')).toContain('active'); 
    });
    

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillCreditCard('1234 0000 4321', '12');
        const linkedCardElement = '.checkbox-label #card-1';
        const linkedCard = await $(linkedCardElement);
        await browser.pause(1000);
        await expect(linkedCard).toBeExisting();
    });

    it('should write a message', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillComment('Get some beer');
        const commentField = await $(page.commentField);
        const commentValue = await commentField.getValue();
        await expect(commentValue).toEqual('Get some beer');
    });

    it('Should order handkerchiefs and blankets', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await page.toggleBlanket();
        const blanketCheck = await $(page.blanketCheck);
        await expect(blanketCheck).toBeSelected();
    });

    it('should order a couple ice creams', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await page.iceCreamCounter();
        const iceCreamCountText = await $(page.iceCreamCount).getText();
        await expect(iceCreamCountText).toEqual('2'); 
    });
    
    it('should open the car search modal', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCarSearchModal();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    });

    it('should display driver information', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillComment('Get some beer');
        await page.openCarSearchModal();
        await page.showDriverInfo();
        const driverNumberField = await $(page.driverNumberField)
        await expect(driverNumberField).toBeExisting();
    });
});
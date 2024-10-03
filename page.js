module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '//*[@id="code"]',
    creditCardField:'//*[@id="number"]',
    ccvField: '.card-second-row #code',
    commentField: '#comment',
    driverNumberField: ".order-number",

    // Labels
    commentLabel: 'label[for="comment"]',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]/div[1]',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    plusIcecream: '.counter-plus',
    iceCreamCount: '.counter-value',
    orderButton: '.smart-button-wrapper',

    // Checkbox
    blanketButton: 'div.switch',
    blanketCheck: 'input.switch-input',
    
    // Cards
    supportiveCard: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]',

    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '//*[@id="root"]/div/div[2]/div[2]/div[1]',
    creditCardModal: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form',
    carSearchModal: '.order-body',
    
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportive: async function() {
        const supportiveCard = await $(this.supportiveCard);
        await supportiveCard.waitForDisplayed();
        await supportiveCard.click();
    },
    fillCreditCard: async function (creditCard, ccv) {
        // Locate and click the payment button
        const paymentButton = await $(this.paymentButton);
        await paymentButton.waitForDisplayed();
        await paymentButton.click();
    
        // Wait for the payment modal to be displayed
        const paymentModal = await $(this.paymentModal);
        await paymentModal.waitForDisplayed();
    
        // Click the 'add card' button
        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();
    
        // Wait for the credit card modal to be displayed
        const creditCardModal = await $(this.creditCardModal);
        await creditCardModal.waitForDisplayed();
    
        // Enter the credit card number
        const creditCardField = await $(this.creditCardField);
        await creditCardField.setValue(creditCard);
    
        // Enter the CCV number 
        const ccvField = await $(this.ccvField);
        await ccvField.setValue(ccv);
    
        // Click the 'link card' button
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.click();
    },
    fillComment: async function(comment) {
        const commentLabel = await $(this.commentLabel);
        await commentLabel.waitForDisplayed();
        await commentLabel.scrollIntoView();
        await commentLabel.waitForClickable();
        await commentLabel.click();
        const commentField = await $(this.commentField);
        await commentField.waitForDisplayed();
        await commentField.setValue(comment);
    },
    toggleBlanket: async function () {
        const blanketButton = await $(this.blanketButton);
        await blanketButton.waitForDisplayed({ timeout: 20000 });
        await blanketButton.click();
    },
    iceCreamCounter: async function () {
        const plusIcecream = await $(this.plusIcecream);
        await plusIcecream.waitForDisplayed();
        await plusIcecream.click();
        await browser.pause(1000);
        await plusIcecream.click();
    },
    openCarSearchModal: async function() {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForExist();
     },
    showDriverInfo: async function() {
        const driverNumberField = await $(this.driverNumberField);
        await driverNumberField.waitForExist({timeout: 60000});
     }
};
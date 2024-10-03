# Sprint 8 Project - End-to-End (E2E) Test Suite

This project provides an automated end-to-end (E2E) test suite for the **Urban Routes** application, covering the full taxi ordering process on both Chrome and Firefox browsers. The test suite ensures that the user flow works seamlessly across the key steps involved in placing a taxi order.

## Test Coverage

The tests cover the following steps in the user journey:

1. **Setting the Address:** Input and validate the pickup/drop-off address.
2. **Selecting the Supportive Plan:** Ensure the supportive plan option can be selected.
3. **Filling in the Phone Number:** Verify the correct input of the user's phone number.
4. **Adding a Credit Card:** Test the process of entering and saving credit card information.
5. **Writing a Message to the Driver:** Ensure users can write and send a message to the driver.
6. **Ordering Additional Items:** 
    - Blanket and handkerchiefs
    - Two ice creams
7. **Car Search Modal:** Validate that the car search modal appears after placing the order.
8. **Driver Info Modal:** Ensure the driver's information appears in the modal once the car search is complete.

## Technology Stack

- **Node.js**
- **WebdriverIO** for automation

## Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/)
- [WebdriverIO](https://webdriver.io/)

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```bash
    cd /hm08-qa-us
    ```

3. Open the project directory in your preferred source code editor.

4. Install project dependencies:
    ```bash
    npm install
    ```

## Running the Test Suite

To execute the test suite, run the following command in the terminal from the project directory:

```bash
npm run wdio

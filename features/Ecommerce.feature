Feature: Ecommerce validations

    Scenario: Placing the order
        Given The user logins with valid "marian@mailinator.com" and valid "Password123"
        When The user adds "Zara Coat 3" to the Cart
        Then Validate that "Zara Coat 3" is displayed in the Cart
        When Enter valid details and place the order
        Then Validate order is present in the Order History
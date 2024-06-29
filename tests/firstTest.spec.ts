import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async ({page}) => {
    //Command to generate locators
    // npx playwright codegen urlHere

    // By Tag Name
    page.locator('input')

    //By ID
    page.locator('#inputEmail')

    //By Class
    page.locator('.shape-rectangle')

    //By Attribute
    page.locator('[placeholder="Email"]')

    //By Entire Class Value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Combine Different Selectors
    page.locator('input[placeholder="Email"]')

    //By partial text match
    page.locator(':text("Using")')

    //By exact text match
    page.locator(':text-is("Using")') 
    
});

test.skip('Facing using Locators',async ({page}) => {
    //By Role, this top 1 priority suggested to use.
    //This role isn't strictly related with html role attribute
    page.getByRole('textbox', {name: "Email"})
    page.getByRole('button', {name: "Sign in"})

    //By Label
    page.getByLabel('Email')

    //By Placeholder - Paceholder Attribute
    page.getByPlaceholder('Jane Doe')

    //By Text
    page.getByText('Using the Grid')

    //By Title - HTML Attribute
    page.getByTitle('IoT Dashboard')

    //By TestId - This needs to be added as data-testid="" to the source code - html
    page.getByTestId('Value')    
});

test.skip('Child Elements', async({page}) => {
    //Using regular locators
    await page.locator("nb-card nb-radio :text-is('Option 1')").click()

    //Combination of regular and user facing locators
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //Index - Avoid this 
    await page.locator('nb-card').nth(3).getByRole('button').click()
});

test.skip('Parent Elements',async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox', {name: "Email"}).click()

    //This is using the xpath, not recommended by it's an option, with .. we go one step higher
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()


});

test.skip('Reusing locators',async ({page}) => {
    //Save the base of the locator in a constant and then reuse it.
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})

    await basicForm.getByRole('textbox', {name: "Email"}).fill("test@test.com")
    await basicForm.getByRole('textbox', {name: "Password"}).fill("welcome123")
    await basicForm.getByRole('button').click()
    
});

test.skip('Get Text from Elements',async ({page}) => {

    //Single Text Value - textContent()
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //All text values - allTextContents()
    const allRadioButtonsLabel = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabel).toContain('Option 1')

    //Input Value - inputValue() method for text boxes populated
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    expect(await emailField.inputValue()).toEqual('test@test.com')

    //Attribute Value - getAttribute()
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

});

//Playwright has 2 types of assertions, general (Generic Assertions) and locators.
test.skip('Assertions',async({page}) => {
    //Generic Assertion
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator Assertion - Use await, basically has the ability to keep waiting so needs to give it time to assert
    //and that's why uses to await
    await expect(basicFormButton).toHaveText("Submit")

    //Soft Assertions - if it fails, continue with the execution
    await expect.soft(basicFormButton).toHaveText('Submit5')
    
});


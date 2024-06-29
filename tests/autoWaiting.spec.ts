import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto Waiting',async ({page}) => {
    const successButton = page.locator('.bg-success')

    //In this case, the app will wait for the elemtn to be ready to be clicked. Autom Waiting documentation
    //await successButton.click()

    //In this case, for textContent() there is no auto-waiting, so if there is a delay, will fail
    await successButton.waitFor() // By default wait for state: visible but you can specify other options.
    const text = await successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")


    //Expect timeout is 5 secs by default, but you can overwrite it.
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

});

//Alternative waits for commands with no auto waiting
test('Alternative waits', async ({page}) => {

    const successButton = page.locator('.bg-success')

    //wait for element
    //await page.waitForSelector('.bg-success')

    //wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //Wait for network calls to be completed (NOT RECOMMENDED because if a call is stuck, your test will be stuck as well)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")
});
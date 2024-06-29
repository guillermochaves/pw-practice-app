import {expect, test} from '@playwright/test'

/**
 * Iframes is a html inside another html document so the access
 * to the element is not a natural one as we are used to. So, it
 * needs to be addressed in another way using the frameLocator method
 */
test('Drog and drop with iframes', async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop')

    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await iframe.locator('li', {hasText: "High Tatras 2"}).dragTo(iframe.locator('#trash'))

    //More precise Control - to mimic the movement
    await iframe.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await iframe.locator('#trash').hover()
    await page.mouse.up()
});
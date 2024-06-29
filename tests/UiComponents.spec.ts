import {expect, test} from '@playwright/test'
import { LocalDataSource } from 'ng2-smart-table';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Radiobuttons',async ({page}) => {
        // Check method will work.
        // If hidden, use force:true
    });

    test('Checkboxes', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        //Use check and uncheck
        await page.getByRole('checkbox', {name: 'Hide on click'}).check({force:true})
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})
    });

    test('Lists and Dropdown', async({page}) => {
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        //When the list has a UL tag
        //page.getByRole('list')

        //When the list has LI tag
        //page.getByRole('listitem')

        const optionList = page.locator('nb-option-list nb-option')
        await optionList.filter({hasText: "Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    });

    test('Tooltips', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const toolTipCard = page.locator('nb-card', {hasText:'Tooltip Placements'})
        await toolTipCard.getByRole('button', {name:'Top'}).hover()

        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    });

    test('Dialog Boxes', async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

                //Playwright identifies the dialog and automatically cancels it, making imposible make any actions with it
        //So the wau to interact with it, is this one:
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        //Modals that belong to the browser, not the DOM
        await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('nb-trash').click()


    });


})
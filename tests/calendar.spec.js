const {test, expect} = require('@playwright/test');

test('Calendar validations', async ({page}) => {

  const monthNumber = '06';
  const date = '15';
  const year =  '2027';

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.locator('.react-date-picker').click();
  await page.locator('.react-calendar__navigation__label__labelText').click();
  await page.locator('.react-calendar__navigation__label__labelText').click();
  await page.getByRole('button', {name: year}).click();
  await page.locator('.react-calendar__year-view__months__month').nth(monthNumber-1).click();
  await page.locator('.react-calendar__month-view__days__day').filter({hasText: date}).click();

  const dateFromCalendar = await page.locator('input[name="date"]').inputValue();
  expect(dateFromCalendar).toBe(`${year}-${monthNumber}-${date}`);
  
});

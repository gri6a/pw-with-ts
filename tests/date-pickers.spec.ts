import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Date Pickers1", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/datepicker");

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  const mayCalendar = page.locator(".day-cell.ng-star-inserted");
  await mayCalendar.getByText("30", { exact: true }).last().click();
  await expect(calendarInputField).toHaveValue("May 30, 2025");
});

test("Date Pickers2 - using date object", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/datepicker");

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 9);
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

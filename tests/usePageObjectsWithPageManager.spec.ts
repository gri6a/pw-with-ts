import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Go to Form Layouts page / Datepicker page ", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/layouts");

  await pm.navigateTo().datepickerPage();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/datepicker");

  await pm.navigateTo().smartTablePage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/tables/smart-table"
  );

  await pm.navigateTo().toastrPage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/toastr"
  );

  await pm.navigateTo().tooltipPage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/tooltip"
  );
});

test("Submitting Using the Grid Form - valid credentials", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "tester@test.com",
      "Tester123",
      "Option 2"
    );
});

test("Submitting Inline Form - valid credentials", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithRememberMe("Harry Smith", "harry.s@test.com", false);
});

test("Submitting Basic Form - valid credentials", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitBasicFormWithCheckMeOut("email123@test.com", "password123", true);
});

test("Select a date from Common Datepicker", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerFromToday(7);
});

test("Select a date from Range Datepicker", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectRangeDatepickerFromToday(7, 10);
});

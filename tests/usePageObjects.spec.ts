import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Go to Form Layouts page / Datepicker page ", async ({ page }) => {
  const navigateTo = new NavigationPage(page);

  await navigateTo.formLayoutsPage();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/layouts");

  await navigateTo.datepickerPage();
  await expect(page).toHaveURL("http://localhost:4200/pages/forms/datepicker");

  await navigateTo.smartTablePage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/tables/smart-table"
  );

  await navigateTo.toastrPage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/toastr"
  );

  await navigateTo.tooltipPage();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/tooltip"
  );
});

test("Submitting Using the Grid Form - valid credentials", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "tester@test.com",
    "Tester123",
    "Option 2"
  );
});

test("Submitting Inline Form - valid credentials", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitInlineFormWithRememberMe(
    "Harry Smith",
    "harry.s@test.com",
    false
  );
});

test("Submitting Basic Form - valid credentials", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitBasicFormWithCheckMeOut(
    "email123@test.com",
    "password123",
    true
  );
});

test("Select a date from Common Datepicker", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatepickerFromToday(7);
});

test("Select a date from Range Datepicker", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  await navigateTo.datepickerPage();
  await onDatepickerPage.selectRangeDatepickerFromToday(7, 10);
});

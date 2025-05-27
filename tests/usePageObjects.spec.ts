import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

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

import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locating parent elements", async ({ page }) => {
  // await page.getByRole('button', {name: 'Sign in'}).first().click();
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("button", { name: "Sign in" })
    .click();
});
/*
<button _ngcontent-qoq-c287="" type="submit" nbbutton="" status="primary" 
ng-reflect-status="primary" aria-disabled="false" tabindex="0" 
class="appearance-filled size-medium shape-rectangle status-primary nb-transition">Sign in</button>

<button _ngcontent-qoq-c287="" type="submit" nbbutton="" status="warning" 
ng-reflect-status="warning" aria-disabled="false" tabindex="0" 
class="appearance-filled size-medium shape-rectangle status-warning nb-transition">Sign in</button>
*/

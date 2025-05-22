import { state } from "@angular/animations";
import { test, expect } from "@playwright/test";
import { timeout } from "rxjs-compat/operator/timeout";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.skip("Auto wait", async ({ page }) => {
  // allTextContent()
  // await btnLocator.waitFor({state: "attached"});
  // await expect(btnLocator).toHaveText('xyz', {timeout: 20000})
  // test.slow() - can be used for slow tests x3 default timeout
});

test.skip("Alternative waits", async ({ page }) => {
  const horizontalFormSignInBtn = page
    .locator("nb-card")
    .filter({ hasText: "Horizontal form" })
    .getByRole("button");

  // wait for selector
  await page.waitForSelector("nb-card");
  // wait for particular API response
  await page.waitForResponse("URL");
  // adding timeout manually
  await page.waitForTimeout(2000);
});

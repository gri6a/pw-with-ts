import { test, expect } from "@playwright/test";
import { isArray } from "rxjs/internal-compatibility";

test("Drag and drop & iframe", async ({ page }) => {
  await page.goto(
    "https://www.globalsqa.com/demo-site/draganddrop/#google_vignette"
  );
  await page.getByRole("button", { name: "Consent" }).click();

  // 1st method of drag and drop
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
  await frame
    .locator("li h5", { hasText: "High Tatras 2" })
    .dragTo(frame.locator("#trash"));

  // 2nd method of drag and drop - more precise
  //   await frame.locator("li h5", { hasText: "High Tatras 4"}).hover();
  await frame.getByAltText("The peaks of High Tatras").hover();
  await page.mouse.down();
  await frame.locator("#trash").hover();
  await page.mouse.up();
  await expect(frame.locator("#trash li h5")).toHaveText([
    "High Tatras 2",
    "High Tatras",
  ]);
});

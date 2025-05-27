import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Sliders 1 - updating attribute", async ({ page }) => {
  await expect(page).toHaveURL("http://localhost:4200/pages/iot-dashboard");

  await page.locator("nb-card nb-tabset").getByText("Temperature").click();
  const tempGauge = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );
  await tempGauge.evaluate((node) => {
    node.setAttribute("cx", "225.264");
    node.setAttribute("cy", "225.264");
  });
  await tempGauge.click();
});
test("Sliders 2 - mouse movement", async ({ page }) => {
  await expect(page).toHaveURL("http://localhost:4200/pages/iot-dashboard");

  await page.locator("nb-card nb-tabset").getByText("Temperature").click();
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );
  await tempBox.scrollIntoViewIfNeeded();
  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();
  await expect(tempBox).toContainText("30");
});

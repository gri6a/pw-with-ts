import { patch } from "@nebular/theme";
import { test as setup } from "@playwright/test";

const authFile = ".auth/user.json";

setup("authentication", async ({ page }) => {
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page.getByPlaceholder("Email").fill("tester2803@test.com");
  await page.getByPlaceholder("Password").fill("Tester123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForResponse("https://conduit-api.bondaracademy.com/api/tags");
  await page.context().storageState({ path: authFile });
});

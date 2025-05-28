import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{
  constructor(page: Page) {
    super(page);
  }
  /**
   *
   * @param email - valid email for a test user
   * @param password - valid password for a test user
   * @param optionText - enter 'Option 1' or 'Option 2'
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    await this.page.locator("#inputEmail1").fill(email);
    await this.page.locator("#inputPassword2").fill(password);
    await this.page.getByText(optionText).check();
    await this.page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("button", { name: "Sign in" })
      .click();
  }
  /**
   *
   * @param fullName
   * @param email
   * @param rememberMe - true / false -> 'Remember me' checkbox checked / un-checked
   */
  async submitInlineFormWithRememberMe(
    fullName: string,
    email: string,
    rememberMe: boolean
  ) {
    const inlineForm = this.page.locator(".inline-form-card");
    await inlineForm.getByPlaceholder("Jane Doe").fill(fullName);
    await inlineForm.getByPlaceholder("Email").fill(email);
    if (rememberMe)
      await inlineForm.locator(".custom-checkbox").check({ force: true });
    await inlineForm.getByRole("button", { name: "Submit" }).click();
  }
  /**
   * 
   * @param email 
   * @param password 
   * @param checkMeOut - true / false -> 'Check me out' checked / unchecked
   */
  async submitBasicFormWithCheckMeOut(
    email: string,
    password: string,
    checkMeOut: boolean
  ) {
    await this.page.locator("#exampleInputEmail1").fill(email);
    await this.page.locator("#exampleInputPassword1").fill(password);
    if (checkMeOut) await this.page.getByText("Check me out").check();
    await this.page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("button", { name: "Submit" })
      .click();
  }
}

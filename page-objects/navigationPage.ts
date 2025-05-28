import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
    await this.waitForNumberOfSeconds(2);
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    // await this.page.waitForTimeout(2000);
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    // await this.page.getByText("Tables & Data").click();
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    // await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    // await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenuItem(formTitle: string) {
    const formMenuItem = await this.page.getByTitle(formTitle);
    const expandedState = await formMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false") await formMenuItem.click();
  }
}

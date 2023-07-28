const { firefox } = require("playwright");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getEmailContent(email, password) {
  try {
    console.log("Script started");
    const browser = await firefox.launch({
      headless: false,
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://mail.google.com");
    await delay(1000);

    await page.waitForSelector('input[type="email"]', { visible: true });
    await delay(2000);
    await page.type('input[type="email"]', email);
    await page.press('input[type="email"]', "Enter");

    await page.waitForSelector('input[type="password"]', { visible: true });
    await delay(2000);
    await page.type('input[type="password"]', password);
    await delay(1000);
    await page.press('input[type="password"]', "Enter");

    await page.waitForLoadState("networkidle");
    await page.waitForSelector(".bsU");

    const divElement = await page.waitForSelector(".bsU");
    const content = await divElement.textContent();

    console.log("Messages count:", content);
    await delay(1000);

    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

getEmailContent(process.env.EMAIL, process.env.PASSWORD);

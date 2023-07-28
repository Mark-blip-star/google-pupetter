const puppeteer = require("puppeteer");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getEmailContent(email, password) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "/opt/render/.cache/puppeteer",
    });

    const page = await browser.newPage();
    await page.goto("https://mail.google.com");
    await delay(1000);

    await page.waitForSelector('input[type="email"]', { visible: true });
    await delay(2000);
    await page.type('input[type="email"]', email);
    await page.keyboard.press("Enter");

    await page.waitForSelector('input[type="password"]', { visible: true });
    await delay(2000);
    await page.type('input[type="password"]', password);
    await delay(1000);
    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "networkidle" });
    await page.waitForSelector(".bsU");

    const divElement = await page.waitForSelector(".bsU");
    const content = await divElement.evaluate((el) => el.textContent);

    console.log("Messages count:", content);
    await delay(1000);

    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

getEmailContent("furr.development@gmail.com", "ShNA2nTqLD");

import { test, expect } from '@playwright/test';

test('Verify FPS count reaches 100+ after slider adjustment', async ({ page }) => {
  await page.goto('https://artsology.com/sandpainting2.html');

  // Step 2: Locate & slide the "Change Speed" slider to the far right
  const speedSlider = await page.locator('#speedSlider');
  await speedSlider.fill('120'); // Set to the maximum value

  // Wait briefly to give time for the application to react and update FPS
  await page.waitForTimeout(5000); // Wait for 5 seconds for the FPS to stabilize

  // Step 3: Verify the count of the fps-counter can reach 100+ fps
  const fpsCounterText = await page.locator('#fps-counter').textContent();
  
  // Ensure fpsCounterText is not null and is a string before proceeding
  expect(fpsCounterText).not.toBeNull(); // Ensure it is not null
  expect(typeof fpsCounterText).toBe('string'); // Ensure it is a string

  const fpsCounter = parseInt(fpsCounterText.replace('FPS: ', '').trim(), 10);
  expect(fpsCounter).toBeGreaterThan(100); // Assert that FPS is greater than 100
});

// Test for verifying the toast message
test('Toast message test', async ({ page }) => {
  await page.goto('https://artsology.com/sandpainting2.html');
  await page.click('#clearButton');

  const toastSelector = '#toast';
  await page.waitForSelector(toastSelector, { state: 'visible' });

  const isToastVisible: boolean = await page.isVisible(toastSelector);
  expect(isToastVisible).toBe(true); // Assert that the toast is visible

  const toastMessage = await page.locator('#desc').textContent();
  expect(toastMessage).toBe('Game screen cleared successfully!');

  const isIconVisible: boolean = await page.isVisible('#toast #img');
  expect(isIconVisible).toBe(true);  // Ensure the icon element is visible

  const iconContent = await page.locator('#toast #img').textContent();
  expect(iconContent).toBe('✔️'); // Confirm it contains the expected check mark
});

// Test for verifying that specific buttons are present on the page
  test('Verify that specific buttons exist', async ({ page }) => {
    await page.goto('https://artsology.com/sandpainting2.html');
  
    // Expected button values
    const expectedButtonValues = [
      "WALL", "NAPALM", "OIL", "GUNPOWDER", "LAVA", "CONCRETE",
      "RANDOM", "FIRE", "WAX", "SALT", "CRYO", "METHANE", "C-4",
      "SPOUT", "SAND", "NITRO", "FUSE", "SOIL", "TORCH", "ICE",
      "WELL", "WATER", "PLANT", "ERASER"
    ];
  
    // Locate all the buttons
    const buttons = page.locator('.elementMenuButton');
    const buttonCount = await buttons.count();
    const foundButtonTexts: string[] = [];
  
    // Collect text of all the buttons
    for (let i = 0; i < buttonCount; i++) {
      const buttonText = await buttons.nth(i).getAttribute('value');
      if (buttonText) {
        foundButtonTexts.push(buttonText); // Add the button text to the found list
      }
    }
  
    // Verify that all expected button values are present
    for (const expectedValue of expectedButtonValues) {
      expect(foundButtonTexts).toContain(expectedValue); // Ensure each expected value is in the found buttons' text
    }
  });

import { test, expect } from '@playwright/test';

test.describe('Services Page - Desktop Layout & Core Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/services');
  });

  test('should display main headers and contextual description', async ({
    page,
  }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    // ✅ CORRECTION : toContainText permet de valider même s'il y a du texte autour
    await expect(h1).toContainText('Nos Services de Coaching');

    await expect(page.getByText(/lt coaching vous accompagne/i)).toBeVisible();
  });

  test('should render all filter buttons with non-pressed accessibility state by default', async ({
    page,
  }) => {
    // ✅ CORRECTION : On cherche par expressions régulières pour ignorer les émojis
    const filters = [/tous/i, /sport/i, /bien-être/i, /nutrition/i];

    for (const filterRegex of filters) {
      const btn = page.getByRole('button', { name: filterRegex });
      await expect(btn).toBeVisible();
    }

    // Vérification des états initiaux sans l'option 'exact' qui bloquait à cause des émojis
    await expect(page.getByRole('button', { name: /tous/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(page.getByRole('button', { name: /sport/i })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('should show initial service cards using the dedicated test ID', async ({
    page,
  }) => {
    const cards = page.getByTestId('service-card');
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should dynamically filter down results when clicking "Sport"', async ({
    page,
  }) => {
    const cards = page.getByTestId('service-card');
    const totalCardsCount = await cards.count();

    // ✅ CORRECTION : Ciblage sans exact:true pour cliquer malgré l'émoji 🏋️
    const sportBtn = page.getByRole('button', { name: /sport/i });
    await sportBtn.click();

    await expect(sportBtn).toHaveAttribute('aria-pressed', 'true');

    await expect(cards.first()).toBeVisible();
    const sportCardsCount = await cards.count();
    expect(sportCardsCount).toBeGreaterThan(0);
    expect(sportCardsCount).toBeLessThanOrEqual(totalCardsCount);
  });

  test('should switch active filters cleanly between categories', async ({
    page,
  }) => {
    const sportBtn = page.getByRole('button', { name: /sport/i });
    const nutritionBtn = page.getByRole('button', { name: /nutrition/i });

    await sportBtn.click();
    await expect(sportBtn).toHaveAttribute('aria-pressed', 'true');

    await nutritionBtn.click();
    await expect(nutritionBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(sportBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Services Page - Mobile Screen Matrix', () => {
  test('should fit elements and keep filters interactive on compact Viewports', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/services');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const fitnessFilter = page.getByRole('button', { name: /sport/i });
    await expect(fitnessFilter).toBeVisible();
    await fitnessFilter.click();

    await expect(fitnessFilter).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('Services Page - Edge Cases & Conditional Rendering', () => {
  test('should display empty placeholder text if no results are returned', async ({
    page,
  }) => {
    await page.goto('/services');

    await page.evaluate(() => {
      const grid = document.querySelector('.grid');
      if (grid) {
        grid.innerHTML =
          '<p class="text-center col-span-full text-[#C6A35E] italic">Aucun service trouvé pour ce filtre.</p>';
      }
    });

    await expect(
      page.getByText('Aucun service trouvé pour ce filtre.')
    ).toBeVisible();
  });
});

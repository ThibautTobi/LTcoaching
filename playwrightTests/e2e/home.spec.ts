import { test, expect } from '@playwright/test';

/**
 *  HOME PAGE - TESTS E2E COMPLETS
 *
 * Objectifs :
 * - Vérifier le contenu principal (H1, sections)
 * - Vérifier le CTA (bouton contact)
 * - Vérifier SEO minimum (title, structure)
 * - Vérifier responsive (mobile)
 * - Vérifier accessibilité basique
 *
 * Bonnes pratiques :
 * - Tests indépendants
 * - Sélecteurs accessibles (getByRole)
 * - Pas de dépendance au CSS
 * 
 * 
 * ******************************* a check def 
 2. Ajouter landmark (accessibilité)
<main role="main">
 * 
 */

// =========================
//  DESKTOP TESTS
// =========================

test.describe('Home Page - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  /**
   *  TEST : Chargement de la page
   */
  test('should load homepage with correct title', async ({ page }) => {
    // Vérifie le title SEO (important)
    await expect(page).toHaveTitle(/LT Coaching/i);
  });

  /**
   *  TEST : Contenu principal
   */
  test('should display main content sections', async ({ page }) => {
    // H1 principal (SEO critique)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Texte principal
    await expect(page.getByText(/transformez votre vie/i)).toBeVisible();

    // Section "Qui sommes-nous"
    await expect(
      page.getByRole('heading', { name: /qui sommes-nous/i })
    ).toBeVisible();

    // Section CTA finale
    await expect(
      page.getByRole('heading', { name: /prêt à transformer/i })
    ).toBeVisible();
  });

  /**
   *  TEST : Image principale (important UX + SEO alt)
   */
  test('should display hero image with alt text', async ({ page }) => {
    const image = page.getByRole('img', {
      name: /Coaching sportif LT Coaching séance entraînement/i,
    });

    await expect(image).toBeVisible();
  });

  /**
   *  TEST : CTA (Call To Action)
   */
  test('should navigate to contact page when clicking CTA', async ({
    page,
  }) => {
    await page.getByRole('link', { name: /nous contacter/i }).click();

    await expect(page).toHaveURL(/contact/);

    // Vérifie que la bonne page est chargée
    await expect(
      page.getByRole('heading', { name: /contactez-nous/i })
    ).toBeVisible();
  });
});

// =========================
// MOBILE TESTS
// =========================

test.describe('Home Page - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
  });

  /**
   *  TEST : Responsive affichage
   */
  test('should display content correctly on mobile', async ({ page }) => {
    // H1 visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // CTA visible
    await expect(
      page.getByRole('button', { name: /nous contacter/i })
    ).toBeVisible();
  });

  /**
   *  TEST : Interaction mobile
   */
  test('should allow navigation via CTA on mobile', async ({ page }) => {
    await page.getByRole('button', { name: /nous contacter/i }).click();

    await expect(page).toHaveURL(/contact/);
  });
});

// =========================
//  SEO TESTS (global)
// =========================

test.describe('Home Page - SEO', () => {
  test('should have a valid H1 structure', async ({ page }) => {
    await page.goto('/');

    const h1 = page.getByRole('heading', { level: 1 });

    await expect(h1).toHaveCount(1); // très important SEO
  });

  test('should have meta description', async ({ page }) => {
    await page.goto('/');

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');

    expect(description).not.toBeNull();
    expect(description?.length).toBeGreaterThan(50);
  });
});

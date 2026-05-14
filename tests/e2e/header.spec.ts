import { test, expect } from '@playwright/test';

/**
 * HEADER - TESTS E2E
 *
 * Objectifs :
 * - Vérifier affichage logo + slogan
 * - Vérifier navigation
 * - Vérifier interaction logo (retour accueil)
 *
 * Pourquoi :
 * élément global critique (UX + navigation)
 */

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /**
   * Affichage du header
   */
  test('dois voir le logo, slogan et navigation', async ({ page }) => {
    const header = page.locator('header');

    // Vérifie le logo
    const logoLink = header
      .getByRole('link')
      .filter({ has: page.getByRole('img', { name: /logo/i }) });
    await expect(logoLink).toBeVisible();

    // On vérifie que l'image est réellement chargée
    const logoImg = logoLink.getByRole('img');
    const isLoaded = await logoImg.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    );
    expect(isLoaded).toBe(true);

    // Vérifie le slogan
    await expect(header.getByText(/sport bien-être nutrition/i)).toBeVisible();

    // Vérifie que la navigation est présente
    await expect(header.getByRole('navigation')).toBeVisible();
  });

  /**
   * Interaction logo → retour accueil
   */
  test('dois retourner sur le home', async ({ page }) => {
    const header = page.locator('header');

    // On va d'abord sur une autre page
    await page.goto('/contact');

    // On clique sur le logo dans le header
    const logoLink = header
      .getByRole('link')
      .filter({ has: page.getByRole('img', { name: /logo/i }) });
    await logoLink.click();
    // On vérifie le retour à l'accueil
    await expect(page).toHaveURL('/');
  });

  test('la navigation de la barre dois fonctionner', async ({ page }) => {
    const header = page.locator('header');

    const navAccueil = header.getByRole('link', {
      name: 'Accueil',
      exact: true,
    });
    await expect(navAccueil).toBeVisible();

    const contactLink = header.getByRole('link', { name: /contact/i });
    await expect(contactLink).toBeVisible();
  });

  test('dois étre en haut de la page coller (sticky)', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toHaveClass(/sticky/);
    await expect(header).toHaveClass(/top-0/);
  });
});

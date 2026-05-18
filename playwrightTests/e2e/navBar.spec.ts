import { test, expect } from '@playwright/test';

/**
 *  NAVBAR - TESTS COMPLETS (DESKTOP + MOBILE)
 *
 * Objectifs :
 * - Vérifier affichage des liens
 * - Vérifier navigation
 * - Vérifier lien actif (accessibilité)
 * - Vérifier comportement mobile (menu burger)
 *
 * Bonnes pratiques :
 * - Tests courts et ciblés
 * - Sélecteurs accessibles (getByRole)
 * - Pas de dépendance fragile au CSS
 *
 *
 */

const links = ['Accueil', 'Présentation', 'Services', 'Contact'];

// =========================
// DESKTOP
// =========================

test.describe('Navbar - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('should display all links and handle active state', async ({ page }) => {
    const nav = page.getByRole('navigation'); // Cible le <nav> du desktop

    for (const name of links) {
      await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
    }

    // Test du lien actif
    await page.goto('/services');
    await expect(nav.getByRole('link', { name: 'Services' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});

test.describe('Navbar - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    // Viewport iPhone
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
  });

  test('should open and close the mobile menu', async ({ page }) => {
    // 1. Cliquer sur le bouton burger pour ouvrir
    // On s'assure de prendre celui qui est visible
    const burgerBtn = page.getByRole('button', { name: /ouvrir le menu/i });
    await burgerBtn.click();

    // 2. Vérifier que le menu est là
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // 3. Cliquer sur le bouton de fermeture
    // ASTUCE : On cherche le bouton fermer UNIQUEMENT à l'intérieur du menu mobile
    const closeBtn = mobileMenu.getByRole('button', {
      name: /fermer le menu/i,
    });
    await closeBtn.click();

    // 4. Vérifier la fermeture
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate and close menu on link click', async ({ page }) => {
    await page.getByRole('button', { name: /ouvrir le menu/i }).click();

    // On clique sur un lien dans le menu mobile
    await page
      .getByTestId('mobile-menu')
      .getByRole('link', { name: 'Contact' })
      .click();

    await expect(page).toHaveURL(/contact/);
    // Le menu doit avoir disparu
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });
});

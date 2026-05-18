import { test, expect } from '@playwright/test';

/**
 *  FOOTER - TESTS E2E
 *
 * Objectifs :
 * - Vérifier contenu footer
 * - Vérifier navigation
 * - Vérifier contact + réseaux
 *
 * Pourquoi :
 * crédibilité + SEO + conversion
 */

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  /**
   * Affichage global
   */
  test('dois afficher le contenu footer', async ({ page }) => {
    // recherche balise footer et verifie qu'elle est affiché.
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Titre footer
    await expect(
      footer.getByRole('heading', { name: /sport bien-être nutrition/i })
    ).toBeVisible();

    // Vérifie le Logo (via son aria-label)
    const logo = footer.getByRole('link', { name: /accueil/i });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('dois voir les liens de navigation', async ({ page }) => {
    const footer = page.locator('footer');
    // Liens utiles
    await expect(
      footer.getByRole('link', { name: /Présentation/i })
    ).toBeVisible();
    await expect(footer.getByRole('link', { name: /Services/i })).toBeVisible();
    await expect(
      footer.getByRole('link', { name: 'Contact', exact: true })
    ).toBeVisible();
  });

  test('dois avoir les liens de navigation', async ({ page }) => {
    const footer = page.locator('footer');
    // On vérifie que les liens pointent vers les bonnes routes
    const presentationLink = footer.getByRole('link', {
      name: /présentation/i,
    });
    const servicesLink = footer.getByRole('link', { name: /services/i });
    const contactLink = footer.getByRole('link', {
      name: 'Contact',
      exact: true,
    });

    await expect(presentationLink).toHaveAttribute('href', '/presentation');
    await expect(servicesLink).toHaveAttribute('href', '/services');
    await expect(contactLink).toHaveAttribute('href', '/contact');
  });

  /**
   * Navigation via footer
   */
  test('dois naviguer en utilisant les liens du footer', async ({ page }) => {
    const footer = page.locator('footer');

    await footer.getByRole('link', { name: 'Contact', exact: true }).click();

    await expect(page).toHaveURL(/contact/);
  });

  /**
   * Informations de contact
   */
  test('dois avoir les liens de contact valid', async ({ page }) => {
    const footer = page.locator('footer');

    const emailLink = footer.getByRole('link', {
      name: /ltcoaching.contact@gmail.com/i,
    });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute(
      'href',
      'mailto:ltcoaching.contact@gmail.com'
    );

    const telLink = footer.getByRole('link', { name: /07 69 33 08 37/i });
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute('href', 'tel:0769330837');
  });

  /**
   * Réseaux sociaux
   */
  test('dois avoir les liens de reseaux sociaux valid', async ({ page }) => {
    const footer = page.locator('footer');

    const facebookLink = footer.getByLabel('Facebook');
    const instagramLink = footer.getByLabel('Instagram');

    // Vérification des attributs de sécurité pour les liens externes
    await expect(facebookLink).toHaveAttribute('target', '_blank');
    await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    await expect(instagramLink).toHaveAttribute('href', /instagram.com/);
  });

  /**
   * Copyright dynamique
   */
  test('dois avoir le copyright visible', async ({ page }) => {
    const currentYear = new Date().getFullYear().toString();
    const copyright = page.locator('footer').getByText(new RegExp(currentYear));
    await expect(copyright).toBeVisible();
  });
});

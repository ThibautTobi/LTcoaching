import { test, expect } from '@playwright/test';

/**
 * PRESENTATION PAGE - TESTS E2E
 *
 * Objectifs :
 * - Vérifier la validité des métadonnées SEO (Title, Description)
 * - Valider le rendu complet des profils de coachs (Noms et images chargées)
 * - Assurer la présence des boutons d'actions (CTA) vers le formulaire
 * - Analyser dynamiquement la conformité des données structurées Schema.org (JSON-LD)
 */

test.describe('Presentation Page', () => {
  test.beforeEach(async ({ page }) => {
    // On force un affichage desktop standard par défaut
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/presentation');
  });

  /**
   * Validation SEO de base
   */
  test('dois avoir un SEO metadata correct', async ({ page }) => {
    // Vérification du titre de la page
    await expect(page).toHaveTitle(/présentation – lt coaching/i);

    // Vérification de la meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      /Découvrez Laure et Thibaut, coachs sportifs diplômés/
    );
  });

  /**
   * Validation de l'affichage des profils
   */
  test('devraient afficher les profils des entraîneurs avec leurs images vérifiées', async ({
    page,
  }) => {
    // On isole la recherche dans la zone principale (exclut le header/footer)
    const mainZone = page.locator('section');

    // Vérification des titres (H2) contenant les noms exacts
    await expect(
      mainZone.getByRole('heading', { name: 'Laure', exact: true })
    ).toBeVisible();
    await expect(
      mainZone.getByRole('heading', { name: 'Thibaut', exact: true })
    ).toBeVisible();

    // Ciblage des images par leur texte alternatif (alt) unique défini dans le composant
    const imageLaure = page.getByAltText(
      'Laure, coach sportif experte en yoga, nutrition et bien-être'
    );
    const imageThibaut = page.getByAltText(
      'Thibaut, coach sportif spécialisé en préparation physique et mentale'
    );

    await expect(imageLaure).toBeVisible();
    await expect(imageThibaut).toBeVisible();

    // Test technique : s'assurer que les fichiers images ne renvoient pas une erreur 404
    for (const imageLocator of [imageLaure, imageThibaut]) {
      const isLoaded = await imageLocator.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
      );
      expect(isLoaded).toBe(true);
    }
  });

  /**
   * Validation des Liens d'action (CTA)
   */
  test('dois avoir des liens CTA fonctionnels vers la page de contact', async ({
    page,
  }) => {
    // Le bouton utilise désormais 'asChild', c'est sémantiquement un lien (role='link')
    const contactLinks = page.getByRole('link', { name: 'Contactez-moi' });

    // On s'assure qu'au moins le premier profil affiche correctement le lien
    await expect(contactLinks.first()).toBeVisible();

    // On s'assure que la cible de navigation est bien l'URL de contact
    await expect(contactLinks.first()).toHaveAttribute('href', '/contact');
  });

  /**
   * Validation des Données Structurées JSON-LD
   */
  test('doit contenir des données structurées JSON-LD valides pour les deux entraîneurs', async ({
    page,
  }) => {
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const allScripts = await jsonLdScripts.all();

    let personScriptsCount = 0;

    // On boucle sur l'ensemble des scripts de la page pour filtrer ceux de type "Person"
    for (const script of allScripts) {
      const content = await script.innerText();

      try {
        const parsed = JSON.parse(content);

        // Si le script correspond à un profil de coach
        if (parsed['@type'] === 'Person') {
          personScriptsCount++;
          // Validation de la structure commune
          expect(parsed['worksFor']['name']).toBe('LTcoaching');
          expect(parsed['alumniOf']).toContain('BPJEPS AF');
        }
      } catch {
        throw new Error(
          'Un script JSON-LD présent sur la page possède un format JSON invalide.'
        );
      }
    }

    // On valide que l'on a trouvé les structures "Person" pour Laure ET Thibaut
    expect(personScriptsCount).toBe(2);
  });
});

test.describe('Presentation Page - Mobile Responsive', () => {
  test('should display critical elements on mobile screen', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/presentation');

    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    await expect(page.getByText('Laure')).toBeVisible();
    await expect(page.getByText('Thibaut')).toBeVisible();
  });
});

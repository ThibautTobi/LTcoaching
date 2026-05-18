import { test, expect } from '@playwright/test';

/**
 * TESTS E2E - PAGE CONTACT
 *
 * Objectifs :
 * - Vérifier le chargement sémantique initial de la page et du formulaire.
 * - Assurer que la validation des contraintes Zod (Hook Form) bloque l'envoi invalide.
 * - Simuler le passage du reCAPTCHA pour tester l'état d'envoi de l'interface.
 */

test.describe('Contact Page - E2E Layout & Constraints', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/contact');
  });

  test('doit charger correctement les en-têtes de contact et les formulaires accessibilité', async ({
    page,
  }) => {
    // Vérification du titre principal de la page
    await expect(
      page.getByRole('heading', { level: 1, name: /contactez-nous/i })
    ).toBeVisible();

    // Vérification que le formulaire est identifié par sa propriété accessible (aria-label)
    await expect(
      page.getByRole('form', { name: /formulaire de contact/i })
    ).toBeVisible();

    // Présence initiale du bouton d'envoi non désactivé
    const submitBtn = page.getByRole('button', { name: /envoyer/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).not.toBeDisabled();
  });

  test('devrait déclencher la validation du schéma et générer des erreurs lors de la soumission d entrées vides', async ({
    page,
  }) => {
    const submitBtn = page.getByRole('button', { name: /envoyer/i });

    // Soumission à vide pour réveiller React Hook Form + Zod
    await submitBtn.click();

    // Vérification de la levée des messages d'erreur définis dans contactSchema
    await expect(page.getByText('Le nom est requis')).toBeVisible();
    await expect(page.getByText('Le prénom est requis')).toBeVisible();
    await expect(
      page.getByText('Le numéro de téléphone est requis')
    ).toBeVisible();
    await expect(page.getByText('Email invalide')).toBeVisible();
    await expect(page.getByText('Message trop court')).toBeVisible();
  });

  test('doit effacer une erreur de champ spécifique lorsque les données sont saisies correctement', async ({
    page,
  }) => {
    const submitBtn = page.getByRole('button', { name: /envoyer/i });
    await submitBtn.click();

    const emailError = page.getByText('Email invalide');
    await expect(emailError).toBeVisible();

    // Remplissage d'un email conforme
    const emailInput = page.getByPlaceholder('Votre email');
    await emailInput.fill('jean.dupont@gmail.com');

    // L'erreur spécifique à l'email doit s'effacer automatiquement
    await expect(emailError).not.toBeVisible();
  });

  test('doit bloquer la soumission et afficher un avertissement recaptcha si le widget est ignoré', async ({
    page,
  }) => {
    // Remplissage intégral et valide des inputs texte
    await page.getByPlaceholder('Votre nom').fill('Dupont');
    await page.getByPlaceholder('Votre prénom').fill('Jean');
    await page.getByPlaceholder('Votre numéro de téléphone').fill('0612345678');
    await page.getByPlaceholder('Votre email').fill('jean.dupont@gmail.com');
    await page
      .getByPlaceholder('Votre message')
      .fill(
        'Bonjour, je souhaite réserver une séance de coaching à Villers-Ecalles.'
      );

    // On clique sans toucher au reCAPTCHA
    await page.getByRole('button', { name: 'Envoyer', exact: true }).click();

    // La modale/alerte d'erreur codée dans ton composant doit s'ouvrir au milieu de l'écran
    const errorAlert = page.getByText('Veuillez valider le reCAPTCHA.');
    await expect(errorAlert).toBeVisible();

    // L'utilisateur clique sur le bouton "Fermer" de l'alerte d'erreur
    await page.getByRole('button', { name: /fermer/i }).click();

    // L'alerte doit avoir disparu, libérant à nouveau l'accès au formulaire
    await expect(errorAlert).not.toBeVisible();
  });

  test('ne doit pas générer de défilement horizontal sur les smartphones étroits', async ({
    page,
  }) => {
    // Changement de taille d'écran pour simuler un petit smartphone (iPhone SE de 320px de large)
    await page.setViewportSize({ width: 320, height: 568 });
    await page.reload();

    // Évaluation du DOM pour s'assurer que le site ne déborde pas à cause du reCAPTCHA
    const overflowOccurred = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(overflowOccurred).toBe(false);
  });
});

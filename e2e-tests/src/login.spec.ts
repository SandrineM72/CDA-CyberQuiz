import { test, expect } from "@playwright/test";
import { clearDB } from "../../backend/src/db/resetDB/utils";
import { connectDB, disconnectDB } from "./dbHelpers";
import { User } from "../../backend/src/entities/User";
import { hash } from "argon2";

test.beforeAll(connectDB);
test.beforeEach(clearDB);
test.afterAll(disconnectDB);

test("un administrateur peut se connecter et accède à l'interface admin", async ({ page }) => {
    // Créer un utilisateur admin en base de données
    const admin = await User.create({
        email: "admin@cyberquiz.com",
        pseudo: "Admincq",
        hashedPassword: await hash("Password123!"),
        avatar: "https://i.pravatar.cc/150?img=38",
        is_admin: true
    }).save();

    // Aller sur la page de connexion
    await page.goto('/login-page');

    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');

    // Remplir le formulaire de connexion
    await page.getByTestId("login-pseudo").fill("Admincq");
    await page.getByTestId("login-password").fill("Password123!");

    // Cliquer sur le bouton de connexion
    await page.getByTestId("login-submit").click();

    // Attendre la redirection et l'alerte
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe("Connexion réussie en tant qu'administrateur !");
        await dialog.accept();
    });

    // Vérifier la redirection vers la page admin
    await page.waitForURL('/admin', { timeout: 10000 });
    expect(page.url()).toContain('/admin');

    // Vérifier que le contenu de la page admin est affiché
    await expect(page.getByText("Bienvenue sur l'écran de l'administration CyberQuiz !")).toBeVisible();
    await expect(page.getByText("Gestion des utilisateurs")).toBeVisible();
    await expect(page.getByText("Gestion des quiz")).toBeVisible();
    await expect(page.getByText("Consultation des statistiques")).toBeVisible();
});

test("un utilisateur normal peut se connecter et accède à la page de choix", async ({ page }) => {
    // Créer un utilisateur normal en base de données
    const user = await User.create({
        email: "user@cyberquiz.com",
        pseudo: "UserTest",
        hashedPassword: await hash("Password123!"),
        avatar: "https://i.pravatar.cc/150?img=10",
        is_admin: false
    }).save();

    // Aller sur la page de connexion
    await page.goto('/login-page');

    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');

    // Remplir le formulaire de connexion
    await page.getByTestId("login-pseudo").fill("UserTest");
    await page.getByTestId("login-password").fill("Password123!");

    // Cliquer sur le bouton de connexion
    await page.getByTestId("login-submit").click();

    // Attendre l'alerte
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe("Connexion réussie en tant que joueur !");
        await dialog.accept();
    });

    // Vérifier la redirection vers la page de choix
    await page.waitForURL('/choice-page', { timeout: 10000 });
    expect(page.url()).toContain('/choice-page');
});

test("la connexion échoue avec un mauvais mot de passe", async ({ page }) => {
    // Créer un utilisateur en base de données
    const user = await User.create({
        email: "user@cyberquiz.com",
        pseudo: "UserTest",
        hashedPassword: await hash("Password123!"),
        avatar: "https://i.pravatar.cc/150?img=10",
        is_admin: false
    }).save();

    // Aller sur la page de connexion
    await page.goto('/login-page');

    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');

    // Remplir le formulaire avec un mauvais mot de passe
    await page.getByTestId("login-pseudo").fill("UserTest");
    await page.getByTestId("login-password").fill("WrongPassword!");

    // Cliquer sur le bouton de connexion
    await page.getByTestId("login-submit").click();

    // Vérifier qu'un message d'erreur s'affiche
    await expect(page.getByTestId("login-error")).toBeVisible();
});

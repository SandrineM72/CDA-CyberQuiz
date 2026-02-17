import db from "../index";
import { clearDB } from "./utils";
import { createThemes } from "./theme";
import { createLevels } from "./level";
import { createRewards } from "./reward";
import { createUsers } from "./user";
import { createQuizzes } from "./quiz";
import { createPhishingQuestions } from "./questions/phishing";
import { createPasswordQuestions } from "./questions/password";
import { createNetworkQuestions } from "./questions/network";
import { createMalwareQuestions } from "./questions/malware";
import { createPrivacyQuestions } from "./questions/privacy";
import { createAttempts } from "./attempt";
import { createRelations } from "./relations";

async function main() {
  await clearDB();

  // Créer les thèmes et niveaux (sans dépendances)
  const themes = await createThemes();
  const levels = await createLevels();

  // Créer les récompenses (sans dépendances)
  const rewards = await createRewards();

  // Créer les utilisateurs (sans dépendances)
  const users = await createUsers();

  // Créer les quiz (dépend de themes et levels)
  const quizzes = await createQuizzes({
    phishingTheme: themes.phishingTheme,
    passwordTheme: themes.passwordTheme,
    networkTheme: themes.networkTheme,
    malwareTheme: themes.malwareTheme,
    privacyTheme: themes.privacyTheme,
    beginnerLevel: levels.beginnerLevel,
    advancedLevel: levels.advancedLevel,
    expertLevel: levels.expertLevel,
  });

  // Créer les questions et choix par thème (dépend de quizzes)
  
  // Thème 1 : Phishing et Ingénierie Sociale
  await createPhishingQuestions({
    phishing_beginner_1: quizzes.phishing_beginner_1,
    phishing_beginner_2: quizzes.phishing_beginner_2,
    phishing_advanced_1: quizzes.phishing_advanced_1,
    phishing_advanced_2: quizzes.phishing_advanced_2,
    phishing_expert_1: quizzes.phishing_expert_1,
    phishing_expert_2: quizzes.phishing_expert_2,
  });

  // Thème 2 : Mots de Passe et Authentification
  await createPasswordQuestions({
    password_beginner_1: quizzes.password_beginner_1,
    password_beginner_2: quizzes.password_beginner_2,
    password_advanced_1: quizzes.password_advanced_1,
    password_advanced_2: quizzes.password_advanced_2,
    password_expert_1: quizzes.password_expert_1,
    password_expert_2: quizzes.password_expert_2,
  });

  // Thème 3 : Réseaux et Connexions
  await createNetworkQuestions({
    network_beginner_1: quizzes.network_beginner_1,
    network_beginner_2: quizzes.network_beginner_2,
    network_advanced_1: quizzes.network_advanced_1,
    network_advanced_2: quizzes.network_advanced_2,
    network_expert_1: quizzes.network_expert_1,
    network_expert_2: quizzes.network_expert_2,
  });

  // Thème 4 : Malwares et Menaces
  await createMalwareQuestions({
    malware_beginner_1: quizzes.malware_beginner_1,
    malware_beginner_2: quizzes.malware_beginner_2,
    malware_advanced_1: quizzes.malware_advanced_1,
    malware_advanced_2: quizzes.malware_advanced_2,
    malware_expert_1: quizzes.malware_expert_1,
    malware_expert_2: quizzes.malware_expert_2,
  });

  // Thème 5 : Protection des Données
  await createPrivacyQuestions({
    privacy_beginner_1: quizzes.privacy_beginner_1,
    privacy_beginner_2: quizzes.privacy_beginner_2,
    privacy_advanced_1: quizzes.privacy_advanced_1,
    privacy_advanced_2: quizzes.privacy_advanced_2,
    privacy_expert_1: quizzes.privacy_expert_1,
    privacy_expert_2: quizzes.privacy_expert_2,
  });

  // Créer les tentatives (dépend de users et quizzes)
  await createAttempts({
    user1: users.user1,
    user2: users.user2,
    quiz1: quizzes.phishing_beginner_1,
    quiz2: quizzes.password_beginner_1,
  });

  // Créer les relations many-to-many (dépend de users, quizzes et rewards)
  await createRelations({
    user1: users.user1,
    user2: users.user2,
    quiz1: quizzes.phishing_beginner_1,
    quiz2: quizzes.password_beginner_1,
    bronzeReward: rewards.bronzeReward,
    silverReward: rewards.silverReward,
  });

  await db.destroy();
  console.log("✅ Base de données réinitialisée avec succès !");
}

main();

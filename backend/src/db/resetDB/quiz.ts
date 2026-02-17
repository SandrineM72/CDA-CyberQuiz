import { Quiz } from "../../entities/Quiz";
import type { Theme } from "../../entities/Theme";
import type { Level } from "../../entities/Level";

interface CreateQuizzesParams {
  phishingTheme: Theme;
  passwordTheme: Theme;
  networkTheme: Theme;
  malwareTheme: Theme;
  privacyTheme: Theme;
  beginnerLevel: Level;
  advancedLevel: Level;
  expertLevel: Level;
}

export async function createQuizzes({
  phishingTheme,
  passwordTheme,
  networkTheme,
  malwareTheme,
  privacyTheme,
  beginnerLevel,
  advancedLevel,
  expertLevel,
}: CreateQuizzesParams) {

  // ========================================
  // THÈME 1 : PHISHING ET INGÉNIERIE SOCIALE
  // ========================================

  // ----- Niveau Débutant -----
  const phishing_beginner_1 = await Quiz.create({
    title: "Premiers pas contre le phishing",
    description: "Apprenez à reconnaître les emails suspects du quotidien",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: true, // QUIZ PUBLIC THEME 1 NIVEAU DEBUTANT
    is_draft: false,
    theme: phishingTheme,
    level: beginnerLevel
  }).save();

  const phishing_beginner_2 = await Quiz.create({
    title: "Réseaux sociaux et arnaques",
    description: "Protégez-vous des pièges sur Facebook, Instagram et autres",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: phishingTheme,
    level: beginnerLevel
  }).save();

  // ----- Niveau Avancé -----
  const phishing_advanced_1 = await Quiz.create({
    title: "Phishing ciblé en entreprise",
    description: "Reconnaître les attaques sophistiquées au travail",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: phishingTheme,
    level: advancedLevel
  }).save();

  const phishing_advanced_2 = await Quiz.create({
    title: "Vérification d'URL et domaines",
    description: "Détecter les sites frauduleux et les faux domaines",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: phishingTheme,
    level: advancedLevel
  }).save();

  // ----- Niveau Expert -----
  const phishing_expert_1 = await Quiz.create({
    title: "Business Email Compromise (BEC)",
    description: "Comprendre et contrer les attaques BEC ciblant les dirigeants",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: phishingTheme,
    level: expertLevel
  }).save();

  const phishing_expert_2 = await Quiz.create({
    title: "Ingénierie sociale avancée",
    description: "Techniques de manipulation psychologique et défenses",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: phishingTheme,
    level: expertLevel
  }).save();

  // ========================================
  // THÈME 2 : MOTS DE PASSE ET AUTHENTIFICATION
  // ========================================

  // ----- Niveau Débutant -----
  const password_beginner_1 = await Quiz.create({
    title: "Créer des mots de passe solides",
    description: "Les bases pour protéger vos comptes en ligne",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: passwordTheme,
    level: beginnerLevel
  }).save();

  const password_beginner_2 = await Quiz.create({
    title: "Double authentification pour tous",
    description: "Pourquoi et comment activer la 2FA sur vos comptes",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: passwordTheme,
    level: beginnerLevel
  }).save();

  // ----- Niveau Avancé -----
  const password_advanced_1 = await Quiz.create({
    title: "Gestionnaires de mots de passe",
    description: "Utiliser un gestionnaire pour sécuriser tous vos comptes",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: true, // QUIZ PUBLIC THEME  NIVEAU AVANCE
    is_draft: false,
    theme: passwordTheme,
    level: advancedLevel
  }).save();

  const password_advanced_2 = await Quiz.create({
    title: "Fuites de données et compromission",
    description: "Vérifier si vos mots de passe ont été exposés",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: passwordTheme,
    level: advancedLevel
  }).save();

  // ----- Niveau Expert -----
  const password_expert_1 = await Quiz.create({
    title: "Authentification moderne et biométrie",
    description: "Passkeys, FIDO2 et authentification sans mot de passe",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: passwordTheme,
    level: expertLevel
  }).save();

  const password_expert_2 = await Quiz.create({
    title: "Attaques par force brute et dictionnaire",
    description: "Comprendre comment les pirates cassent les mots de passe",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: passwordTheme,
    level: expertLevel
  }).save();

  // ========================================
  // THÈME 3 : RÉSEAUX ET CONNEXIONS
  // ========================================

  // ----- Niveau Débutant -----
  const network_beginner_1 = await Quiz.create({
    title: "WiFi public : les dangers",
    description: "Comprendre les risques des réseaux WiFi gratuits",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: networkTheme,
    level: beginnerLevel
  }).save();

  const network_beginner_2 = await Quiz.create({
    title: "Navigation sécurisée au quotidien",
    description: "Bonnes pratiques pour surfer sur Internet en toute sécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: networkTheme,
    level: beginnerLevel
  }).save();

  // ----- Niveau Avancé -----
  const network_advanced_1 = await Quiz.create({
    title: "VPN et chiffrement",
    description: "Utiliser un VPN pour protéger vos connexions",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: networkTheme,
    level: advancedLevel
  }).save();

  const network_advanced_2 = await Quiz.create({
    title: "Hotspots malveillants",
    description: "Reconnaître et éviter les faux points d'accès WiFi",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: networkTheme,
    level: advancedLevel
  }).save();

  // ----- Niveau Expert -----
  const network_expert_1 = await Quiz.create({
    title: "Attaques Man-in-the-Middle",
    description: "Comprendre et détecter les interceptions de communication",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: true, // QUIZ PUBLIC THEME 3 NIVEAU EXPERT
    is_draft: false,
    theme: networkTheme,
    level: expertLevel
  }).save();

  const network_expert_2 = await Quiz.create({
    title: "Protocoles de sécurité WiFi",
    description: "WEP, WPA, WPA2, WPA3 : comprendre les différences",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: networkTheme,
    level: expertLevel
  }).save();

  // ========================================
  // THÈME 4 : MALWARES ET MENACES
  // ========================================

  // ----- Niveau Débutant -----
  const malware_beginner_1 = await Quiz.create({
    title: "Reconnaître les virus et malwares",
    description: "Identifier les signes d'infection de votre ordinateur",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: beginnerLevel
  }).save();

  const malware_beginner_2 = await Quiz.create({
    title: "Téléchargements sécurisés",
    description: "Éviter les pièges lors du téléchargement de logiciels",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: beginnerLevel
  }).save();

  // ----- Niveau Avancé -----
  const malware_advanced_1 = await Quiz.create({
    title: "Ransomwares : comprendre et prévenir",
    description: "Se protéger des logiciels de rançon",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: advancedLevel
  }).save();

  const malware_advanced_2 = await Quiz.create({
    title: "Trojans et spywares",
    description: "Détecter les logiciels espions et chevaux de Troie",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: advancedLevel
  }).save();

  // ----- Niveau Expert -----
  const malware_expert_1 = await Quiz.create({
    title: "APT et menaces persistantes",
    description: "Comprendre les attaques ciblées et sophistiquées",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: expertLevel
  }).save();

  const malware_expert_2 = await Quiz.create({
    title: "Zero-day et exploits avancés",
    description: "Menaces inconnues et vulnérabilités non corrigées",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: malwareTheme,
    level: expertLevel
  }).save();

  // ========================================
  // THÈME 5 : PROTECTION DES DONNÉES
  // ========================================

  // ----- Niveau Débutant -----
  const privacy_beginner_1 = await Quiz.create({
    title: "Vie privée sur les réseaux sociaux",
    description: "Protéger vos données personnelles en ligne",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: beginnerLevel
  }).save();

  const privacy_beginner_2 = await Quiz.create({
    title: "Paramètres de confidentialité essentiels",
    description: "Configurer correctement vos comptes en ligne",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 300,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: beginnerLevel
  }).save();

  // ----- Niveau Avancé -----
  const privacy_advanced_1 = await Quiz.create({
    title: "RGPD et droits numériques",
    description: "Comprendre vos droits sur vos données personnelles",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: advancedLevel
  }).save();

  const privacy_advanced_2 = await Quiz.create({
    title: "Chiffrement et anonymat en ligne",
    description: "Outils pour protéger votre vie privée numérique",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 400,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: advancedLevel
  }).save();

  // ----- Niveau Expert -----
  const privacy_expert_1 = await Quiz.create({
    title: "Surveillance numérique et traçage",
    description: "Comprendre le tracking publicitaire et la collecte de données",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: expertLevel
  }).save();

  const privacy_expert_2 = await Quiz.create({
    title: "Métadonnées et empreinte numérique",
    description: "Ce que révèlent vos données cachées",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    time_limit: 500,
    is_public: false,
    is_draft: false,
    theme: privacyTheme,
    level: expertLevel
  }).save();

  return {
    phishing_beginner_1,
    phishing_beginner_2,
    phishing_advanced_1,
    phishing_advanced_2,
    phishing_expert_1,
    phishing_expert_2,
    password_beginner_1,
    password_beginner_2,
    password_advanced_1,
    password_advanced_2,
    password_expert_1,
    password_expert_2,
    network_beginner_1,
    network_beginner_2,
    network_advanced_1,
    network_advanced_2,
    network_expert_1,
    network_expert_2,
    malware_beginner_1,
    malware_beginner_2,
    malware_advanced_1,
    malware_advanced_2,
    malware_expert_1,
    malware_expert_2,
    privacy_beginner_1,
    privacy_beginner_2,
    privacy_advanced_1,
    privacy_advanced_2,
    privacy_expert_1,
    privacy_expert_2,
  };
}

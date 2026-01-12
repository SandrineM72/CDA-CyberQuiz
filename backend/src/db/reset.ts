import { unlink } from "node:fs/promises";
import { resolve } from "node:path";

import { User } from "../entities/User";
import { Attempt } from "../entities/Attempt";
import { Quiz } from "../entities/Quiz";
import { Category } from "../entities/Category";
import { Decade } from "../entities/Decade";
import { Question } from "../entities/Question";
import { Reward} from "../entities/Reward";
import { Choice } from "../entities/Choice";


import db from "./index";
import { AgeRange } from "../types";
import { hash } from "argon2";

export async function clearDB() {
  await unlink(resolve("src/db/db.sqlite"));
}

async function main() {
  await clearDB().catch(console.error);
  await db.initialize();


// ===== CATEGORIES =====
  const comedieCategory = await Category.create({ 
    name: "Comédie" 
  }).save();
  
  const drameCategory = await Category.create({ 
    name: "Drame" 
  }).save();
  
  const actionCategory = await Category.create({ 
    name: "Action" 
  }).save();


// ===== DECADES =====
  const decade80 = await Decade.create({ 
    name: "Années 80" 
  }).save();
  
  const decade90 = await Decade.create({ 
    name: "Années 90" 
  }).save();
  
  const decade2000 = await Decade.create({ 
    name: "Années 2000" 
  }).save();


  // ===== REWARDS =====
  const bronzeReward = await Reward.create({
    name: "Trophée Bronze",
    image: "https://example.com/bronze.png"
  }).save();

  const silverReward = await Reward.create({
    name: "Trophée Argent",
    image: "https://example.com/silver.png"
  }).save();

  const goldReward = await Reward.create({
    name: "Trophée Or",
    image: "https://example.com/gold.png"
  }).save();

  
 // ===== USERS =====
  const user1 = await User.create({
    email: "marie@example.com",
    pseudo: "MarieCinephile",
    age_range: AgeRange.TOUS_PUBLICS,
    hashedPassword: await hash ("Password123!"),
    avatar: "https://example.com/avatar1.png",
    is_admin: false
  }).save();

  const user2 = await User.create({
    email: "jean@example.com",
    pseudo: "JeanDuCinema",
    age_range: AgeRange.TOUS_PUBLICS,
    hashedPassword: await hash ("Password123!"),
    avatar: "https://example.com/avatar2.png",
    is_admin: false
  }).save();

  const admin = await User.create({
    email: "admin@cinequizz.com",
    pseudo: "AdminCineQuizz",
    age_range: AgeRange.TOUS_PUBLICS,
    hashedPassword: await hash("Password123!"),
    avatar: "https://example.com/admin.png",
    is_admin: true
  }).save();


   // ===== QUIZ =====
  const quiz1 = await Quiz.create({
    title: "Les Comédies Françaises Cultes",
    description: "Testez vos connaissances sur les comédies françaises incontournables",
    image: "https://example.com/quiz1.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 300,
    is_public: true,
    is_draft: false,
    category: comedieCategory,
    decade: decade90
  }).save();

  const quiz2 = await Quiz.create({
    title: "Le Cinéma d'Action des Années 80",
    description: "Plongez dans l'univers explosif du cinéma d'action",
    image: "https://example.com/quiz2.jpg",
    age_range: AgeRange.MOINS_16,
    time_limit: 600,
    is_public: true,
    is_draft: false,
    category: actionCategory,
    decade: decade80
  }).save();

  const quiz3 = await Quiz.create({
    title: "Les Drames des Années 2000",
    description: "Explorez les films dramatiques qui ont marqué les années 2000",
    image: "https://example.com/quiz3.jpg",
    age_range: AgeRange.MOINS_12,
    time_limit: 450,
    is_public: false,
    is_draft: false,
    category: drameCategory,
    decade: decade2000
  }).save();


// ===== QUESTIONS & CHOICES pour Quiz 1 =====
  const question1_1 = await Question.create({
    title: "Dans quel film Gérard Depardieu joue-t-il un homme préhistorique ?",
    quiz: quiz1
  }).save();

  await Choice.create({
    description: "Les Visiteurs",
    is_correct: false,
    question: question1_1
  }).save();

  await Choice.create({
    description: "RRRrrrr!!!",
    is_correct: true,
    question: question1_1
  }).save();

  await Choice.create({
    description: "Astérix et Obélix",
    is_correct: false,
    question: question1_1
  }).save();

  await Choice.create({
    description: "Le Dîner de Cons",
    is_correct: false,
    question: question1_1
  }).save();

  const question1_2 = await Question.create({
    title: "Qui réalise 'La Cité de la Peur' ?",
    quiz: quiz1
  }).save();

  await Choice.create({
    description: "Les Nuls",
    is_correct: true,
    question: question1_2
  }).save();

  await Choice.create({
    description: "Les Inconnus",
    is_correct: false,
    question: question1_2
  }).save();

  await Choice.create({
    description: "Le Splendid",
    is_correct: false,
    question: question1_2
  }).save();

  await Choice.create({
    description: "Coluche",
    is_correct: false,
    question: question1_2
  }).save();

  const question1_3 = await Question.create({
    title: "Dans 'Le Père Noël est une Ordure', quel est le nom du personnage joué par Thierry Lhermitte ?",
    quiz: quiz1
  }).save();

  await Choice.create({
    description: "Pierre Mortez",
    is_correct: true,
    question: question1_3
  }).save();

  await Choice.create({
    description: "Félix",
    is_correct: false,
    question: question1_3
  }).save();

  await Choice.create({
    description: "Thérèse",
    is_correct: false,
    question: question1_3
  }).save();

  await Choice.create({
    description: "Zézette",
    is_correct: false,
    question: question1_3
  }).save();


// ===== QUESTIONS & CHOICES pour Quiz 2 =====
  const question2_1 = await Question.create({
    title: "Quel acteur incarne le cyborg T-800 dans 'Terminator' ?",
    quiz: quiz2
  }).save();

  await Choice.create({
    description: "Sylvester Stallone",
    is_correct: false,
    question: question2_1
  }).save();

  await Choice.create({
    description: "Arnold Schwarzenegger",
    is_correct: true,
    question: question2_1
  }).save();

  await Choice.create({
    description: "Jean-Claude Van Damme",
    is_correct: false,
    question: question2_1
  }).save();

  await Choice.create({
    description: "Bruce Willis",
    is_correct: false,
    question: question2_1
  }).save();

  const question2_2 = await Question.create({
    title: "Dans quel film entend-on 'Yippee-ki-yay' ?",
    quiz: quiz2
  }).save();

  await Choice.create({
    description: "Die Hard",
    is_correct: true,
    question: question2_2
  }).save();

  await Choice.create({
    description: "Predator",
    is_correct: false,
    question: question2_2
  }).save();

  await Choice.create({
    description: "RoboCop",
    is_correct: false,
    question: question2_2
  }).save();

  await Choice.create({
    description: "Total Recall",
    is_correct: false,
    question: question2_2
  }).save();

  const question2_3 = await Question.create({
    title: "Qui réalise 'Alien' en 1979 ?",
    quiz: quiz2
  }).save();

  await Choice.create({
    description: "James Cameron",
    is_correct: false,
    question: question2_3
  }).save();

  await Choice.create({
    description: "Ridley Scott",
    is_correct: true,
    question: question2_3
  }).save();

  await Choice.create({
    description: "John Carpenter",
    is_correct: false,
    question: question2_3
  }).save();

  await Choice.create({
    description: "George Lucas",
    is_correct: false,
    question: question2_3
  }).save();


// ===== QUESTIONS & CHOICES pour Quiz 3 =====
  const question3_1 = await Question.create({
    title: "Quel film français remporte la Palme d'Or en 2008 ?",
    quiz: quiz3
  }).save();

  await Choice.create({
    description: "Entre les murs",
    is_correct: true,
    question: question3_1
  }).save();

  await Choice.create({
    description: "La Vie d'Adèle",
    is_correct: false,
    question: question3_1
  }).save();

  await Choice.create({
    description: "Amour",
    is_correct: false,
    question: question3_1
  }).save();

  await Choice.create({
    description: "Le Pianiste",
    is_correct: false,
    question: question3_1
  }).save();

  const question3_2 = await Question.create({
    title: "Dans quel film Marion Cotillard incarne-t-elle Édith Piaf ?",
    quiz: quiz3
  }).save();

  await Choice.create({
    description: "La Môme",
    is_correct: true,
    question: question3_2
  }).save();

  await Choice.create({
    description: "Coco avant Chanel",
    is_correct: false,
    question: question3_2
  }).save();

  await Choice.create({
    description: "Les Choristes",
    is_correct: false,
    question: question3_2
  }).save();

  await Choice.create({
    description: "Intouchables",
    is_correct: false,
    question: question3_2
  }).save();

  const question3_3 = await Question.create({
    title: "Quel réalisateur a créé 'Le Fabuleux Destin d'Amélie Poulain' ?",
    quiz: quiz3
  }).save();

  await Choice.create({
    description: "Luc Besson",
    is_correct: false,
    question: question3_3
  }).save();

  await Choice.create({
    description: "Jean-Pierre Jeunet",
    is_correct: true,
    question: question3_3
  }).save();

  await Choice.create({
    description: "François Ozon",
    is_correct: false,
    question: question3_3
  }).save();

  await Choice.create({
    description: "Olivier Assayas",
    is_correct: false,
    question: question3_3
  }).save();


// ===== QUIZZES PRIVÉS (8 quizzes) =====
  const quiz4 = await Quiz.create({
    title: "Les Blockbusters des Années 80",
    description: "Testez vos connaissances sur les plus grands succès du box-office des années 80",
    image: "https://example.com/quiz4.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 600,
    is_public: false,
    is_draft: false,
    category: actionCategory,
    decade: decade80
  }).save();

  const quiz5 = await Quiz.create({
    title: "Comédies Romantiques des Années 90",
    description: "Plongez dans l'univers des comédies romantiques qui ont marqué les années 90",
    image: "https://example.com/quiz5.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 480,
    is_public: false,
    is_draft: false,
    category: comedieCategory,
    decade: decade90
  }).save();

  const quiz6 = await Quiz.create({
    title: "Thrillers Psychologiques des Années 2000",
    description: "Explorez les thrillers psychologiques qui ont marqué le début du millénaire",
    image: "https://example.com/quiz6.jpg",
    age_range: AgeRange.MOINS_16,
    time_limit: 540,
    is_public: false,
    is_draft: false,
    category: drameCategory,
    decade: decade2000
  }).save();

  const quiz7 = await Quiz.create({
    title: "Science-Fiction des Années 80",
    description: "Voyagez dans le temps avec les films de science-fiction cultes des années 80",
    image: "https://example.com/quiz7.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 600,
    is_public: false,
    is_draft: false,
    category: actionCategory,
    decade: decade80
  }).save();

  const quiz8 = await Quiz.create({
    title: "Drames Historiques des Années 2000",
    description: "Découvrez les drames historiques qui ont marqué le cinéma des années 2000",
    image: "https://example.com/quiz8.jpg",
    age_range: AgeRange.MOINS_12,
    time_limit: 720,
    is_public: false,
    is_draft: false,
    category: drameCategory,
    decade: decade2000
  }).save();

  const quiz9 = await Quiz.create({
    title: "Comédies Américaines des Années 90",
    description: "Revisitez les comédies américaines qui ont fait rire toute une génération",
    image: "https://example.com/quiz9.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 450,
    is_public: false,
    is_draft: false,
    category: comedieCategory,
    decade: decade90
  }).save();

  const quiz10 = await Quiz.create({
    title: "Films d'Horreur des Années 80",
    description: "Frissonnez avec les films d'horreur cultes des années 80",
    image: "https://example.com/quiz10.jpg",
    age_range: AgeRange.MOINS_16,
    time_limit: 480,
    is_public: false,
    is_draft: false,
    category: drameCategory,
    decade: decade80
  }).save();

  const quiz11 = await Quiz.create({
    title: "Comédies Dramatiques des Années 2000",
    description: "Explorez les comédies dramatiques qui ont touché le public des années 2000",
    image: "https://example.com/quiz11.jpg",
    age_range: AgeRange.TOUS_PUBLICS,
    time_limit: 540,
    is_public: false,
    is_draft: false,
    category: comedieCategory,
    decade: decade2000
  }).save();


// ===== QUESTIONS & CHOICES pour Quiz 4 (Blockbusters 80) =====
  const q4_1 = await Question.create({ title: "Quel film de 1982 met en scène un extra-terrestre amical nommé E.T. ?", quiz: quiz4 }).save();
  await Choice.create({ description: "E.T. l'extra-terrestre", is_correct: true, question: q4_1 }).save();
  await Choice.create({ description: "Rencontres du troisième type", is_correct: false, question: q4_1 }).save();
  await Choice.create({ description: "Close Encounters", is_correct: false, question: q4_1 }).save();
  await Choice.create({ description: "Poltergeist", is_correct: false, question: q4_1 }).save();

  const q4_2 = await Question.create({ title: "Dans quel film de 1985 un adolescent voyage dans le temps avec une DeLorean ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Retour vers le futur", is_correct: true, question: q4_2 }).save();
  await Choice.create({ description: "Terminator", is_correct: false, question: q4_2 }).save();
  await Choice.create({ description: "Blade Runner", is_correct: false, question: q4_2 }).save();
  await Choice.create({ description: "The Goonies", is_correct: false, question: q4_2 }).save();

  const q4_3 = await Question.create({ title: "Quel film de 1984 met en scène des chasseurs de fantômes ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Ghostbusters", is_correct: true, question: q4_3 }).save();
  await Choice.create({ description: "Poltergeist", is_correct: false, question: q4_3 }).save();
  await Choice.create({ description: "The Exorcist", is_correct: false, question: q4_3 }).save();
  await Choice.create({ description: "Beetlejuice", is_correct: false, question: q4_3 }).save();

  const q4_4 = await Question.create({ title: "Qui réalise 'Indiana Jones et les Aventuriers de l'Arche perdue' en 1981 ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Steven Spielberg", is_correct: true, question: q4_4 }).save();
  await Choice.create({ description: "George Lucas", is_correct: false, question: q4_4 }).save();
  await Choice.create({ description: "Ridley Scott", is_correct: false, question: q4_4 }).save();
  await Choice.create({ description: "James Cameron", is_correct: false, question: q4_4 }).save();

  const q4_5 = await Question.create({ title: "Quel film de 1986 met en scène des pilotes de chasse dans une école militaire ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Top Gun", is_correct: true, question: q4_5 }).save();
  await Choice.create({ description: "Iron Eagle", is_correct: false, question: q4_5 }).save();
  await Choice.create({ description: "Blue Thunder", is_correct: false, question: q4_5 }).save();
  await Choice.create({ description: "Firefox", is_correct: false, question: q4_5 }).save();

  const q4_6 = await Question.create({ title: "Dans quel film de 1987 un robot policier protège Detroit ?", quiz: quiz4 }).save();
  await Choice.create({ description: "RoboCop", is_correct: true, question: q4_6 }).save();
  await Choice.create({ description: "Terminator", is_correct: false, question: q4_6 }).save();
  await Choice.create({ description: "Blade Runner", is_correct: false, question: q4_6 }).save();
  await Choice.create({ description: "Short Circuit", is_correct: false, question: q4_6 }).save();

  const q4_7 = await Question.create({ title: "Quel film de 1988 met en scène un chat et un chien qui se détestent ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Touchez pas à ma fille", is_correct: false, question: q4_7 }).save();
  await Choice.create({ description: "Beetlejuice", is_correct: false, question: q4_7 }).save();
  await Choice.create({ description: "Qui veut la peau de Roger Rabbit", is_correct: true, question: q4_7 }).save();
  await Choice.create({ description: "Willow", is_correct: false, question: q4_7 }).save();

  const q4_8 = await Question.create({ title: "Quel film de 1985 met en scène une bande d'enfants à la recherche d'un trésor ?", quiz: quiz4 }).save();
  await Choice.create({ description: "The Goonies", is_correct: true, question: q4_8 }).save();
  await Choice.create({ description: "Stand by Me", is_correct: false, question: q4_8 }).save();
  await Choice.create({ description: "E.T.", is_correct: false, question: q4_8 }).save();
  await Choice.create({ description: "Gremlins", is_correct: false, question: q4_8 }).save();

  const q4_9 = await Question.create({ title: "Qui joue le rôle de John Rambo dans 'Rambo' (1982) ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Sylvester Stallone", is_correct: true, question: q4_9 }).save();
  await Choice.create({ description: "Arnold Schwarzenegger", is_correct: false, question: q4_9 }).save();
  await Choice.create({ description: "Chuck Norris", is_correct: false, question: q4_9 }).save();
  await Choice.create({ description: "Jean-Claude Van Damme", is_correct: false, question: q4_9 }).save();

  const q4_10 = await Question.create({ title: "Quel film de 1984 met en scène un guerrier barbare combattant une sorcière ?", quiz: quiz4 }).save();
  await Choice.create({ description: "Conan le Barbare", is_correct: false, question: q4_10 }).save();
  await Choice.create({ description: "Conan le Destructeur", is_correct: true, question: q4_10 }).save();
  await Choice.create({ description: "Red Sonja", is_correct: false, question: q4_10 }).save();
  await Choice.create({ description: "Krull", is_correct: false, question: q4_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 5 (Comédies Romantiques 90) =====
  const q5_1 = await Question.create({ title: "Quel film de 1993 met en scène Tom Hanks et Meg Ryan dans une histoire d'amour épistolaire ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Vous avez un message", is_correct: true, question: q5_1 }).save();
  await Choice.create({ description: "Quand Harry rencontre Sally", is_correct: false, question: q5_1 }).save();
  await Choice.create({ description: "Pretty Woman", is_correct: false, question: q5_1 }).save();
  await Choice.create({ description: "Sleepless in Seattle", is_correct: false, question: q5_1 }).save();

  const q5_2 = await Question.create({ title: "Dans quel film de 1990 Julia Roberts joue-t-elle une prostituée qui rencontre un homme d'affaires ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Pretty Woman", is_correct: true, question: q5_2 }).save();
  await Choice.create({ description: "My Best Friend's Wedding", is_correct: false, question: q5_2 }).save();
  await Choice.create({ description: "Notting Hill", is_correct: false, question: q5_2 }).save();
  await Choice.create({ description: "Runaway Bride", is_correct: false, question: q5_2 }).save();

  const q5_3 = await Question.create({ title: "Quel film de 1993 met en scène un homme qui tombe amoureux d'une femme qu'il a rencontrée dans un café ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Sleepless in Seattle", is_correct: true, question: q5_3 }).save();
  await Choice.create({ description: "When Harry Met Sally", is_correct: false, question: q5_3 }).save();
  await Choice.create({ description: "You've Got Mail", is_correct: false, question: q5_3 }).save();
  await Choice.create({ description: "The Wedding Singer", is_correct: false, question: q5_3 }).save();

  const q5_4 = await Question.create({ title: "Qui réalise 'Quand Harry rencontre Sally' (1989) ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Rob Reiner", is_correct: true, question: q5_4 }).save();
  await Choice.create({ description: "Nora Ephron", is_correct: false, question: q5_4 }).save();
  await Choice.create({ description: "Garry Marshall", is_correct: false, question: q5_4 }).save();
  await Choice.create({ description: "James L. Brooks", is_correct: false, question: q5_4 }).save();

  const q5_5 = await Question.create({ title: "Quel film de 1997 met en scène Adam Sandler comme chanteur de mariage ?", quiz: quiz5 }).save();
  await Choice.create({ description: "The Wedding Singer", is_correct: true, question: q5_5 }).save();
  await Choice.create({ description: "Happy Gilmore", is_correct: false, question: q5_5 }).save();
  await Choice.create({ description: "Big Daddy", is_correct: false, question: q5_5 }).save();
  await Choice.create({ description: "The Waterboy", is_correct: false, question: q5_5 }).save();

  const q5_6 = await Question.create({ title: "Dans quel film de 1999 Hugh Grant joue-t-il un libraire qui tombe amoureux d'une actrice ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Notting Hill", is_correct: true, question: q5_6 }).save();
  await Choice.create({ description: "Four Weddings and a Funeral", is_correct: false, question: q5_6 }).save();
  await Choice.create({ description: "Love Actually", is_correct: false, question: q5_6 }).save();
  await Choice.create({ description: "Bridget Jones's Diary", is_correct: false, question: q5_6 }).save();

  const q5_7 = await Question.create({ title: "Quel film de 1995 met en scène Sandra Bullock et Bill Pullman dans une histoire d'amour sur un bus ?", quiz: quiz5 }).save();
  await Choice.create({ description: "While You Were Sleeping", is_correct: true, question: q5_7 }).save();
  await Choice.create({ description: "Speed", is_correct: false, question: q5_7 }).save();
  await Choice.create({ description: "The Net", is_correct: false, question: q5_7 }).save();
  await Choice.create({ description: "Hope Floats", is_correct: false, question: q5_7 }).save();

  const q5_8 = await Question.create({ title: "Qui joue le rôle principal dans 'My Best Friend's Wedding' (1997) ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Julia Roberts", is_correct: true, question: q5_8 }).save();
  await Choice.create({ description: "Meg Ryan", is_correct: false, question: q5_8 }).save();
  await Choice.create({ description: "Sandra Bullock", is_correct: false, question: q5_8 }).save();
  await Choice.create({ description: "Cameron Diaz", is_correct: false, question: q5_8 }).save();

  const q5_9 = await Question.create({ title: "Quel film de 1998 met en scène Gwyneth Paltrow dans une comédie romantique sur le mensonge ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Sliding Doors", is_correct: true, question: q5_9 }).save();
  await Choice.create({ description: "Shakespeare in Love", is_correct: false, question: q5_9 }).save();
  await Choice.create({ description: "Emma", is_correct: false, question: q5_9 }).save();
  await Choice.create({ description: "The Talented Mr. Ripley", is_correct: false, question: q5_9 }).save();

  const q5_10 = await Question.create({ title: "Dans quel film de 1996 Tom Cruise joue-t-il un agent sportif qui tombe amoureux ?", quiz: quiz5 }).save();
  await Choice.create({ description: "Jerry Maguire", is_correct: true, question: q5_10 }).save();
  await Choice.create({ description: "Top Gun", is_correct: false, question: q5_10 }).save();
  await Choice.create({ description: "Days of Thunder", is_correct: false, question: q5_10 }).save();
  await Choice.create({ description: "Mission: Impossible", is_correct: false, question: q5_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 6 (Thrillers Psychologiques 2000) =====
  const q6_1 = await Question.create({ title: "Quel film de 2000 met en scène un homme amnésique qui tente de retrouver la mémoire ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Memento", is_correct: true, question: q6_1 }).save();
  await Choice.create({ description: "The Machinist", is_correct: false, question: q6_1 }).save();
  await Choice.create({ description: "Identity", is_correct: false, question: q6_1 }).save();
  await Choice.create({ description: "Shutter Island", is_correct: false, question: q6_1 }).save();

  const q6_2 = await Question.create({ title: "Quel film de 2001 met en scène un mathématicien qui découvre un complot ?", quiz: quiz6 }).save();
  await Choice.create({ description: "A Beautiful Mind", is_correct: true, question: q6_2 }).save();
  await Choice.create({ description: "Pi", is_correct: false, question: q6_2 }).save();
  await Choice.create({ description: "Good Will Hunting", is_correct: false, question: q6_2 }).save();
  await Choice.create({ description: "The Imitation Game", is_correct: false, question: q6_2 }).save();

  const q6_3 = await Question.create({ title: "Quel film de 2003 met en scène des passagers bloqués dans un motel pendant une tempête ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Identity", is_correct: true, question: q6_3 }).save();
  await Choice.create({ description: "The Shining", is_correct: false, question: q6_3 }).save();
  await Choice.create({ description: "1408", is_correct: false, question: q6_3 }).save();
  await Choice.create({ description: "Vacancy", is_correct: false, question: q6_3 }).save();

  const q6_4 = await Question.create({ title: "Qui réalise 'Memento' (2000) ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Christopher Nolan", is_correct: true, question: q6_4 }).save();
  await Choice.create({ description: "David Fincher", is_correct: false, question: q6_4 }).save();
  await Choice.create({ description: "Darren Aronofsky", is_correct: false, question: q6_4 }).save();
  await Choice.create({ description: "Paul Thomas Anderson", is_correct: false, question: q6_4 }).save();

  const q6_5 = await Question.create({ title: "Quel film de 2002 met en scène un détective qui enquête sur des meurtres liés aux rêves ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Insomnia", is_correct: true, question: q6_5 }).save();
  await Choice.create({ description: "The Machinist", is_correct: false, question: q6_5 }).save();
  await Choice.create({ description: "Identity", is_correct: false, question: q6_5 }).save();
  await Choice.create({ description: "Memento", is_correct: false, question: q6_5 }).save();

  const q6_6 = await Question.create({ title: "Quel film de 2004 met en scène un homme qui ne dort plus depuis un an ?", quiz: quiz6 }).save();
  await Choice.create({ description: "The Machinist", is_correct: true, question: q6_6 }).save();
  await Choice.create({ description: "Insomnia", is_correct: false, question: q6_6 }).save();
  await Choice.create({ description: "Memento", is_correct: false, question: q6_6 }).save();
  await Choice.create({ description: "Identity", is_correct: false, question: q6_6 }).save();

  const q6_7 = await Question.create({ title: "Qui joue le rôle principal dans 'Memento' (2000) ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Guy Pearce", is_correct: true, question: q6_7 }).save();
  await Choice.create({ description: "Leonardo DiCaprio", is_correct: false, question: q6_7 }).save();
  await Choice.create({ description: "Christian Bale", is_correct: false, question: q6_7 }).save();
  await Choice.create({ description: "Edward Norton", is_correct: false, question: q6_7 }).save();

  const q6_8 = await Question.create({ title: "Quel film de 2003 met en scène un homme qui découvre qu'il a plusieurs personnalités ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Identity", is_correct: true, question: q6_8 }).save();
  await Choice.create({ description: "Fight Club", is_correct: false, question: q6_8 }).save();
  await Choice.create({ description: "Split", is_correct: false, question: q6_8 }).save();
  await Choice.create({ description: "The Machinist", is_correct: false, question: q6_8 }).save();

  const q6_9 = await Question.create({ title: "Quel film de 2001 met en scène un mathématicien qui lutte contre la schizophrénie ?", quiz: quiz6 }).save();
  await Choice.create({ description: "A Beautiful Mind", is_correct: true, question: q6_9 }).save();
  await Choice.create({ description: "Good Will Hunting", is_correct: false, question: q6_9 }).save();
  await Choice.create({ description: "The Imitation Game", is_correct: false, question: q6_9 }).save();
  await Choice.create({ description: "The Theory of Everything", is_correct: false, question: q6_9 }).save();

  const q6_10 = await Question.create({ title: "Quel film de 2002 met en scène un détective qui enquête sur un tueur en série à Los Angeles ?", quiz: quiz6 }).save();
  await Choice.create({ description: "Insomnia", is_correct: true, question: q6_10 }).save();
  await Choice.create({ description: "Se7en", is_correct: false, question: q6_10 }).save();
  await Choice.create({ description: "Zodiac", is_correct: false, question: q6_10 }).save();
  await Choice.create({ description: "The Bone Collector", is_correct: false, question: q6_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 7 (Science-Fiction 80) =====
  const q7_1 = await Question.create({ title: "Quel film de 1982 met en scène un réplicant chasseur de réplicants ?", quiz: quiz7 }).save();
  await Choice.create({ description: "Blade Runner", is_correct: true, question: q7_1 }).save();
  await Choice.create({ description: "The Terminator", is_correct: false, question: q7_1 }).save();
  await Choice.create({ description: "RoboCop", is_correct: false, question: q7_1 }).save();
  await Choice.create({ description: "Total Recall", is_correct: false, question: q7_1 }).save();

  const q7_2 = await Question.create({ title: "Quel film de 1984 met en scène un cyborg venu du futur pour tuer Sarah Connor ?", quiz: quiz7 }).save();
  await Choice.create({ description: "The Terminator", is_correct: true, question: q7_2 }).save();
  await Choice.create({ description: "RoboCop", is_correct: false, question: q7_2 }).save();
  await Choice.create({ description: "Blade Runner", is_correct: false, question: q7_2 }).save();
  await Choice.create({ description: "Total Recall", is_correct: false, question: q7_2 }).save();

  const q7_3 = await Question.create({ title: "Qui réalise 'Blade Runner' (1982) ?", quiz: quiz7 }).save();
  await Choice.create({ description: "Ridley Scott", is_correct: true, question: q7_3 }).save();
  await Choice.create({ description: "James Cameron", is_correct: false, question: q7_3 }).save();
  await Choice.create({ description: "Paul Verhoeven", is_correct: false, question: q7_3 }).save();
  await Choice.create({ description: "Steven Spielberg", is_correct: false, question: q7_3 }).save();

  const q7_4 = await Question.create({ title: "Quel film de 1986 met en scène un groupe d'enfants qui découvrent un extra-terrestre ?", quiz: quiz7 }).save();
  await Choice.create({ description: "E.T. l'extra-terrestre", is_correct: false, question: q7_4 }).save();
  await Choice.create({ description: "The Goonies", is_correct: false, question: q7_4 }).save();
  await Choice.create({ description: "Explorers", is_correct: true, question: q7_4 }).save();
  await Choice.create({ description: "Flight of the Navigator", is_correct: false, question: q7_4 }).save();

  const q7_5 = await Question.create({ title: "Quel film de 1985 met en scène un voyage dans le temps avec une machine temporelle ?", quiz: quiz7 }).save();
  await Choice.create({ description: "Back to the Future", is_correct: true, question: q7_5 }).save();
  await Choice.create({ description: "The Terminator", is_correct: false, question: q7_5 }).save();
  await Choice.create({ description: "Time Bandits", is_correct: false, question: q7_5 }).save();
  await Choice.create({ description: "Bill & Ted's Excellent Adventure", is_correct: false, question: q7_5 }).save();

  const q7_6 = await Question.create({ title: "Quel film de 1987 met en scène un robot policier dans un futur dystopique ?", quiz: quiz7 }).save();
  await Choice.create({ description: "RoboCop", is_correct: true, question: q7_6 }).save();
  await Choice.create({ description: "The Terminator", is_correct: false, question: q7_6 }).save();
  await Choice.create({ description: "Blade Runner", is_correct: false, question: q7_6 }).save();
  await Choice.create({ description: "Total Recall", is_correct: false, question: q7_6 }).save();

  const q7_7 = await Question.create({ title: "Qui joue le rôle de Rick Deckard dans 'Blade Runner' (1982) ?", quiz: quiz7 }).save();
  await Choice.create({ description: "Harrison Ford", is_correct: true, question: q7_7 }).save();
  await Choice.create({ description: "Rutger Hauer", is_correct: false, question: q7_7 }).save();
  await Choice.create({ description: "Sean Young", is_correct: false, question: q7_7 }).save();
  await Choice.create({ description: "Edward James Olmos", is_correct: false, question: q7_7 }).save();

  const q7_8 = await Question.create({ title: "Quel film de 1984 met en scène un garçon qui voyage dans le temps avec un robot ?", quiz: quiz7 }).save();
  await Choice.create({ description: "The Terminator", is_correct: false, question: q7_8 }).save();
  await Choice.create({ description: "Short Circuit", is_correct: false, question: q7_8 }).save();
  await Choice.create({ description: "D.A.R.Y.L.", is_correct: false, question: q7_8 }).save();
  await Choice.create({ description: "The Last Starfighter", is_correct: true, question: q7_8 }).save();

  const q7_9 = await Question.create({ title: "Quel film de 1989 met en scène un voyage dans l'espace avec des aliens ?", quiz: quiz7 }).save();
  await Choice.create({ description: "Aliens", is_correct: false, question: q7_9 }).save();
  await Choice.create({ description: "The Abyss", is_correct: true, question: q7_9 }).save();
  await Choice.create({ description: "Leviathan", is_correct: false, question: q7_9 }).save();
  await Choice.create({ description: "DeepStar Six", is_correct: false, question: q7_9 }).save();

  const q7_10 = await Question.create({ title: "Qui réalise 'The Terminator' (1984) ?", quiz: quiz7 }).save();
  await Choice.create({ description: "James Cameron", is_correct: true, question: q7_10 }).save();
  await Choice.create({ description: "Ridley Scott", is_correct: false, question: q7_10 }).save();
  await Choice.create({ description: "Paul Verhoeven", is_correct: false, question: q7_10 }).save();
  await Choice.create({ description: "Steven Spielberg", is_correct: false, question: q7_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 8 (Drames Historiques 2000) =====
  const q8_1 = await Question.create({ title: "Quel film de 2000 met en scène un gladiateur qui défie l'empereur romain ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Gladiator", is_correct: true, question: q8_1 }).save();
  await Choice.create({ description: "Troy", is_correct: false, question: q8_1 }).save();
  await Choice.create({ description: "Alexander", is_correct: false, question: q8_1 }).save();
  await Choice.create({ description: "300", is_correct: false, question: q8_1 }).save();

  const q8_2 = await Question.create({ title: "Qui joue le rôle de Maximus dans 'Gladiator' (2000) ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Russell Crowe", is_correct: true, question: q8_2 }).save();
  await Choice.create({ description: "Joaquin Phoenix", is_correct: false, question: q8_2 }).save();
  await Choice.create({ description: "Richard Harris", is_correct: false, question: q8_2 }).save();
  await Choice.create({ description: "Connie Nielsen", is_correct: false, question: q8_2 }).save();

  const q8_3 = await Question.create({ title: "Quel film de 2004 met en scène Alexandre le Grand ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Alexander", is_correct: true, question: q8_3 }).save();
  await Choice.create({ description: "Troy", is_correct: false, question: q8_3 }).save();
  await Choice.create({ description: "300", is_correct: false, question: q8_3 }).save();
  await Choice.create({ description: "Gladiator", is_correct: false, question: q8_3 }).save();

  const q8_4 = await Question.create({ title: "Quel film de 2004 met en scène la guerre de Troie ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Troy", is_correct: true, question: q8_4 }).save();
  await Choice.create({ description: "300", is_correct: false, question: q8_4 }).save();
  await Choice.create({ description: "Alexander", is_correct: false, question: q8_4 }).save();
  await Choice.create({ description: "Gladiator", is_correct: false, question: q8_4 }).save();

  const q8_5 = await Question.create({ title: "Qui joue le rôle d'Achille dans 'Troy' (2004) ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Brad Pitt", is_correct: true, question: q8_5 }).save();
  await Choice.create({ description: "Orlando Bloom", is_correct: false, question: q8_5 }).save();
  await Choice.create({ description: "Eric Bana", is_correct: false, question: q8_5 }).save();
  await Choice.create({ description: "Sean Bean", is_correct: false, question: q8_5 }).save();

  const q8_6 = await Question.create({ title: "Quel film de 2006 met en scène la bataille des Thermopyles ?", quiz: quiz8 }).save();
  await Choice.create({ description: "300", is_correct: true, question: q8_6 }).save();
  await Choice.create({ description: "Troy", is_correct: false, question: q8_6 }).save();
  await Choice.create({ description: "Alexander", is_correct: false, question: q8_6 }).save();
  await Choice.create({ description: "Gladiator", is_correct: false, question: q8_6 }).save();

  const q8_7 = await Question.create({ title: "Qui réalise 'Gladiator' (2000) ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Ridley Scott", is_correct: true, question: q8_7 }).save();
  await Choice.create({ description: "Oliver Stone", is_correct: false, question: q8_7 }).save();
  await Choice.create({ description: "Wolfgang Petersen", is_correct: false, question: q8_7 }).save();
  await Choice.create({ description: "Zack Snyder", is_correct: false, question: q8_7 }).save();

  const q8_8 = await Question.create({ title: "Quel film de 2003 met en scène la dernière bataille des samouraïs ?", quiz: quiz8 }).save();
  await Choice.create({ description: "The Last Samurai", is_correct: true, question: q8_8 }).save();
  await Choice.create({ description: "47 Ronin", is_correct: false, question: q8_8 }).save();
  await Choice.create({ description: "Memoirs of a Geisha", is_correct: false, question: q8_8 }).save();
  await Choice.create({ description: "Letters from Iwo Jima", is_correct: false, question: q8_8 }).save();

  const q8_9 = await Question.create({ title: "Qui joue le rôle principal dans 'The Last Samurai' (2003) ?", quiz: quiz8 }).save();
  await Choice.create({ description: "Tom Cruise", is_correct: true, question: q8_9 }).save();
  await Choice.create({ description: "Ken Watanabe", is_correct: false, question: q8_9 }).save();
  await Choice.create({ description: "Hiroyuki Sanada", is_correct: false, question: q8_9 }).save();
  await Choice.create({ description: "Billy Connolly", is_correct: false, question: q8_9 }).save();

  const q8_10 = await Question.create({ title: "Quel film de 2000 met en scène la guerre d'indépendance américaine ?", quiz: quiz8 }).save();
  await Choice.create({ description: "The Patriot", is_correct: true, question: q8_10 }).save();
  await Choice.create({ description: "Master and Commander", is_correct: false, question: q8_10 }).save();
  await Choice.create({ description: "Gangs of New York", is_correct: false, question: q8_10 }).save();
  await Choice.create({ description: "Cold Mountain", is_correct: false, question: q8_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 9 (Comédies Américaines 90) =====
  const q9_1 = await Question.create({ title: "Quel film de 1994 met en scène un shérif qui doit arrêter un bus en mouvement ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Speed", is_correct: true, question: q9_1 }).save();
  await Choice.create({ description: "The Rock", is_correct: false, question: q9_1 }).save();
  await Choice.create({ description: "Con Air", is_correct: false, question: q9_1 }).save();
  await Choice.create({ description: "Face/Off", is_correct: false, question: q9_1 }).save();

  const q9_2 = await Question.create({ title: "Quel film de 1993 met en scène un homme qui doit sauver sa fille kidnappée ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Taken", is_correct: false, question: q9_2 }).save();
  await Choice.create({ description: "Man on Fire", is_correct: false, question: q9_2 }).save();
  await Choice.create({ description: "The Fugitive", is_correct: true, question: q9_2 }).save();
  await Choice.create({ description: "Ransom", is_correct: false, question: q9_2 }).save();

  const q9_3 = await Question.create({ title: "Qui joue le rôle de Forrest Gump dans 'Forrest Gump' (1994) ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Tom Hanks", is_correct: true, question: q9_3 }).save();
  await Choice.create({ description: "Gary Sinise", is_correct: false, question: q9_3 }).save();
  await Choice.create({ description: "Robin Wright", is_correct: false, question: q9_3 }).save();
  await Choice.create({ description: "Sally Field", is_correct: false, question: q9_3 }).save();

  const q9_4 = await Question.create({ title: "Quel film de 1996 met en scène un groupe d'amis qui se retrouvent pour un enterrement de vie de garçon ?", quiz: quiz9 }).save();
  await Choice.create({ description: "The Big Lebowski", is_correct: false, question: q9_4 }).save();
  await Choice.create({ description: "Swingers", is_correct: true, question: q9_4 }).save();
  await Choice.create({ description: "Dazed and Confused", is_correct: false, question: q9_4 }).save();
  await Choice.create({ description: "Reality Bites", is_correct: false, question: q9_4 }).save();

  const q9_5 = await Question.create({ title: "Quel film de 1998 met en scène un groupe d'amis qui tentent de voler un casino ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Ocean's Eleven", is_correct: false, question: q9_5 }).save();
  await Choice.create({ description: "The Italian Job", is_correct: false, question: q9_5 }).save();
  await Choice.create({ description: "Lock, Stock and Two Smoking Barrels", is_correct: true, question: q9_5 }).save();
  await Choice.create({ description: "Snatch", is_correct: false, question: q9_5 }).save();

  const q9_6 = await Question.create({ title: "Qui réalise 'The Big Lebowski' (1998) ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Joel et Ethan Coen", is_correct: true, question: q9_6 }).save();
  await Choice.create({ description: "Quentin Tarantino", is_correct: false, question: q9_6 }).save();
  await Choice.create({ description: "David Fincher", is_correct: false, question: q9_6 }).save();
  await Choice.create({ description: "Paul Thomas Anderson", is_correct: false, question: q9_6 }).save();

  const q9_7 = await Question.create({ title: "Quel film de 1999 met en scène un groupe d'employés de bureau qui se rebellent ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Office Space", is_correct: true, question: q9_7 }).save();
  await Choice.create({ description: "The Office", is_correct: false, question: q9_7 }).save();
  await Choice.create({ description: "Clerks", is_correct: false, question: q9_7 }).save();
  await Choice.create({ description: "Waiting", is_correct: false, question: q9_7 }).save();

  const q9_8 = await Question.create({ title: "Quel film de 1995 met en scène deux amis qui tentent de sauver leur magasin de location de vidéos ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Clerks", is_correct: true, question: q9_8 }).save();
  await Choice.create({ description: "Mallrats", is_correct: false, question: q9_8 }).save();
  await Choice.create({ description: "Chasing Amy", is_correct: false, question: q9_8 }).save();
  await Choice.create({ description: "Dogma", is_correct: false, question: q9_8 }).save();

  const q9_9 = await Question.create({ title: "Quel film de 1996 met en scène un groupe d'amis qui tentent de retrouver un ami disparu ?", quiz: quiz9 }).save();
  await Choice.create({ description: "The Big Lebowski", is_correct: false, question: q9_9 }).save();
  await Choice.create({ description: "Swingers", is_correct: true, question: q9_9 }).save();
  await Choice.create({ description: "Dazed and Confused", is_correct: false, question: q9_9 }).save();
  await Choice.create({ description: "Reality Bites", is_correct: false, question: q9_9 }).save();

  const q9_10 = await Question.create({ title: "Qui joue le rôle de 'The Dude' dans 'The Big Lebowski' (1998) ?", quiz: quiz9 }).save();
  await Choice.create({ description: "Jeff Bridges", is_correct: true, question: q9_10 }).save();
  await Choice.create({ description: "John Goodman", is_correct: false, question: q9_10 }).save();
  await Choice.create({ description: "Steve Buscemi", is_correct: false, question: q9_10 }).save();
  await Choice.create({ description: "Julianne Moore", is_correct: false, question: q9_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 10 (Horreur 80) =====
  const q10_1 = await Question.create({ title: "Quel film de 1980 met en scène une famille hantée par des esprits ?", quiz: quiz10 }).save();
  await Choice.create({ description: "The Shining", is_correct: true, question: q10_1 }).save();
  await Choice.create({ description: "Poltergeist", is_correct: false, question: q10_1 }).save();
  await Choice.create({ description: "The Amityville Horror", is_correct: false, question: q10_1 }).save();
  await Choice.create({ description: "The Exorcist", is_correct: false, question: q10_1 }).save();

  const q10_2 = await Question.create({ title: "Qui réalise 'The Shining' (1980) ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Stanley Kubrick", is_correct: true, question: q10_2 }).save();
  await Choice.create({ description: "Steven Spielberg", is_correct: false, question: q10_2 }).save();
  await Choice.create({ description: "John Carpenter", is_correct: false, question: q10_2 }).save();
  await Choice.create({ description: "Wes Craven", is_correct: false, question: q10_2 }).save();

  const q10_3 = await Question.create({ title: "Quel film de 1982 met en scène une famille hantée par des poltergeists ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Poltergeist", is_correct: true, question: q10_3 }).save();
  await Choice.create({ description: "The Shining", is_correct: false, question: q10_3 }).save();
  await Choice.create({ description: "The Amityville Horror", is_correct: false, question: q10_3 }).save();
  await Choice.create({ description: "The Exorcist", is_correct: false, question: q10_3 }).save();

  const q10_4 = await Question.create({ title: "Quel film de 1984 met en scène un tueur en série masqué qui hante les adolescents ?", quiz: quiz10 }).save();
  await Choice.create({ description: "A Nightmare on Elm Street", is_correct: true, question: q10_4 }).save();
  await Choice.create({ description: "Friday the 13th", is_correct: false, question: q10_4 }).save();
  await Choice.create({ description: "Halloween", is_correct: false, question: q10_4 }).save();
  await Choice.create({ description: "Scream", is_correct: false, question: q10_4 }).save();

  const q10_5 = await Question.create({ title: "Qui joue le rôle de Freddy Krueger dans 'A Nightmare on Elm Street' (1984) ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Robert Englund", is_correct: true, question: q10_5 }).save();
  await Choice.create({ description: "Wes Craven", is_correct: false, question: q10_5 }).save();
  await Choice.create({ description: "Johnny Depp", is_correct: false, question: q10_5 }).save();
  await Choice.create({ description: "Heather Langenkamp", is_correct: false, question: q10_5 }).save();

  const q10_6 = await Question.create({ title: "Quel film de 1986 met en scène une créature qui se multiplie après avoir été mouillée ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Gremlins", is_correct: true, question: q10_6 }).save();
  await Choice.create({ description: "Critters", is_correct: false, question: q10_6 }).save();
  await Choice.create({ description: "Ghoulies", is_correct: false, question: q10_6 }).save();
  await Choice.create({ description: "Troll", is_correct: false, question: q10_6 }).save();

  const q10_7 = await Question.create({ title: "Qui réalise 'Halloween' (1978) qui a influencé les films d'horreur des années 80 ?", quiz: quiz10 }).save();
  await Choice.create({ description: "John Carpenter", is_correct: true, question: q10_7 }).save();
  await Choice.create({ description: "Wes Craven", is_correct: false, question: q10_7 }).save();
  await Choice.create({ description: "Sean S. Cunningham", is_correct: false, question: q10_7 }).save();
  await Choice.create({ description: "Tobe Hooper", is_correct: false, question: q10_7 }).save();

  const q10_8 = await Question.create({ title: "Quel film de 1988 met en scène un couple qui découvre que leur maison est hantée ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Beetlejuice", is_correct: true, question: q10_8 }).save();
  await Choice.create({ description: "Poltergeist", is_correct: false, question: q10_8 }).save();
  await Choice.create({ description: "The Amityville Horror", is_correct: false, question: q10_8 }).save();
  await Choice.create({ description: "The Shining", is_correct: false, question: q10_8 }).save();

  const q10_9 = await Question.create({ title: "Quel film de 1987 met en scène un tueur en série qui hante les rêves des adolescents ?", quiz: quiz10 }).save();
  await Choice.create({ description: "A Nightmare on Elm Street 3", is_correct: true, question: q10_9 }).save();
  await Choice.create({ description: "A Nightmare on Elm Street", is_correct: false, question: q10_9 }).save();
  await Choice.create({ description: "A Nightmare on Elm Street 2", is_correct: false, question: q10_9 }).save();
  await Choice.create({ description: "Friday the 13th", is_correct: false, question: q10_9 }).save();

  const q10_10 = await Question.create({ title: "Qui réalise 'A Nightmare on Elm Street' (1984) ?", quiz: quiz10 }).save();
  await Choice.create({ description: "Wes Craven", is_correct: true, question: q10_10 }).save();
  await Choice.create({ description: "John Carpenter", is_correct: false, question: q10_10 }).save();
  await Choice.create({ description: "Sean S. Cunningham", is_correct: false, question: q10_10 }).save();
  await Choice.create({ description: "Tobe Hooper", is_correct: false, question: q10_10 }).save();


// ===== QUESTIONS & CHOICES pour Quiz 11 (Comédies Dramatiques 2000) =====
  const q11_1 = await Question.create({ title: "Quel film de 2001 met en scène un homme qui découvre qu'il peut voir les morts ?", quiz: quiz11 }).save();
  await Choice.create({ description: "The Others", is_correct: true, question: q11_1 }).save();
  await Choice.create({ description: "The Sixth Sense", is_correct: false, question: q11_1 }).save();
  await Choice.create({ description: "Unbreakable", is_correct: false, question: q11_1 }).save();
  await Choice.create({ description: "Signs", is_correct: false, question: q11_1 }).save();

  const q11_2 = await Question.create({ title: "Quel film de 2002 met en scène un homme qui découvre qu'il a des pouvoirs surhumains ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Unbreakable", is_correct: true, question: q11_2 }).save();
  await Choice.create({ description: "The Sixth Sense", is_correct: false, question: q11_2 }).save();
  await Choice.create({ description: "Signs", is_correct: false, question: q11_2 }).save();
  await Choice.create({ description: "The Village", is_correct: false, question: q11_2 }).save();

  const q11_3 = await Question.create({ title: "Qui réalise 'Eternal Sunshine of the Spotless Mind' (2004) ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Michel Gondry", is_correct: true, question: q11_3 }).save();
  await Choice.create({ description: "Spike Jonze", is_correct: false, question: q11_3 }).save();
  await Choice.create({ description: "Charlie Kaufman", is_correct: false, question: q11_3 }).save();
  await Choice.create({ description: "Wes Anderson", is_correct: false, question: q11_3 }).save();

  const q11_4 = await Question.create({ title: "Quel film de 2003 met en scène un homme qui perd la mémoire et doit reconstruire sa vie ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Memento", is_correct: false, question: q11_4 }).save();
  await Choice.create({ description: "50 First Dates", is_correct: true, question: q11_4 }).save();
  await Choice.create({ description: "The Bourne Identity", is_correct: false, question: q11_4 }).save();
  await Choice.create({ description: "Paycheck", is_correct: false, question: q11_4 }).save();

  const q11_5 = await Question.create({ title: "Qui joue le rôle principal dans 'Eternal Sunshine of the Spotless Mind' (2004) ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Jim Carrey", is_correct: true, question: q11_5 }).save();
  await Choice.create({ description: "Kate Winslet", is_correct: false, question: q11_5 }).save();
  await Choice.create({ description: "Elijah Wood", is_correct: false, question: q11_5 }).save();
  await Choice.create({ description: "Mark Ruffalo", is_correct: false, question: q11_5 }).save();

  const q11_6 = await Question.create({ title: "Quel film de 2001 met en scène un homme qui découvre qu'il est le dernier homme sur Terre ?", quiz: quiz11 }).save();
  await Choice.create({ description: "I Am Legend", is_correct: false, question: q11_6 }).save();
  await Choice.create({ description: "28 Days Later", is_correct: false, question: q11_6 }).save();
  await Choice.create({ description: "The Omega Man", is_correct: false, question: q11_6 }).save();
  await Choice.create({ description: "Cast Away", is_correct: true, question: q11_6 }).save();

  const q11_7 = await Question.create({ title: "Qui joue le rôle de Chuck Noland dans 'Cast Away' (2000) ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Tom Hanks", is_correct: true, question: q11_7 }).save();
  await Choice.create({ description: "Wilson", is_correct: false, question: q11_7 }).save();
  await Choice.create({ description: "Helen Hunt", is_correct: false, question: q11_7 }).save();
  await Choice.create({ description: "Robert Zemeckis", is_correct: false, question: q11_7 }).save();

  const q11_8 = await Question.create({ title: "Quel film de 2004 met en scène un couple qui efface leurs souvenirs ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Eternal Sunshine of the Spotless Mind", is_correct: true, question: q11_8 }).save();
  await Choice.create({ description: "50 First Dates", is_correct: false, question: q11_8 }).save();
  await Choice.create({ description: "The Notebook", is_correct: false, question: q11_8 }).save();
  await Choice.create({ description: "Before Sunset", is_correct: false, question: q11_8 }).save();

  const q11_9 = await Question.create({ title: "Quel film de 2002 met en scène un homme qui découvre qu'il peut voyager dans le temps ?", quiz: quiz11 }).save();
  await Choice.create({ description: "The Time Machine", is_correct: true, question: q11_9 }).save();
  await Choice.create({ description: "Back to the Future", is_correct: false, question: q11_9 }).save();
  await Choice.create({ description: "The Butterfly Effect", is_correct: false, question: q11_9 }).save();
  await Choice.create({ description: "Donnie Darko", is_correct: false, question: q11_9 }).save();

  const q11_10 = await Question.create({ title: "Qui réalise 'Lost in Translation' (2003) ?", quiz: quiz11 }).save();
  await Choice.create({ description: "Sofia Coppola", is_correct: true, question: q11_10 }).save();
  await Choice.create({ description: "Wes Anderson", is_correct: false, question: q11_10 }).save();
  await Choice.create({ description: "Noah Baumbach", is_correct: false, question: q11_10 }).save();
  await Choice.create({ description: "Spike Jonze", is_correct: false, question: q11_10 }).save();


// ===== ATTEMPTS =====
  const attempt1 = await Attempt.create({
    user: user1,
    quiz: quiz1,
    started_at: new Date("2024-01-15T10:30:00"),
    finished_at: new Date("2024-01-15T10:35:00"),
    score: 3,
    percentage_success: 100,
    duration: 300,
    passed: true
  }).save();

  const attempt2 = await Attempt.create({
    user: user2,
    quiz: quiz2,
    started_at: new Date("2024-01-16T14:00:00"),
    finished_at: new Date("2024-01-16T14:08:00"),
    score: 2,
    percentage_success: 66.67,
    duration: 480,
    passed: true
  }).save();

  const attempt3 = await Attempt.create({
    user: user1,
    quiz: quiz2,
    started_at: new Date("2024-01-17T16:00:00"),
    score: 1,
    percentage_success: 33.33,
    duration: 180,
    passed: false
  }).save();


// ===== RELATIONS MANY-TO-MANY =====
  
  // Likes (table like_)
  // user1 aime quiz1 et quiz2
  user1.liked_quizzes = [quiz1, quiz2];
  await user1.save();

  // user2 aime quiz1
  user2.liked_quizzes = [quiz1];
  await user2.save();

  // Trophies (table trophy)
  // user1 a débloqué le trophée bronze et argent
  user1.won_rewards = [bronzeReward, silverReward];
  await user1.save();

  // user2 a débloqué le trophée bronze
  user2.won_rewards = [bronzeReward];
  await user2.save();

  await db.destroy();
  console.log("✅ Base de données réinitialisée avec succès !");
}

main();
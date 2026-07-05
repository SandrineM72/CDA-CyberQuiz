# CyberQuiz

CyberQuiz est une application web de quiz dédiée à la cybersécurité. Elle permet de tester et d'améliorer ses connaissances sur les grandes thématiques de la sécurité informatique, de manière ludique et interactive.

Ce projet a été conçu et développé dans le cadre de ma formation **Concepteur Développeur d'Applications (CDA)**, en solo, comme projet de certification.

## 🎯 Objectif du projet

Sensibiliser et former les utilisateurs aux bonnes pratiques de cybersécurité à travers des quiz interactifs, tout en respectant les standards d'accessibilité numérique (WCAG 2.1 AA).

## ✨ Fonctionnalités

- **Quiz thématiques** sur les grands sujets de la cybersécurité (failles courantes, bonnes pratiques, vocabulaire technique, etc.)
- **Correction immédiate** des réponses avec explications pédagogiques
- **Suivi de progression** pour visualiser ses résultats et son évolution
- **Interface accessible**, pensée pour être utilisable par le plus grand nombre (navigation clavier, contrastes, lecteurs d'écran)
- **Espace d'administration** permettant de créer, modifier et organiser les questions et les quiz
- **Authentification des utilisateurs** pour sauvegarder l'historique et les scores

## 🏗️ Architecture du projet

Le projet est organisé en plusieurs modules :

- `frontend` — l'interface utilisateur du quiz
- `backend` — la logique métier et l'accès aux données
- `gateway` — la passerelle entre le frontend et les services back
- `e2e-tests` — les tests de bout en bout garantissant le bon fonctionnement de l'application

L'application est conteneurisée et déployée automatiquement, ce qui facilite sa mise à jour et sa maintenance.

## ✅ Reset DB

Quand on est connecté en SSH, il est possible de réinitialiser la DB grâce à un alias "cyberquiz-reset".


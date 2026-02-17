import { Theme } from "../../entities/Theme";

export async function createThemes() {
  const phishingTheme = await Theme.create({ 
    name: "Phishing et Ingénierie Sociale" 
  }).save();
  
  const passwordTheme = await Theme.create({ 
    name: "Mots de Passe et Authentification" 
  }).save();
  
  const networkTheme = await Theme.create({ 
    name: "Réseaux et Connexions" 
  }).save();

  const malwareTheme = await Theme.create({ 
    name: "Malwares et Menaces" 
  }).save();

  const privacyTheme = await Theme.create({ 
    name: "Protection des Données" 
  }).save();

  return {
    phishingTheme,
    passwordTheme,
    networkTheme,
    malwareTheme,
    privacyTheme,
  };
}

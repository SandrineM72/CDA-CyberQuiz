import { Reward } from "../../entities/Reward";

export async function createRewards() {
  const woodReward = await Reward.create({
    name: "Trophée Bois",
    image: "/trophees/trophee_bois_debutant.png"
  }).save();

  const crystalReward = await Reward.create({
    name: "Trophée Cristal",
    image: "/trophees/trophee_cristal_avance.png"
  }).save();

  const steelReward = await Reward.create({
    name: "Trophée Acier",
    image: "/trophees/trophee_acier_expert.png"
  }).save();

  const woodLock = await Reward.create({
    name: "Verrou Bois",
    image: "/trophees/verrou_bois_debutant.png"
  }).save();

  const crystalLock = await Reward.create({
    name: "Verrou Cristal",
    image: "/trophees/verrou_cristal_avance.png"
  }).save();

  const steelLock = await Reward.create({
    name: "Verrou Acier",
    image: "/trophees/verrou_acier_expert.png"
  }).save();

  return {
    woodReward,
    crystalReward,
    steelReward,
    woodLock,
    crystalLock,
    steelLock
  };
}


import { DataSource } from "typeorm";
import { Attempt } from "../entities/Attempt";
import { Choice } from "../entities/Choice";
import { Level } from "../entities/Level";
import { Question } from "../entities/Question";
import { Quiz } from "../entities/Quiz";
import { Reward } from "../entities/Reward";
import { GlobalStats } from "../entities/Stats";
import { Theme } from "../entities/Theme";
import { UserPersonalStats } from "../entities/UserStats";
import { User } from "../entities/User";

import env from "../env";

const db = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
  port: env.DB_PORT,
  // port: env.NODE_ENV === "test" ? env.TEST_DB_PORT : env.DB_PORT,
  database: env.DB_NAME,
  entities: [Attempt, Choice, Level, Question, Quiz, Reward, GlobalStats, Theme,User, UserPersonalStats],
  synchronize: env.NODE_ENV !== "production",
  //logging: true
});

export async function clearDB() {
  const runner = db.createQueryRunner();
  const tableDroppings = db.entityMetadatas.map((entity) =>
    runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`),
  );
  await Promise.all(tableDroppings);
  await runner.release();
  await db.synchronize();
}

export default db;

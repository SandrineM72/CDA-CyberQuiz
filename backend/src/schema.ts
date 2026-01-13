import { buildSchema } from "type-graphql"; 
import UserResolver from "./resolvers/UserResolver";
import QuizResolver from "./resolvers/QuizResolver";


export async function getSchema() {
return buildSchema({
    resolvers: [UserResolver, QuizResolver],
});
}
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Quiz } from "../entities/Quiz";


@Resolver()
export default class QuizResolver {
	@Query(() => Quiz, { nullable: true })
	async quiz(@Arg("id", () => Number) id: number) {
		return await Quiz.findOne({
			where: { id },
			relations: ["questions", "questions.choices", "category", "decade", "liked_by"],
		});
	}

	@Query(() => [Quiz])
	async quizzes() {
		const publicQuizzes = await Quiz.find({
			where: { is_public: true, is_draft: false },
			relations: ["category", "decade"],
		});
		console.log(`Nombre de quizzes publics trouvés: ${publicQuizzes.length}`);
		return publicQuizzes;
	}

	@Query(() => [Quiz])
	async privateQuizzes() {
		const privateQuizzes = await Quiz.find({
			where: { is_public: false, is_draft: false },
			relations: ["category", "decade", "liked_by"],
		});
		console.log(`Nombre de quizzes privés trouvés: ${privateQuizzes.length}`);
		return privateQuizzes;
	}
}


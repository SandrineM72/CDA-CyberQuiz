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
	async privateQuizzes(
		@Arg("categoryId", () => Number, { nullable: true }) categoryId?: number,
		@Arg("decadeId", () => Number, { nullable: true }) decadeId?: number
	) {
		const queryBuilder = Quiz.createQueryBuilder("quiz")
			.where("quiz.is_public = :isPublic", { isPublic: false })
			.andWhere("quiz.is_draft = :isDraft", { isDraft: false })
			.leftJoinAndSelect("quiz.category", "category")
			.leftJoinAndSelect("quiz.decade", "decade")
			.leftJoinAndSelect("quiz.liked_by", "liked_by");
        // Mise en place des filtres conditionnels dynamiques sur categoryId et decadeId
		if (categoryId) {
			queryBuilder.andWhere("category.id = :categoryId", { categoryId });
		}

		if (decadeId) {
			queryBuilder.andWhere("decade.id = :decadeId", { decadeId });
		}
        // On exécute la requête pour récupérer les quizzes privés
		const privateQuizzes = await queryBuilder.getMany();
		console.log(`Nombre de quizzes privés trouvés: ${privateQuizzes.length}`);
		return privateQuizzes;
	}
}


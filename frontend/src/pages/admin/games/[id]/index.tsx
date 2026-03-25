import AdminLayout from "@/components/AdminLayout";
import AdminSidebar, { AdminFocusProvider } from "@/components/admin/AdminSidebar";
import { useAdminFocus } from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	useAllQuizzesQuery,
	useDeleteQuizMutation,
	useQuizQuery,
} from "@/graphql/generated/schema";
import { PenTool, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

function GamePageContent() {
	const router = useRouter();
	const id = Number(router.query.id);

	const [deleteQuiz, { loading: isLoading, error }] = useDeleteQuizMutation();
	const { refetch } = useAllQuizzesQuery();
	const { data, loading } = useQuizQuery({ variables: { id: id }, skip: !id });
	const quiz = data?.quiz || undefined;

	// Récupérer la ref "Quiz" depuis la sidebar
	const { gamesRef } = useAdminFocus();

	// Fonction pour retourner à la sidebar
	const handleBackToSidebar = () => {
		if (gamesRef?.current) {
			gamesRef.current.focus();
		}
	};

	if (isNaN(id) || !quiz) {
		return (
			<main className="flex-1 p-8 bg-black text-white">
				<h1 className="text-2xl">Quiz inexistant</h1>
			</main>
		);
	}

	const handleDeleteQuiz = async () => {
		const confirmation = confirm(
			`Voulez-vous supprimer le quiz "${quiz.title}" ?`
		);
		if (confirmation) {
			await deleteQuiz({ variables: { id: quiz.id } });
			console.log("Quiz supprimé");
			await refetch();
			router.push("/admin/games");
		}
	};

	return (
		<main className="flex-1 p-8 bg-black text-white">
			<Card className="w-full border-gray-700 bg-gray-900 p-5">
				<h1 className="text-3xl font-bold mb-6 flex items-center gap-4">
					Quiz n° {quiz.id}

					{/* Bouton Modifier avec Link + Button */}
					<Button
						asChild
						// size="icon"
						className="bg-[#00bb0d] hover:bg-green-400 h-auto w-auto p-3 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md"
						aria-label={`Modifier le quiz ${quiz.id}`}
					>
						<Link href={`/admin/games/${quiz.id}/edit`}>
							<PenTool size={72} />
						</Link>
					</Button>

					{/* Bouton Supprimer */}
					<Button
						onClick={handleDeleteQuiz}
						// size="icon"
						className="bg-red-600 hover:bg-red-400 h-auto w-auto p-3 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md"
						aria-label={`Supprimer le quiz ${quiz.id}`}
					>
						<Trash2 size={72}/>
					</Button>
				</h1>

				<ul className="p-3">
					<li className="m-3">
						<strong>Titre :</strong> {quiz.title}
					</li>
					<li className="m-3">
						<strong>Description :</strong> {quiz.description}
					</li>
					<li className="m-3">
						<strong>Niveau :</strong> {quiz.level.name}
					</li>
					<li className="m-3">
						<strong>Thème :</strong> {quiz.theme.name}
					</li>
					<li className="m-3">
						<strong>Brouillon :</strong> {quiz.is_draft ? "Oui" : "Non"}
					</li>
					<li className="m-3">
						<strong>Public :</strong> {quiz.is_public ? "Oui" : "Non"}
					</li>
				</ul>

				<h2 className="text-2xl bg-[#00bb0d] text-black px-1 py-2 text-center font-bold">
					Questions ({quiz.questions?.length || 0})
				</h2>

				{quiz.questions?.map((question, index) => (
					<Card 
						key={index} 
						className="mt-4 border-gray-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 outline-none"
						tabIndex={0}
					>
						<CardTitle className="p-3 bg-gray-700 text-white">
							Question {index + 1} : {question.title}
						</CardTitle>
						<CardContent className="m-5 bg-gray-800">
							<ul className="list-decimal ml-6">
								{question.choices.map((choice) => (
									<li key={choice.id} className="p-2">
										<span
											className={
												choice.is_correct
													? "bg-[#00bb0d] text-black p-1 font-semibold"
													: ""
											}
										>
											{choice.description}
										</span>
									</li>
								))}
							</ul>
							{question.explanation && (
								<div className="mt-4 p-3 bg-gray-700 border-l-4 border-[#00bb0d]">
									<p className="text-sm text-gray-300">
										<strong className="text-[#00bb0d]">Explication :</strong>{" "}
										{question.explanation}
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				))}

				{/* Bouton Retour */}
				<div className="flex justify-center mt-8">
					<Button
						onClick={handleBackToSidebar}
						className="bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 px-6 py-2"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Retour au menu
					</Button>
				</div>
			</Card>
		</main>
	);
}

export default function GamePage() {
	return (
		<AdminLayout pageTitle={`Quiz - Admin`}>
			<AdminFocusProvider>
				<div className="flex">
					<AdminSidebar />
					<GamePageContent />
				</div>
			</AdminFocusProvider>
		</AdminLayout>
	);
}

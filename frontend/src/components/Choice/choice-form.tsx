"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCategoriesQuery, useDecadesQuery } from "@/graphql/generated/schema";

export default function ChoicePage() {
	const router = useRouter();
	const [categorie, setCategorie] = useState<string>("");
	const [decennie, setDecennie] = useState<string>("");

	// Récupération des catégories depuis la base de données
	const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useCategoriesQuery();
	
	// Récupération des décennies depuis la base de données
	const { data: decadesData, loading: decadesLoading, error: decadesError } = useDecadesQuery();

	const categories = categoriesData?.categories || [];
	const decades = decadesData?.decades || [];

	const handleValider = () => {
		// Construction dynamique de l'URL avec seulement les paramètres sélectionnés
		// Les paramètres sont optionnels, donc on ne les inclut que s'ils sont définis (4 choix sont possibles)
		const params = new URLSearchParams();
		
		if (categorie) {
			params.append("categoryId", categorie);
		}
		
		if (decennie) {
			params.append("decadeId", decennie);
		}
		
		// Redirection avec les paramètres (peut être vide si rien n'est sélectionné)
		const queryString = params.toString();
		const url = queryString 
			? `/connected-user-page?${queryString}`
			: `/connected-user-page`;
		
		router.push(url);
	};

	return (
		<div className="w-full max-w-sm mx-auto px-4 py-8 space-y-6">
			<Card className="border-white">
				<CardContent className="p-6 space-y-6">
					{/* Image Section */}
					<Card className="overflow-hidden p-0 border-white">
						<div className="relative w-full aspect-4/3 bg-zinc-800">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyyy9gKjkNfYftUtfaFr0aKh6BsCSsNQxAjw&s"
								alt="Cinéma"
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
					</Card>

					{/* Bouton d'instruction */}
					<Button
						onClick={() => {}}
						className="w-full bg-zinc-800 border border-white text-white font-bold hover:bg-zinc-700"
						disabled
					>
						Choisis une catégorie et/ou une décennie (optionnel) 👇
					</Button>

					{/* Les menus déroulants */}
					<Card className="border-white">
						<CardContent className="p-6">
							<div className="flex gap-4">
								<Select
									value={categorie || undefined}
									onValueChange={setCategorie}
									disabled={categoriesLoading}
								>
									<SelectTrigger className="bg-zinc-800 border-zinc-700 text-white flex-1">
										<SelectValue placeholder={categoriesLoading ? "Chargement..." : "Catégorie"} />
									</SelectTrigger>
									<SelectContent>
										{categoriesError ? (
											<SelectItem value="error" disabled>
												Erreur de chargement
											</SelectItem>
										) : (
											categories.map((category) => (
												<SelectItem key={category.id} value={category.id.toString()}>
													{category.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>

								<Select
									value={decennie || undefined}
									onValueChange={setDecennie}
									disabled={decadesLoading}
								>
									<SelectTrigger className="bg-zinc-800 border-zinc-700 text-white flex-1">
										<SelectValue placeholder={decadesLoading ? "Chargement..." : "Decennie"} />
									</SelectTrigger>
									<SelectContent>
										{decadesError ? (
											<SelectItem value="error" disabled>
												Erreur de chargement
											</SelectItem>
										) : (
											decades.map((decade) => (
												<SelectItem key={decade.id} value={decade.id.toString()}>
													{decade.name}
												</SelectItem>
											))
										)}
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					{/* Bouton de validation */}
					<Button
						onClick={handleValider}
						className="w-full bg-zinc-800 border border-white text-white font-bold hover:bg-zinc-700"
					>
						Valider
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
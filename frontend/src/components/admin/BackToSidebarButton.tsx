import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackToSidebarButtonProps {
	onClick: () => void;
	label?: string;
}

export default function BackToSidebarButton({ onClick, label = "Retour au menu" }: BackToSidebarButtonProps) {
	return (
		<div className="flex justify-center mt-8 mb-4">
			<Button
				onClick={onClick}
				className="bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black px-6 py-2"
			>
				<ArrowLeft className="w-4 h-4 mr-2" />
				{label}
			</Button>
		</div>
	);
}

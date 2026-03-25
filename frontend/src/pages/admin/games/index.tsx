import AdminLayout from "@/components/AdminLayout";
import GamesTable from "@/components/admin/GamesTable";
import AdminSidebar, { AdminFocusProvider } from "@/components/admin/AdminSidebar";

export default function GamesPage() {
	return (
		<AdminLayout pageTitle="Quiz - Admin">
			<AdminFocusProvider>
				<div className="flex">
					<AdminSidebar />
					<main className="flex-1 p-8 overflow-auto bg-black">
						<div className="w-full">
							<h1 className="text-3xl font-bold text-white mb-6">Gestion des quiz</h1>
							<GamesTable />
						</div>
					</main>
				</div>
			</AdminFocusProvider>
		</AdminLayout>
	);
}

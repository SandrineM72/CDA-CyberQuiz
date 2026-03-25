import AdminLayout from "@/components/AdminLayout";
import AdminSidebar, { AdminFocusProvider } from "@/components/admin/AdminSidebar";
import UsersTable from "@/components/admin/UsersTable";

export default function UsersPage() {
	return (
		<AdminLayout pageTitle="Utilisateurs - Admin">
			<AdminFocusProvider>
				<div className="flex">
					<AdminSidebar />
					<main className="flex-1 p-8 overflow-auto bg-black">
						<div className="w-full">
							<h1 className="text-3xl font-bold text-white mb-6">
								Gestion des utilisateurs
							</h1>
							<UsersTable />
						</div>
					</main>
				</div>
			</AdminFocusProvider>
		</AdminLayout>
	);
}

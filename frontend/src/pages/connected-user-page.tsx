import Layout from "@/components/Layout";
import PrivateHomeForm from "@/components/user/private-home-form";

export default function ConnectedUserPage() {
	return (
		<Layout pageTitle="Accueil">
			<PrivateHomeForm />
		</Layout>
	);
}
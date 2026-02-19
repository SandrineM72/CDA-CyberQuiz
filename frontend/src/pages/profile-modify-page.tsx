import Layout from "@/components/Layout";
import ProfileModifyForm from "@/components/user/profile-modify-form";
import { useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";

export default function ProfileModifyPage() {
  const router = useRouter();
  const { data, loading, error } = useProfileQuery({
    fetchPolicy: "cache-and-network"
  });

  const [updateUser] = useUpdateUserMutation();

  if (loading) {
    return (
      <Layout pageTitle="Modifier mon profil">
        <div className="flex w-full items-center justify-center p-8">
          <p className="text-white">Chargement...</p>
        </div>
      </Layout>
    );
  }

  if (error || !data?.me) {
    return (
      <Layout pageTitle="Modifier mon profil">
        <div className="flex w-full items-center justify-center p-8">
          <p className="text-[#c00f00]">
            Erreur : {error?.message || "Utilisateur non trouvé"}
          </p>
        </div>
      </Layout>
    );
  }

  const user = data.me;

  const handleUpdateAvatar = async (newAvatarUrl: string, currentPassword: string) => {
    try {
      await updateUser({
        variables: {
          data: {
            avatar: newAvatarUrl,
            password: currentPassword,
          },
        },
      });

      alert("Avatar mis à jour avec succès !");
      
      // Optionnel : rediriger vers la page profil
      // router.push("/profile");
    } catch (err: any) {
      const message = 
        err.graphQLErrors?.[0]?.message ||
        err.message ||
        "Erreur lors de la mise à jour de l'avatar";
      throw new Error(message);
    }
  };

  const handleUpdatePseudo = async (newPseudo: string, currentPassword: string) => {
    try {
      await updateUser({
        variables: {
          data: {
            pseudo: newPseudo,
            password: currentPassword,
          },
        },
      });

      alert("Pseudo mis à jour avec succès !");
      
      // Optionnel : rediriger vers la page profil
      // router.push("/profile");
    } catch (err: any) {
      const message = 
        err.graphQLErrors?.[0]?.message ||
        err.message ||
        "Erreur lors de la mise à jour du pseudo";
      throw new Error(message);
    }
  };

  const handleUpdatePassword = async (newPassword: string, currentPassword: string) => {
    try {
      await updateUser({
        variables: {
          data: {
            newPassword: newPassword,
            password: currentPassword,
          },
        },
      });

      alert("Mot de passe mis à jour avec succès !");
      
      // Rediriger vers la page profil après changement de mot de passe
      router.push("/profile");
    } catch (err: any) {
      const message = 
        err.graphQLErrors?.[0]?.message ||
        err.message ||
        "Erreur lors de la mise à jour du mot de passe";
      throw new Error(message);
    }
  };

  return (
    <Layout pageTitle="Modifier mon profil">
      <ProfileModifyForm
        currentPseudo={user.pseudo}
        currentAvatarUrl={user.avatar}
        onUpdateAvatar={handleUpdateAvatar}
        onUpdatePseudo={handleUpdatePseudo}
        onUpdatePassword={handleUpdatePassword}
      />
    </Layout>
  );
}

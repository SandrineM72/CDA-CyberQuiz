import Layout from "@/components/Layout";
import ProfileForm from "@/components/user/profile-form";
import { useProfileQuery } from "@/graphql/generated/schema";

export default function ProfilePage() {
  const { data, loading, error } = useProfileQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading) {
    return (
      <Layout pageTitle="Profil">
        <div className="flex w-full items-center justify-center p-8">
          <p className="text-white">Chargement du profil...</p>
        </div>
      </Layout>
    );
  }

  if (error || !data?.me) {
    return (
      <Layout pageTitle="Profil">
        <div className="flex w-full items-center justify-center p-8">
          <p className="text-[#c00f00]">
            Erreur lors du chargement du profil : {error?.message || "Utilisateur non trouvé"}
          </p>
        </div>
      </Layout>
    );
  }

  const user = data.me;

  // Calculer les statistiques depuis les attempts
  const quizStarted = user.attempts?.length || 0;
  const quizCompleted = user.attempts?.filter(attempt => attempt.finished_at)?.length || 0;
  const totalScore = user.attempts?.reduce((sum, attempt) => sum + attempt.score, 0) || 0;

  return (
    <Layout pageTitle="Profil">
      <ProfileForm
        pseudo={user.pseudo}
        quizStarted={quizStarted}
        quizCompleted={quizCompleted}
        totalScore={totalScore}
        avatarUrl={user.avatar}
      />
    </Layout>
  );
}

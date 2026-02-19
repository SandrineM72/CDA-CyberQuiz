import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PublicScore() {
  const [globalScore, setGlobalScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    // Ici tu pourrais récupérer les scores depuis le localStorage
    // ou faire une query pour récupérer les attempts du GuestUser
    // Pour l'instant, je mets des valeurs de test
    
    // TODO: Implémenter la récupération réelle des scores
    // Par exemple avec une query qui récupère tous les attempts du GuestUser
    setGlobalScore(40); // Pourcentage global
    setTotalTime(224); // Temps en secondes (3min 44s)
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds}`;
  };

  return (
    <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
      <div className="w-full max-w-md space-y-4">
        {/* Image boule de cristal */}
        <div className="flex justify-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden border-4 border-[#00bb0d]">
            <Image
              src="/images/crystal_ball.jpg"
              alt="Boule de cristal"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Message Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardContent className="px-4 py-6">
            <div className="bg-[#565656] p-4 text-center">
              <p className="text-white text-base font-semibold">
                Vos 3 quiz d'essai sont terminés !
              </p>
              <p className="text-white text-base">
                Voici vos scores.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Score Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardContent className="px-4 py-6">
            <div className="bg-[#565656] p-4 text-center">
              <p className="text-white text-lg font-semibold">
                Réussite : {globalScore}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardContent className="px-4 py-6">
            <div className="bg-[#565656] p-4 text-center">
              <p className="text-white text-lg font-semibold">
                Temps : {formatTime(totalTime)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to action button */}
        <div className="flex flex-col items-center pt-2">
          <Link href="/signup" className="w-3/4">
            <Button
              type="button"
              className="w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-14 text-base font-semibold leading-tight"
            >
              S'inscrire pour accéder<br />à tout CyberQuiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

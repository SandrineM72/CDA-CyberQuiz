import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  useQuizQuery,
  useCreateAttemptMutation,
} from "@/graphql/generated/schema";
import { useEffect, useState } from "react";

export default function PublicAnswers() {
  const router = useRouter();
  const { quizId, questionIndex, answers: answersParam, duration } = router.query;

  const [createAttempt] = useCreateAttemptMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const parsedQuizId = quizId ? Number(quizId) : undefined;
  const parsedQuestionIndex = questionIndex ? Number(questionIndex) : 0;
  const parsedDuration = duration ? Number(duration) : 0;
  
  const answersArray = answersParam 
    ? JSON.parse(answersParam as string) 
    : [];

  const { data, loading, error } = useQuizQuery({
    variables: { id: parsedQuizId! },
    skip: !parsedQuizId,
  });

  const quiz = data?.quiz;
  const currentQuestion = quiz?.questions?.[parsedQuestionIndex];
  const totalQuestions = quiz?.questions?.length ?? 0;

  // Déterminer le bouton et l'action
  const isLastQuestionOfQuiz = parsedQuestionIndex === totalQuestions - 1;
  const totalAnswered = answersArray.length;

  // Cas 1 : Pas fini le quiz actuel
  const isCase1 = !isLastQuestionOfQuiz;
  // Cas 2 : Quiz fini mais moins de 9 questions au total
  const isCase2 = isLastQuestionOfQuiz && totalAnswered < 9;
  // Cas 3 : 9 questions répondues (3 quiz terminés)
  const isCase3 = totalAnswered >= 9;

  const handleNextAction = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (isCase1) {
        // Prochaine question du même quiz
        router.push({
          pathname: '/quiz-public-page',
          query: {
            id: parsedQuizId,
            questionIndex: parsedQuestionIndex + 1,
            answers: JSON.stringify(answersArray),
            duration: parsedDuration,
          },
        });
      } else if (isCase2) {
        // Créer l'attempt pour ce quiz, puis retour à welcome-quiz
        await createAttempt({
          variables: {
            quizId: parsedQuizId!,
            answers: answersArray,
            duration: parsedDuration,
          },
        });
        router.push('/quiz-welcome');
      } else if (isCase3) {
        // Créer l'attempt pour ce dernier quiz, puis aller à public-score
        const result = await createAttempt({
          variables: {
            quizId: parsedQuizId!,
            answers: answersArray,
            duration: parsedDuration,
          },
        });
        router.push('/public-score-page');
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const getButtonText = () => {
    if (isCase1) return "Compris, question suivante !";
    if (isCase2) return "Choisir un autre quiz";
    if (isCase3) return "Les 3 quiz sont terminés - voir mes scores";
    return "Continuer";
  };

  // Trouver la réponse choisie et la bonne réponse
  const userAnswer = answersArray.find(
    (a: any) => a.questionId === currentQuestion?.id
  );
  const correctChoice = currentQuestion?.choices.find((c) => c.is_correct);

  if (loading) {
    return (
      <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
        <div className="w-full max-w-md">
          <p className="text-center text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !currentQuestion) {
    return (
      <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
        <div className="w-full max-w-md">
          <p className="text-center text-[#c00f00]">
            {error?.message || "Question introuvable"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
      <div className="w-full max-w-md space-y-4">
        {/* Image point d'interrogation */}
        <div className="flex justify-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden border-4 border-[#00bb0d]">
            <Image
              src="/images/question_mark_right_green.jpg"
              alt="Point d'interrogation"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Explanation Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardContent className="px-4 py-6">
            <div className="space-y-4">
              {/* Explication */}
              <div className="bg-[#565656] p-4">
                <p className="text-white text-base">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* Bouton action */}
              <Button
                onClick={handleNextAction}
                disabled={isProcessing}
                className="w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-12 text-base font-semibold"
              >
                {isProcessing ? "Chargement..." : getButtonText()}
              </Button>

              {/* Answers avec couleurs */}
              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    disabled
                    className={`w-full h-12 text-base font-semibold rounded-full border-4 ${
                      choice.is_correct
                        ? 'bg-[#00bb0d] border-[#00bb0d] text-black'
                        : 'bg-[#c00f00] border-[#c00f00] text-white'
                    }`}
                  >
                    {choice.description}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  useQuizQuery,
} from "@/graphql/generated/schema";

export default function PublicQuiz() {
  const router = useRouter();
  const quizId = router.query.id ? Number(router.query.id) : undefined;

  const { data, loading: isLoading, error } = useQuizQuery({
    variables: { id: quizId! },
    skip: !quizId,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Stocke les réponses utilisateur
  const answersRef = useRef<
    { questionId: number; choiceId: number }[]
  >([]);

  const quiz = data?.quiz;
  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const totalQuestions = quiz?.questions?.length ?? 0;

  // Init quiz
  useEffect(() => {
    if (quiz?.questions) {
      startTimeRef.current = Date.now();
      answersRef.current = [];
    }
  }, [quiz?.questions]);

  // Handle answer click
  const handleAnswerClick = (choiceId: number, choiceIndex: number) => {
    if (selected !== null || !currentQuestion) return;

    setSelected(choiceIndex);

    // Stocke la réponse
    answersRef.current.push({
      questionId: currentQuestion.id,
      choiceId: choiceId,
    });

    // Redirection vers la page d'explications après 1 seconde
    setTimeout(() => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      router.push({
        pathname: '/public-answers-page',
        query: {
          quizId: quizId,
          questionIndex: currentQuestionIndex,
          answers: JSON.stringify(answersRef.current),
          duration: duration,
        },
      });
    }, 1000);
  };

  // Render states
  if (isLoading) {
    return (
      <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
        <div className="w-full max-w-md">
          <p className="text-center text-white">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz || !currentQuestion) {
    return (
      <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
        <div className="w-full max-w-md">
          <p className="text-center text-[#c00f00]">
            {errorMessage || error?.message || "Quiz introuvable"}
          </p>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="flex w-full items-start justify-center px-6 pt-2 pb-8 md:px-10">
      <div className="w-full max-w-md space-y-4">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden border-4 border-[#00bb0d]">
            <Image
              src={quiz.image || "/illustrations/smartphone_lock_plant-green.png"}
              alt="Quiz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-black border-2 border-[#00bb0d] rounded-none">
          <CardContent className="px-4 py-6">
            <div className="space-y-4">
              {/* Question number and title */}
              <div className="bg-[#565656] p-4 text-center">
                <p className="text-white text-base font-semibold mb-2">
                  Question N°{currentQuestionIndex + 1}
                </p>
                <p className="text-white text-lg">
                  {currentQuestion.title}
                </p>
              </div>

              {/* Answers */}
              <div className="space-y-3">
                {currentQuestion.choices.map((choice, index) => (
                  <Button
                    key={choice.id}
                    onClick={() => handleAnswerClick(choice.id, index)}
                    disabled={selected !== null}
                    className={`w-full bg-[#00bb0d] text-black border-4 border-[#00bb0d] hover:bg-transparent hover:text-[#00bb0d] rounded-full h-12 text-base font-semibold ${
                      selected === index ? 'opacity-70' : ''
                    } ${selected !== null && selected !== index ? 'opacity-50' : ''}`}
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

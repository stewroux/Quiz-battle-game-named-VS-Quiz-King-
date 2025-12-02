import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";
import { TOTAL_QUESTIONS } from "../constants";
import { Language } from "../i18n";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The trivia question."
      },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "An array of 4 multiple-choice options."
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The correct answer, which must be one of the provided options."
      },
    },
    required: ["question", "options", "correctAnswer"]
  }
};

export const generateQuiz = async (category: string, language: Language): Promise<QuizQuestion[]> => {
  try {
    const languageInstruction = language === 'ja' ? 'in Japanese' : 'in English';
    const prompt = `Generate ${TOTAL_QUESTIONS} unique, interesting, and challenging multiple-choice trivia questions about ${category}. Generate the quiz entirely ${languageInstruction}. Each question must have exactly 4 options. Ensure one of the options is the correct answer.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        temperature: 1,
      },
    });

    const jsonText = response.text.trim();
    const quizData = JSON.parse(jsonText);

    // Basic validation
    if (!Array.isArray(quizData) || quizData.length === 0) {
      throw new Error("API returned invalid quiz data format.");
    }

    return quizData as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to fetch quiz from Gemini API.");
  }
};

export const getAiAnswer = async (question: QuizQuestion): Promise<string> => {
  try {
    const prompt = `You are the Quiz King, an unbeatable trivia master. Answer the following question.
    Question: "${question.question}"
    Options: ${question.options.join(", ")}
    
    Respond ONLY with the text of the correct answer from the options provided.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0, // Be deterministic for the "king"
      },
    });
    
    let aiChoice = response.text.trim();

    // Fallback: If the AI doesn't return a valid option, it makes a random guess.
    // This can happen with very creative models.
    if (!question.options.includes(aiChoice)) {
        console.warn(`AI returned an invalid answer: "${aiChoice}". Picking a random option.`);
        aiChoice = question.options[Math.floor(Math.random() * question.options.length)];
    }

    return aiChoice;

  } catch (error) {
    console.error("Error getting AI answer:", error);
    // In case of API error, make a random guess.
    return question.options[Math.floor(Math.random() * question.options.length)];
  }
};

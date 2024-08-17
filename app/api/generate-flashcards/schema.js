import { z } from "zod";

// Define a schema for the flashcards
export const flashcardSchema = z.object({
    deck_name: z.string().describe('Name of the flashcard deck.'),
    flashcards: z.array(
      z.object({
        question: z.string().describe('The question on the flashcard.'),
        answer: z.string().describe('The answer on the flashcard.'),
      })
    ).describe('Array of flashcards with question and answer pairs.'),
  });

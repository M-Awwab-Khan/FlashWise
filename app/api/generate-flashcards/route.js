import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { flashcardSchema } from './schema';


export async function POST(req) {
  const context = await req.json();

  const match = context.match(/^(\d+)\s(.*)$/);
  const numFlashcards = parseInt(match[1], 10);
  const content = match[2];

  console.log(numFlashcards);
  console.log(content);


  const result = await streamObject({
    model: google('models/gemini-1.5-pro-latest'),
    schema: flashcardSchema,
    prompt:
      `Generate ${numFlashcards} flashcards in the format specified regarding this content :` + content,
  });

  return result.toTextStreamResponse();
}

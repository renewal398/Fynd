'use server';

/**
 * @fileOverview Suggests relevant technology buzzwords for idea generation based on trending topics.
 *
 * - suggestTechBuzzwords - A function that suggests tech buzzwords.
 * - SuggestTechBuzzwordsInput - The input type for the suggestTechBuzzwords function.
 * - SuggestTechBuzzwordsOutput - The return type for the suggestTechBuzzwords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTechBuzzwordsInputSchema = z.object({
  trendingTopic: z
    .string()
    .describe('The current trending topic to generate buzzwords for.'),
});
export type SuggestTechBuzzwordsInput = z.infer<typeof SuggestTechBuzzwordsInputSchema>;

const SuggestTechBuzzwordsOutputSchema = z.object({
  buzzwords: z
    .array(z.string())
    .describe('An array of relevant technology buzzwords.'),
});
export type SuggestTechBuzzwordsOutput = z.infer<typeof SuggestTechBuzzwordsOutputSchema>;

export async function suggestTechBuzzwords(
  input: SuggestTechBuzzwordsInput
): Promise<SuggestTechBuzzwordsOutput> {
  return suggestTechBuzzwordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTechBuzzwordsPrompt',
  input: {schema: SuggestTechBuzzwordsInputSchema},
  output: {schema: SuggestTechBuzzwordsOutputSchema},
  prompt: `You are an expert in identifying relevant technology buzzwords for startup ideas.

  Based on the current trending topic: {{{trendingTopic}}},
  suggest a list of technology buzzwords (AI, Blockchain, AR, VR, IoT, etc.) that would be relevant for generating startup ideas. Limit the list to a maximum of 5 buzzwords.
  Ensure that the buzzwords are currently trending and marketable.

  Return the buzzwords as a JSON array of strings.`,
});

const suggestTechBuzzwordsFlow = ai.defineFlow(
  {
    name: 'suggestTechBuzzwordsFlow',
    inputSchema: SuggestTechBuzzwordsInputSchema,
    outputSchema: SuggestTechBuzzwordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

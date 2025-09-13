// src/ai/flows/suggest-target-audiences.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow that suggests relevant target audiences for startup ideas.
 *
 * - suggestTargetAudiences - A function that suggests target audiences based on a startup idea description.
 * - SuggestTargetAudiencesInput - The input type for the suggestTargetAudiences function.
 * - SuggestTargetAudiencesOutput - The return type for the suggestTargetAudiences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTargetAudiencesInputSchema = z.object({
  ideaDescription: z
    .string()
    .describe('A description of the startup idea.'),
});
export type SuggestTargetAudiencesInput = z.infer<
  typeof SuggestTargetAudiencesInputSchema
>;

const SuggestTargetAudiencesOutputSchema = z.object({
  targetAudiences: z
    .array(z.string())
    .describe('An array of suggested target audiences for the startup idea.'),
});
export type SuggestTargetAudiencesOutput = z.infer<
  typeof SuggestTargetAudiencesOutputSchema
>;

export async function suggestTargetAudiences(
  input: SuggestTargetAudiencesInput
): Promise<SuggestTargetAudiencesOutput> {
  return suggestTargetAudiencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetAudiencesPrompt',
  input: {schema: SuggestTargetAudiencesInputSchema},
  output: {schema: SuggestTargetAudiencesOutputSchema},
  prompt: `You are a startup advisor specializing in target audience identification.

  Given a startup idea description, you will suggest a few relevant target audiences.
  Focus on the needs that the startup idea addresses for each target audience.

  Startup Idea Description: {{{ideaDescription}}}

  Target Audiences (list of strings):
  `, // Ensure that output is a JSON array of strings
});

const suggestTargetAudiencesFlow = ai.defineFlow(
  {
    name: 'suggestTargetAudiencesFlow',
    inputSchema: SuggestTargetAudiencesInputSchema,
    outputSchema: SuggestTargetAudiencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

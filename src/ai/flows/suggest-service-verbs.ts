'use server';

/**
 * @fileOverview Suggests relevant service verbs for startup idea generation.
 *
 * - suggestServiceVerbs - A function that suggests service verbs.
 * - SuggestServiceVerbsInput - The input type for the suggestServiceVerbs function.
 * - SuggestServiceVerbsOutput - The return type for the suggestServiceVerbs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestServiceVerbsInputSchema = z.object({
  topic: z
    .string()
    .describe('The main topic or area for the service verbs.'),
});
export type SuggestServiceVerbsInput = z.infer<typeof SuggestServiceVerbsInputSchema>;

const SuggestServiceVerbsOutputSchema = z.object({
  serviceVerbs: z
    .array(z.string())
    .describe('An array of relevant service verbs for the topic.'),
});
export type SuggestServiceVerbsOutput = z.infer<typeof SuggestServiceVerbsOutputSchema>;

export async function suggestServiceVerbs(input: SuggestServiceVerbsInput): Promise<SuggestServiceVerbsOutput> {
  return suggestServiceVerbsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestServiceVerbsPrompt',
  input: {schema: SuggestServiceVerbsInputSchema},
  output: {schema: SuggestServiceVerbsOutputSchema},
  prompt: `You are a helpful assistant that suggests service verbs for startup ideas based on a given topic.

  Topic: {{{topic}}}

  Please provide a list of service verbs that would be relevant to this topic.  The list should contain between three and five service verbs.  Each entry in the list should be a single verb.
  `,
});

const suggestServiceVerbsFlow = ai.defineFlow(
  {
    name: 'suggestServiceVerbsFlow',
    inputSchema: SuggestServiceVerbsInputSchema,
    outputSchema: SuggestServiceVerbsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

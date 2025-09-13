'use server';
/**
 * @fileOverview Generates SaaS startup ideas by combining tech buzzwords, service verbs, and target audiences.
 *
 * - generateSaaSStartupIdea - A function that generates a SaaS startup idea.
 * - GenerateSaaSStartupIdeaInput - The input type for the generateSaaSStartupIdea function.
 * - GenerateSaaSStartupIdeaOutput - The return type for the generateSaaSStartupIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSaaSStartupIdeaInputSchema = z.object({
  request: z.string().optional().describe('Any user request or specific direction.'),
  category: z.string().optional().describe('The category of the app idea to generate (e.g. SaaS, websites, web3).'),
  budget: z.string().optional().describe('The estimated budget the user has for building the application.'),
});
export type GenerateSaaSStartupIdeaInput = z.infer<typeof GenerateSaaSStartupIdeaInputSchema>;

const GenerateSaaSStartupIdeaOutputSchema = z.object({
  idea: z.string().describe('A creative SaaS startup idea.'),
  targetAudience: z.string().describe('The target audience for the startup idea.'),
  buildSteps: z.array(z.string()).describe('The steps to build the application.'),
  estimatedCost: z.string().describe('The estimated cost to build the application.'),
  expectedROI: z.string().describe('The expected ROI based on the number of users.'),
  techStack: z.array(z.string()).describe('The recommended tech stack to use.'),
  roadmap: z.array(z.string()).describe('A roadmap to build the application.'),
  suggestedPlatforms: z.object({
    free: z.array(z.string()).describe('Suggested free platforms to help with building.'),
    paid: z.array(z.string()).describe('Suggested paid platforms to help with building.'),
  }).describe('Suggested platforms to help with building.'),
});
export type GenerateSaaSStartupIdeaOutput = z.infer<typeof GenerateSaaSStartupIdeaOutputSchema>;

export async function generateSaaSStartupIdea(
  input: GenerateSaaSStartupIdeaInput
): Promise<GenerateSaaSStartupIdeaOutput> {
  return generateSaaSStartupIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSaaSStartupIdeaPrompt',
  input: {schema: GenerateSaaSStartupIdeaInputSchema},
  output: {schema: GenerateSaaSStartupIdeaOutputSchema},
  prompt: `You are a creative startup idea generator for developers. Your goal is to generate a unique, "lit" SaaS startup idea that people will love and that has the potential to be profitable.

  The user is looking for a validated idea to build. The idea should be for a {{#if category}}"{{category}}" application{{else}}SaaS application{{/if}}.
  
  {{#if request}}
  The user has provided the following specific direction: "{{request}}". Please incorporate this into the idea.
  {{/if}}

  {{#if budget}}
  The user's budget for this project is "{{budget}}". The idea and build steps should be tailored to this budget.
  {{/if}}

  Generate a creative and unique SaaS idea. Then, provide the following details in a structured format:

  1.  **Idea**: A clear and concise description of the startup idea.
  2.  **Target Audience**: Who is the primary user for this product?
  3.  **Tech Stack**: A recommended, modern tech stack for building this.
  4.  **Build Steps**: A high-level list of steps to build the MVP.
  5.  **Roadmap**: A 3-step roadmap for post-launch development (e.g., Q1, Q2, Q3).
  6.  **Estimated Cost**: A rough estimate of the cost to build the MVP (e.g., in developer-hours or a dollar range). This should align with the user's budget if provided.
  7.  **Expected ROI**: An example of potential monthly ROI based on a specific number of paid users multiplied by a plausible premium price for the service.
  8.  **Suggested Platforms**: Recommend both free and paid platforms that can help build or host the application (e.g., Vercel for hosting, Firebase for backend, Stripe for payments, etc.).
  
  Ensure the idea is fresh, innovative, and not just a derivative of an existing product. Make it something a developer would be excited to build.
  `,
});

const generateSaaSStartupIdeaFlow = ai.defineFlow(
  {
    name: 'generateSaaSStartupIdeaFlow',
    inputSchema: GenerateSaaSStartupIdeaInputSchema,
    outputSchema: GenerateSaaSStartupIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

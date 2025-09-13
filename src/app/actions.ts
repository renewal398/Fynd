
"use server";

import { GenerateSaaSStartupIdeaOutput, generateSaaSStartupIdea } from "@/ai/flows/generate-saas-startup-idea";

export async function generateIdeaAction(
  request: string | null,
  category: string | null,
  budget: string | null,
): Promise<{ idea?: GenerateSaaSStartupIdeaOutput, error?: string }> {
  try {
    const result = await generateSaaSStartupIdea({ 
      request: request ?? undefined,
      category: category ?? undefined,
      budget: budget ?? undefined,
    });
    if (!result || !result.idea) {
      throw new Error("Failed to generate an idea. The result was empty.");
    }
    return { idea: result };
  } catch (error) {
    console.error("Error generating startup idea:", error);
    return { error: "Sorry, we couldn't generate an idea right now. Please try again later." };
  }
}

"use client";

import { useState } from "react";
import { generateIdeaAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import IdeaCard from "./idea-card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { GenerateSaaSStartupIdeaOutput } from "@/ai/flows/generate-saas-startup-idea";
import { ScrollArea } from "./ui/scroll-area";

const categories = [
  "SaaS",
  "AI/ML",
  "Web3",
  "Mobile App",
  "DevTools",
  "FinTech",
  "HealthTech",
  "E-commerce",
  "Analytics",
  "IoT",
  "Security",
  "Creator Economy",
  "PaaS",
  "DBaaS",
  "SECaaS",
  "IDaaS",
  "NaaS",
  "MLaaS",
  "LegalTech",
  "GovTech"
];
const budgets = ["< $1k", "$1k - $5k", "$5k+"];

export default function IdeaGenerator() {
  const [idea, setIdea] = useState<GenerateSaaSStartupIdeaOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setIdea(null);
    
    // Add a small delay for a better UX, letting the animation start
    setTimeout(async () => {
      const result = await generateIdeaAction(request, category, budget);
      setLoading(false);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      } else if (result.idea) {
        setIdea(result.idea);
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="grid w-full gap-6">
        <div>
          <Label className="font-headline mb-2 block">I want to build a...</Label>
          <ScrollArea className="h-32">
            <RadioGroup value={category} onValueChange={setCategory} className="grid grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat} id={cat} />
                  <Label htmlFor={cat} className="font-normal">{cat}</Label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
        </div>

        <div>
          <Label className="font-headline mb-2 block">My budget is...</Label>
          <RadioGroup value={budget} onValueChange={setBudget} className="flex flex-wrap gap-4">
            {budgets.map(b => (
              <div key={b} className="flex items-center space-x-2">
                <RadioGroupItem value={b} id={b} />
                <Label htmlFor={b} className="font-normal">{b}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="request" className="font-headline">Optional: Give the AI some direction</Label>
          <Textarea
            id="request"
            placeholder="e.g., 'Something for dog owners' or 'A tool that uses blockchain'"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows={2}
            className="bg-card mt-2"
          />
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={loading} className="w-full text-lg" size="lg" variant="default">
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-5 w-5" />
        )}
        Generate Idea
      </Button>

      {idea && !loading && (
        <div key={idea.idea} className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
           <IdeaCard idea={idea} />
        </div>
      )}
    </div>
  );
}
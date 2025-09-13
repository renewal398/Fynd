"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Lightbulb } from "lucide-react";
import { TwitterIcon } from "./icons";
import { useEffect, useState } from "react";
import type { GenerateSaaSStartupIdeaOutput } from "@/ai/flows/generate-saas-startup-idea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

type IdeaCardProps = {
  idea: GenerateSaaSStartupIdeaOutput;
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [tweetUrl, setTweetUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tweetText = encodeURIComponent(`I just generated a startup idea with fynd: "${idea.idea}"\n\nFind your own idea: ${window.location.origin}`);
      setTweetUrl(`https://twitter.com/intent/tweet?text=${tweetText}`);
    }
  }, [idea]);

  const handleDownload = () => {
    const formatList = (list: string[]) => list.map(item => `- ${item}`).join('\n');
    
    const content = `
# Startup Idea from fynd

## Idea
${idea.idea}

## Target Audience
${idea.targetAudience}

## Tech Stack
${idea.techStack.map(tech => `- ${tech}`).join('\n')}

## Build Steps
${idea.buildSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Roadmap
${idea.roadmap.map(item => `- ${item}`).join('\n')}

## Estimated Cost (MVP)
${idea.estimatedCost}

## Expected ROI
${idea.expectedROI}

## Suggested Platforms
### Free
${idea.suggestedPlatforms.free.map(platform => `- ${platform}`).join('\n')}

### Paid
${idea.suggestedPlatforms.paid.map(platform => `- ${platform}`).join('\n')}
`;

    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeFilename = idea.idea.toLowerCase().replace(/[\s\W]+/g, '-').substring(0, 30);
    link.download = `fynd-idea-${safeFilename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full overflow-hidden border-primary/20 bg-card/50 shadow-lg shadow-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">Your Next Big Idea</CardTitle>
            <CardDescription>What will you build?</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold text-foreground">{idea.idea}</p>
        
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="w-[150px]">Target Audience</TableHead>
              <TableCell>{idea.targetAudience}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Tech Stack</TableHead>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Build Steps</TableHead>
              <TableCell>
                <ul className="list-disc pl-4 space-y-1">
                  {idea.buildSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Roadmap</TableHead>
              <TableCell>
                <ul className="list-disc pl-4 space-y-1">
                    {idea.roadmap.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Est. Cost (MVP)</TableHead>
              <TableCell>{idea.estimatedCost}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Expected ROI</TableHead>
              <TableCell>{idea.expectedROI}</TableCell>
            </TableRow>
            {idea.suggestedPlatforms && (
              <>
                <TableRow>
                  <TableHead>Suggested Platforms (Free)</TableHead>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {idea.suggestedPlatforms.free.map(platform => <Badge key={platform} variant="outline">{platform}</Badge>)}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Suggested Platforms (Paid)</TableHead>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {idea.suggestedPlatforms.paid.map(platform => <Badge key={platform} variant="outline">{platform}</Badge>)}
                    </div>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>

      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={handleDownload} variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Idea
        </Button>
        <Button asChild variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="mr-2 h-4 w-4" />
            Tweet this idea
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

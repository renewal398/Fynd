import IdeaGenerator from "@/components/idea-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(hsl(var(--primary)/0.15)_1px,transparent_1px)]"></div>
      <div className="container mx-auto flex max-w-2xl flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-headline text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            fynd
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Find your next validated idea to build. What people will love, and what you'll earn from.
          </p>
        </div>
        <IdeaGenerator />
      </div>
    </main>
  );
}

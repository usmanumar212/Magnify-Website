import Header from "@/components/Header";
import CinematicHero from "@/components/CinematicHero";

export default function Home() {
  return (
    <div className="bg-black min-h-[100dvh] text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Header />
      <CinematicHero />
    </div>
  );
}
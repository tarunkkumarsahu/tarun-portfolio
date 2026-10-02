import { IntroExperience } from "@/components/IntroExperience";
import { IntroducingTarun } from "@/components/sections/IntroducingTarun";
import { LivingSystem } from "@/components/sections/LivingSystem";
import { MethodMachine } from "@/components/sections/MethodMachine";
import { SideQuests } from "@/components/sections/SideQuests";
import { SystemFile } from "@/components/sections/SystemFile";
import { TraceResponse } from "@/components/sections/TraceResponse";
import { Workstation } from "@/components/sections/Workstation";
import { TechCursor } from "@/components/TechCursor";
import { ChapterRail } from "@/components/ChapterRail";
import { TechIconTrail } from "@/components/ui/tech-cursor";

export default function Home() {
  return (
    <main className="portfolioRoot">
      <TechCursor />
      <TechIconTrail />
      <ChapterRail />

      <IntroExperience />
      <IntroducingTarun />
      <LivingSystem />
      <MethodMachine />
      <SideQuests />
      <SystemFile />
      <TraceResponse />
      <Workstation />
    </main>
  );
}

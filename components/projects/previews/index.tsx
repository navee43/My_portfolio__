import type { PreviewKind } from "@/data/projects";
import { AgentPreview } from "./agent-preview";
import { ChatPreview } from "./chat-preview";
import { EduComparePreview } from "./educompare-preview";
import { FoodPreview } from "./food-preview";
import { KaamSetuPreview } from "./kaamsetu-preview";
import { PricePreview } from "./price-preview";

const previews: Record<PreviewKind, (props: { alt: string }) => React.JSX.Element> = {
  agent: AgentPreview,
  kaamsetu: KaamSetuPreview,
  educompare: EduComparePreview,
  food: FoodPreview,
  price: PricePreview,
  chat: ChatPreview,
};

export function ProjectPreview({ kind, alt }: { kind: PreviewKind; alt: string }) {
  const Preview = previews[kind];
  return <Preview alt={alt} />;
}

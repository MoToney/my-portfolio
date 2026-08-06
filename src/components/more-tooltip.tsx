import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/src/components/ui/tooltip";


type MoreTooltipProps = {
  count: number;
  items: string[];
};

export default function MoreTooltip({
  count,
  items,
}: MoreTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="text-xs text-muted-foreground">
          +{count} more
        </span>
      </TooltipTrigger>

      <TooltipContent className="max-w-xs">
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
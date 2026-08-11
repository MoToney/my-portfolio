import { Badge } from "@/src/components/ui/badge";
import { Technology } from "@/src/features/projects/types";

export default function TechBadge({ technology }: { technology: Technology }) {
    return (
        <Badge
            className="flex items-center gap-2"
            style={{
                backgroundColor: technology.badgeBackgroundColor,
                color: technology.badgeTextColor,
            }}
        >            
            {technology.name}
        </Badge>
    );
}
// Styling
import { twMerge } from "tailwind-merge";

// Components
import { Card } from "../commons/card";

interface SuggestionProps {
    className?: string;
}

export const Suggestions: React.FC<SuggestionProps> = ({ className }) => {
    return (
        <Card title="Suggestions" className={twMerge("", className)}>
            <div>Suggestion Content</div>
        </Card>
    );
};

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { Card } from "../commons/card";

interface MusicPlayerProps {
    className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
    return (
        <Card title="Currently Playing" className={twMerge("", className)}>
            <div>Music Player Content</div>
        </Card>
    );
};

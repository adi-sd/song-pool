"use client";

// Components
import { Card } from "../commons/card";

interface MusicPlayerProps {}

export const MusicPlayer: React.FC<MusicPlayerProps> = () => {
    return (
        <Card title="Currently Playing" className="h-full">
            <div>Music Player Content</div>
        </Card>
    );
};

// Styling
import { twMerge } from "tailwind-merge";

// Components
import { Card } from "../commons/card";

interface StatisticsProps {
    className?: string;
}

export const Statistics: React.FC<StatisticsProps> = ({ className }) => {
    return <Card title="Pool Statistics" className={twMerge("", className)}></Card>;
};

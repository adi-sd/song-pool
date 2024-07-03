// Styling
import { PiSwimmingPoolBold } from "react-icons/pi";

interface LogoPops {
    size?: number;
}

export const Logo: React.FC<LogoPops> = ({ size = 90 }) => {
    return (
        <div className="h-10 mb-16 flex items-center justify-between">
            <PiSwimmingPoolBold size={size} className="font-semibold"></PiSwimmingPoolBold>
            <h1 className="text-[50px] font-semibold">Song-Pool</h1>
        </div>
    );
};

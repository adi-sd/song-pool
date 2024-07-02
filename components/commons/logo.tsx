// Styling
import { PiSwimmingPoolBold } from "react-icons/pi";

interface LogoPops {
    size?: number;
}

export const Logo: React.FC<LogoPops> = ({ size = 80 }) => {
    return (
        <div className="flex items-center justify-center mb-10">
            <PiSwimmingPoolBold size={size} className="font-semibold"></PiSwimmingPoolBold>
            <h1 className="text-5xl font-semibold ml-3">Song.pool</h1>
        </div>
    );
};

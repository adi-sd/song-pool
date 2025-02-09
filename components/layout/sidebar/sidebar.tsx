// Styling
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";

// Components
import { Logo } from "../../commons/logo";
import { Box } from "../../commons/box";
import { SideBarItem } from "./sidebar-item";

interface SideBarProps {
    className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({ className }) => {
    return (
        <div className={twMerge("text-neutral-500 hidden sm:block", className)}>
            <Logo></Logo>
            <Box title="menu" className="">
                <SideBarItem icon={HiHome} name="Home"></SideBarItem>
                <SideBarItem icon={FiSettings} name="Settings"></SideBarItem>
            </Box>
        </div>
    );
};

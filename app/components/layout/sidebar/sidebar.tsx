// Styling
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { RiSettings2Fill } from "react-icons/ri";

// Components
import { Logo } from "./logo";
import { Box } from "../../commons/box";
import { SideBarItem } from "./sidebar-item";

interface SideBarProps {
    className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({ className }) => {
    return (
        <div className={twMerge("text-neutral-500", className)}>
            <Logo></Logo>
            <Box title="menu">
                <SideBarItem icon={HiHome} name="Home"></SideBarItem>
                <SideBarItem icon={RiSettings2Fill} name="Settings"></SideBarItem>
            </Box>
        </div>
    );
};

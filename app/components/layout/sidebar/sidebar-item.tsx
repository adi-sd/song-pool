import Link from "next/link";

// Styling
import { IconType } from "react-icons";

interface SideBarItemProps {
    icon: IconType;
    name: string;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ icon: Icon, name }) => {
    return (
        <Link className="flex items-center gap-x-5 ml-10 mb-2" href={`/${name.toLowerCase()}`}>
            <Icon size={35}></Icon>
            <span className="flex-1 text-[25px]">{name}</span>
        </Link>
    );
};

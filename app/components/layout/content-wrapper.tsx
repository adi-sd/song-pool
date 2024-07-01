import { ReactNode } from "react";

// Components
import { SideBar } from "./sidebar/sidebar";
import { Main } from "./main/main";

interface ContentWrapperProps {
    children: ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <div className="flex h-full w-full">
            <SideBar className="w-[400px] p-4 pt-[50px]"></SideBar>
            <Main className="flex-1 p-4 pt-[50px]">{children}</Main>
        </div>
    );
};

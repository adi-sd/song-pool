import { ReactNode } from "react";

// Components
import { SideBar } from "./sidebar/sidebar";
import { Main } from "./main/main";
import { NavBar } from "./navbar/navbar";

interface ContentWrapperProps {
    children: ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <div className="flex h-full w-full">
            <SideBar className="h-full w-[20%] pt-[50px] px-12"></SideBar>
            <div className="h-full w-[80%] pt-[50px] p-12 bg-sky-50 flex flex-col">
                <NavBar className="h-10"></NavBar>
                <div className="flex-1">
                    <Main className="flex h-full w-full">{children}</Main>
                </div>
            </div>
        </div>
    );
};

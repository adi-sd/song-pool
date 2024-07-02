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
            <SideBar className="w-[450px] pt-[50px] px-12"></SideBar>
            <div className="flex-1 pt-[50px] px-12 bg-sky-50">
                <NavBar></NavBar>
                <div className="h-[88%]">
                    <Main className="flex h-full w-full">{children}</Main>
                </div>
            </div>
        </div>
    );
};

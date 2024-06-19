import { FunctionComponent } from "react";

type LoginModalProps = {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
};

export type LoginModalComponent = FunctionComponent<LoginModalProps>;

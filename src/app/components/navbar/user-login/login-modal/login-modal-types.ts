import { FunctionComponent } from "react";

type LoginModalProps = {
    handleShowModal: () => void;
    url: string;
};

export type LoginModalComponent = FunctionComponent<LoginModalProps>;

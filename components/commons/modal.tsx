import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-white/10 backdrop-blur-sm fixed inset-0"></Dialog.Overlay>
                <Dialog.Content className="fixed drop-shadow-xl border border-white top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-[60px] px-[25px] focus:outline-none">
                    <Dialog.Title className="text-5xl text-center font-semibold mb-6">{title}</Dialog.Title>
                    <Dialog.Description className="mb-5 text-xl leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div className="text-3xl font-semibold">{children}</div>
                    <Dialog.Close asChild>
                        <button className="text-neutral-500 hover:text-black absolute top-1 right-1 h-[40px] w-[40px] appearance-none flex items-center justify-center rounded-full focus:outline-none">
                            <IoMdClose size={20}></IoMdClose>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;

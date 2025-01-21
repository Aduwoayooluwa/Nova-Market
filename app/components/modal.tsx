"use client";

import { FC, ReactNode } from "react";
import { Modal as Mdal } from "antd";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Mdal open={isOpen} 
       animation={true }
       cancelButtonProps={{ style: { display: 'none' } }} 
       onCancel={onClose} onClose={onClose} 
       okButtonProps={{ style: { display: 'none' } }}>
      { children }
    </Mdal>
  );
};

export default Modal; 
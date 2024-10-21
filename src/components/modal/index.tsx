import React, { ReactNode } from "react";
import { Modal } from "antd";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
}

const Modals = ({ children, open, setOpen, type }: Props) => {
  
  return (
    <div>
      <Modal
        title=""
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
        className={`xl:!w-[40%] md:!w-[50%] !w-[90%]`}
        closable={false}
        destroyOnClose
      >
        {children}
      </Modal>
    </div>
  );
};

export default Modals;

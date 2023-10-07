import { Modal, ModalContent } from "@chakra-ui/modal";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import React from "react";

interface ImageDetailModalProps {
  imageDetails: string[];
  onClose: () => void;
}
export default function ImageDetailModal({
  imageDetails,
  onClose,
}: ImageDetailModalProps) {
  return (
    <Modal isOpen={!!imageDetails} onClose={onClose} size="full">
      <ModalContent
        onClick={onClose}
        className="flex-center relative bg-black bg-opacity-50 px-16px"
      >
        <button className="flex-center absolute right-0 top-0 h-60px w-60px text-24px text-white">
          <IoMdClose />
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[1258px] bg-white"
        >
          <Image
            src={imageDetails[0]}
            alt={""}
            width={1200}
            height={800}
            className="w-full"
          />
        </div>
      </ModalContent>
    </Modal>
  );
}

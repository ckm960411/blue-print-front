"use client";

import { login, LoginReqDto } from "@/utils/services/user";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Modal, ModalFooter } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface LoginButtonProps {}
export default function LoginButton({}: LoginButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginRequest } = useMutation(
    ["login", email, password],
    (loginReqDto: LoginReqDto) => login(loginReqDto),
    {
      onSuccess: ({ accessToken }) => {
        localStorage.setItem("token", accessToken);
        setEmail("");
        setPassword("");
        onClose();
      },
      onError: console.error,
    },
  );

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;
    loginRequest({ email, password });
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="h-42px w-76px rounded-10px border border-gray-200 text-16px font-medium duration-200 hover:bg-main hover:text-white hover:shadow-lg"
      >
        로그인
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-16px">
            <div>
              <p className="text-18px font-bold text-gray-800">이메일</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="mt-8px w-full rounded-md border border-gray-200 px-8px py-12px text-16px"
              />
            </div>
            <div>
              <p className="text-18px font-bold text-gray-800">패스워드</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드를 입력하세요"
                className="mt-8px w-full rounded-md border border-gray-200 px-8px py-12px text-16px"
              />
            </div>
          </ModalBody>

          <ModalFooter className="gap-16px">
            <button
              onClick={onClose}
              className="rounded-md px-12px py-8px text-16px font-semibold duration-200 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleLogin}
              className="rounded-md px-12px py-8px text-16px font-semibold duration-200 hover:bg-main hover:text-white"
            >
              로그인
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

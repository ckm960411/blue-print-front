"use client";

import { meState } from "@/utils/recoil/store";
import { getMe, login, LoginReqDto } from "@/utils/services/user";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Modal, ModalFooter } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface LoginButtonProps {}
export default function LoginButton({}: LoginButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [me, setMe] = useRecoilState(meState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: loginRequest } = useMutation(
    ["login", email, password],
    (loginReqDto: LoginReqDto) => login(loginReqDto),
  );

  const resetAndClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      await loginRequest({ email, password }).then(({ accessToken }) => {
        localStorage.setItem("token", accessToken);
      });
      const meData = await getMe();
      setMe(meData);
      resetAndClose();
    } catch {
      resetAndClose();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe().then(setMe).catch(console.error);
    }
  }, []);

  return (
    <>
      <button
        onClick={onOpen}
        className="h-42px w-76px rounded-10px border border-gray-200 text-16px font-medium duration-200 hover:bg-main hover:text-white hover:shadow-lg"
      >
        {me ? "로그아웃" : "로그인"}
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

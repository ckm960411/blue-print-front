"use client";

import { WEB_STORAGE_KEY } from "@/utils/common/constant";
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

  const handleLogin = async (type?: "guest") => {
    if (!email.trim() || !password.trim()) return;
    const isGuest = type === "guest";
    try {
      await loginRequest({
        email: isGuest ? process.env.NEXT_PUBLIC_GUEST_EMAIL! : email,
        password: isGuest ? process.env.NEXT_PUBLIC_GUEST_PASSWORD! : password,
      }).then(({ accessToken }) => {
        localStorage.setItem(WEB_STORAGE_KEY.TOKEN, accessToken);
      });
      const meData = await getMe();
      setMe(meData);
      resetAndClose();
    } catch {
      resetAndClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(WEB_STORAGE_KEY.TOKEN);
    setMe(undefined);
    resetAndClose();
  };

  useEffect(() => {
    const token = localStorage.getItem(WEB_STORAGE_KEY.TOKEN);
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
          <ModalHeader>{me ? "로그아웃" : "로그인"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {me ? (
              <div className="text-16px font-medium text-gray-800">
                정말 로그아웃 하시겠습니까?
              </div>
            ) : (
              <div className="flex flex-col gap-16px">
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
              </div>
            )}
          </ModalBody>

          <ModalFooter className="justify-between gap-16px">
            {!!me || (
              <button
                onClick={() => handleLogin("guest")}
                className="text-14px font-medium underline duration-200 hover:text-main"
              >
                게스트 계정으로 로그인
              </button>
            )}
            <div className="flex items-center gap-16px">
              <button
                onClick={onClose}
                className="rounded-md px-12px py-8px text-16px font-semibold duration-200 hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={me ? handleLogout : () => handleLogin()}
                className="rounded-md px-12px py-8px text-16px font-semibold duration-200 hover:bg-main hover:text-white"
              >
                {me ? "로그아웃" : "로그인"}
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

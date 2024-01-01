"use client";

import SettingBalanceModal from "@/components/money/SettingBalanceModal";
import { getRemainPayday } from "@/utils/common/money/getRemainPayday";
import { QueryKeys } from "@/utils/common/query-keys";
import { useMe } from "@/utils/common/user/useMe";
import { useTotalMonthlyExpenditures } from "@/utils/hooks/react-query/money/useTotalMonthlyExpenditures";
import { getBalance } from "@/utils/services/money";
import { useDisclosure } from "@chakra-ui/hooks";
import { getMonth, getYear } from "date-fns";
import { IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "react-query";

export default function MoneyCreditCard() {
  const me = useMe();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const remainPayday = getRemainPayday();
  const { spending } = useTotalMonthlyExpenditures(
    getYear(new Date()),
    getMonth(new Date()) + 1,
  );
  const { data: { balance } = { balance: 0 } } = useQuery(
    QueryKeys.getBalance(me?.id),
    getBalance,
    { onError: console.error },
  );

  return (
    <>
      {isOpen && (
        <SettingBalanceModal
          isOpen={isOpen}
          balance={balance}
          onClose={onClose}
        />
      )}

      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-60px bg-main" />
        <div className="flex-center relative z-10 px-16px">
          <div className="w-full max-w-[320px] overflow-hidden rounded-10px bg-slate-50 text-14px text-gray-800 shadow-md">
            <div className="flex-end h-16px p-8px text-10px font-medium">
              경민은행
            </div>
            <div className="flex-end h-32px gap-4px bg-gray-700 px-6px text-white">
              <p className="text-14px font-semibold">
                남은 잔고: {balance ? balance.toLocaleString() : 0} 원
              </p>
              <button onClick={onOpen} className="p-4px">
                <IoSettingsOutline />
              </button>
            </div>
            <div className="flex h-96px flex-col justify-between p-8px">
              <div className="flex flex-col gap-8px">
                <p className="text-12px text-gray-600">이번달 지출액</p>
                <p className="text-18px font-bold">
                  {spending.toLocaleString()}원
                </p>
              </div>
              <div>
                <p className="text-12px text-gray-700">
                  월급날까지 {remainPayday}일
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

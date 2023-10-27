import { post } from "@/app/api/axios";

export interface LoginReqDto {
  email: string;
  password: string;
}
export const login = async (loginReqDto: LoginReqDto) => {
  const { data } = await post<{ accessToken: string }>(
    `auth/login`,
    loginReqDto,
  );
  return data;
};

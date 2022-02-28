import { post } from '@/utils/axios';

export type ApiUser = {
  id: number;
};
type ApiLoginResponse = null | ApiUser;

export function login({
  account,
  password,
}: {
  account: string;
  password: string;
}) {
  return post<ApiLoginResponse>('/login', {
    account,
    password,
  });
}

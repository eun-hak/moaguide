import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUserInfo {
  memberEmail: string;
  memberNickName: string;
  memberPhone: string;
  subscribe: string;
}

interface IMember {
  member: IUserInfo;
}

export const useMemberStore = create(
  persist<IMember>(
    (set) => ({
      member: {
        memberEmail: 'kemi@kakao.com',
        memberNickName: '더스틴 조하',
        memberPhone: '010-1234-1234',
        subscribe: '1개월 플랜'
      }
    }),
    {
      name: 'userInfo'
    }
  )
);
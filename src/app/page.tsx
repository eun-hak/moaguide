'use client';

import Navbar from '@/components/common/Navbar';
import HomeIndex from '@/components/home/Index';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/userAuth.store';
import { useMemberStore } from '@/store/user.store';
import { setCookie } from '@/utils/cookie';
import { setToken } from '@/utils/localStorage';

const HomePage = () => {
  const { setIsLoggedIn } = useAuthStore();
  const { setMember } = useMemberStore();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    const accessToken = urlParams.get('access');
  
    if (userParam && accessToken) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        
        const user = JSON.parse(parsedUser.user); 
        setToken(accessToken);
  
        setMember({
          memberEmail: user.email,
          memberNickName: user.nickname,
          memberPhone: user.phoneNumber,
          loginType: user.loginType,
          marketing: user.marketing
        });
  
        setIsLoggedIn(true);
        router.push('/');
      } catch (error) {
        console.error('유저 정보 처리 오류:', error);
      }
    }
  }, [router, setIsLoggedIn, setMember]);

  return (
    <div>
      <Navbar />
      <HomeIndex />
    </div>
  );
};

export default HomePage;
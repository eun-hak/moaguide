'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Step1 from '@/components/signup/Step1';
import Step2 from '@/components/signup/Step2';
import Step3 from '@/components/signup/Step3';
import Step4 from '@/components/signup/Step4';
import { finalSignup } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from '@/utils/cookie';
import { useAuthStore } from '@/store/userAuth.store';

const SignupPage: React.FC = () => {
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);  
  const [formData, setFormData] = useState<{
    email?: string;
    name?: string;
    password?: string;
    phoneNumber?: string;
    nickname?: string;
    birthDate?: string;
    investmentExperience?: string;
    marketingConsent?: boolean;
    loginType: 'local' | 'social' | 'naver' | 'google' | 'kakao';  
  }>({
    loginType: 'local',
  });

  const router = useRouter();

  const { isLoggedIn } = useAuthStore();  

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verifyToken = searchParams.get('verify');
    const email = searchParams.get('email');
    const loginType = searchParams.get('loginType') as 'naver' | 'google' | 'kakao' | null;  
    
    if (verifyToken && email && loginType && !isSocialLogin) {
      setIsSocialLogin(true);
      setFormData((prev) => ({
        ...prev,
        email,
        loginType, 
      }));

      setCookie('access_token', verifyToken);

      setCurrentStep(4); 
    }
  }, [isSocialLogin]);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleUpdate = (data: Partial<typeof formData>) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...data };
      
      if (JSON.stringify(prev) === JSON.stringify(updatedFormData)) {
        return prev;
      }
  
      return updatedFormData;
    });
  };
  
  const handleSubmit = async () => {
    try {
      const accessToken = getCookie('access_token');

      if (!accessToken) {
        throw new Error('Access token이 없습니다.');
      }

      const authHeaders = {
        cookie: '',
        Verify: accessToken,
      };

      await finalSignup(formData, authHeaders);
      router.push('/');
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  };

  return (
    <Suspense fallback={<div></div>}>
      <div className={`flex flex-col items-center justify-center max-h-screen`}>
        {currentStep === 1 && (
          <Step1 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 2 && (
          <Step2 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 3 && (
          <Step3 onNext={handleNext} onUpdate={(data) => handleUpdate(data)} />
        )}
        {currentStep === 4 && (
          <Step4 onNext={handleSubmit} onUpdate={(data) => handleUpdate(data)} />
        )}
      </div>
    </Suspense>
  );
};

export default SignupPage;
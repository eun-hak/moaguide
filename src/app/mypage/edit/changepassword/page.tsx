'use client';

import CertifyPassword from '@/components/mypage/CertifyPassword';
import NewPassword from '@/components/mypage/NewPassword';
import PasswordChangeSuccess from '@/components/mypage/PasswordChangeSuccess';
import { useAuthStore } from '@/store/userAuth.store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='min-h-[calc(100dvh-160px)] mb-[20px] sm:mb-0'>
      <div className="w-[90%] mt-5 w-full mx-auto max-w-[340px] sm:max-w-[640px] sm:mt-10 sm:px-0">
        {step === 2 ? null : (
          <div onClick={() => router.back()} className="py-[14px]">
            <img
              src="/images/mypage/left_password.svg"
              alt=""
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <section className="w-[90%] max-w-[340px] w-full mx-auto mt-0 sm:mt-[76px]">
        {step === 0 ? <CertifyPassword setStep={setStep} /> : null}
        {step === 1 ? <NewPassword setStep={setStep} /> : null}
        {step === 2 ? <PasswordChangeSuccess /> : null}
      </section>
    </div>
  );
};

export default ChangePasswordPage;

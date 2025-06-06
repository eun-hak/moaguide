'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const MobileFooter = () => {
  const router = useRouter();
  const pathname = usePathname(); // 추가된 부분
  if (pathname.startsWith('/quiz/')) return null;
  console.log(pathname);
  return (
    <div
      className={`sm:hidden z-[999999] ${pathname === '/mypage/cardmanagement' ? 'fixed' : 'sticky'} bottom-0 pt-[14px] pb-[18px] px-[6px] flex items-center border-t border-gray100 bg-white w-full `}>
      <div
        onClick={() => router.push('/')}
        className="flex-1 flex flex-col gap-1 items-center">
        <div>
          <img
            src={`${pathname === '/' ? '/images/footer/home_active.svg' : '/images/footer/home.svg'}`}
            alt=""
          />
        </div>
        <div className="text-caption1 text-gray300">홈</div>
      </div>
      <div
        onClick={() => {
          router.push('/newissue');
        }}
        className="flex-1 flex flex-col gap-1 items-center">
        <div>
          <img
            src={`${pathname.includes('/newissue') ? '/images/footer/issue_active.svg' : '/images/footer/issue.svg'}`}
            alt=""
          />
        </div>
        <div className="text-caption1 text-gray300">최신 이슈</div>
      </div>
      <div
        onClick={() => {
          router.push('/product');
        }}
        className="flex-1 flex flex-col gap-1 items-center">
        <div>
          <img
            src={`${pathname.includes('/product') ? '/images/footer/item_active.svg' : '/images/footer/item.svg'}`}
            alt=""
          />
        </div>
        <div className="text-caption1 text-gray300">조각투자 상품</div>
      </div>
      <div
        onClick={() => {
          router.push('/learning');
        }}
        className="flex-1 flex flex-col gap-1 items-center">
        <div>
          <img
            src={`${pathname.includes('/learning') ? '/images/footer/practice_active.svg' : '/images/footer/practice.svg'}`}
            alt=""
          />
        </div>
        <div className="text-caption1 text-gray300">학습하기</div>
      </div>
      <div
        onClick={() => router.push('/mypage')}
        className="flex-1 flex flex-col gap-1 items-center">
        <div>
          <img
            src={`${pathname.includes('/mypage') ? '/images/footer/mypage_active.svg' : '/images/footer/mypage.svg'}`}
            alt=""
          />
        </div>
        <div className="text-caption1 text-gray300">마이페이지</div>
      </div>
    </div>
  );
};

export default MobileFooter;

'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full flex justify-center items-center mt-12 mb-12">
      <button
        onClick={handleBack}
        className="mx-auto w-[90%] h-[60px] sm:w-[220px] sm:h-[70px] bg-[#b4b4b4] rounded-[64px] flex justify-center items-center gap-2.5"
      >
        <span className="text-white text-xl font-semibold font-['Pretendard'] leading-7 tracking-wide">
          목록
        </span>
      </button>
    </div>
  );
};

export default BackButton;
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PrivacyModal from './modal/PrivacyModal';
import ServiceModal from './modal/ServiceModal';
import MarketingModal from './modal/MarketingModal';

interface StepProps {
  onNext: () => void;
  onUpdate: (data: { marketingConsent: number }) => void; 
}

const Step1: React.FC<StepProps> = ({ onNext, onUpdate }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    privacy: false,
    service: false,
    marketing: false,
  });
  const [activePage, setActivePage] = useState<string | null>(null);
  const router = useRouter();

  const handleAllCheckedChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setChecks({
      privacy: newCheckedState,
      service: newCheckedState,
      marketing: newCheckedState,
    });
    onUpdate({ marketingConsent: newCheckedState ? 3 : 0 });
  };

  const handleCheckChange = (key: string) => {
    const newChecks = { ...checks, [key]: !checks[key as keyof typeof checks] };
    setChecks(newChecks);
    setAllChecked(Object.values(newChecks).every(Boolean));
    if (key === 'marketing') {
      onUpdate({ marketingConsent: newChecks.marketing ? 3 : 0 });
    }
  };

  const handleArrowClick = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActivePage(key);
  };

  const closePage = () => {
    setActivePage(null);
  };

  const isNextEnabled = checks.privacy && checks.service;

  return (
    <div className="max-w-[330px] min-h-[calc(100dvh-75.5px)] flex flex-col items-center justify-between sm:min-h-[100vh] sm:justify-center">
      <section className="w-full mx-auto mt-[30px] sm:mt-0">
        <div style={{ width: '24px', height: '24px' }}>
          <Image
            src={'/sign/LeftArrowIcon.svg'}
            alt='뒤로가기'
            width={24}
            height={24}
            placeholder="blur"
            priority
            blurDataURL="/sign/LeftArrowIcon.svg"
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        </div>

        <div className="w-[100%] sm:w-[330px] max-w-[330px] h-[20px] mx-auto">
          <Image
            className="mt-6 mb-6"
            src={'/sign/ProgressBar1.svg'}
            alt="ProgressBar"
            width={330}
            height={100}
            placeholder="blur"
            priority
            blurDataURL="/sign/ProgressBar1.svg"
          />
        </div>

        <h2 className="text-xl font-bold mb-6 text-left">
          회원가입을 위해<br />
          <span className="text-purple-600">이용약관에 동의</span>해주세요
        </h2>

        <div>
          <div
            onClick={handleAllCheckedChange}
            className={`flex items-center p-4 border rounded-lg cursor-pointer ${
              allChecked ? 'border-purple-600' : 'border-gray-300'
            }`}
          >
            <Image
              src={allChecked ? '/sign/CheckedCircle.svg' : '/sign/CheckCircle.svg'}
              alt="All Agree"
              width={24}
              height={24}
              placeholder="blur"
              priority
              blurDataURL="/sign/CheckCircle.svg"
            />
            <span className="ml-2 font-medium">모두 동의합니다</span>
          </div>

          {['privacy', 'service', 'marketing'].map((key, index) => (
            <div
              key={key}
              className="flex items-center justify-between py-4 rounded-lg cursor-pointer"
              onClick={() => handleCheckChange(key)}
            >
              <div className="flex items-center">
                <Image
                  src={checks[key as keyof typeof checks] ? '/sign/Checked.svg' : '/sign/Check.svg'}
                  alt={`${key} checkbox`}
                  width={24}
                  height={24}
                  placeholder="blur"
                  priority
                  blurDataURL="/sign/Check.svg"
                />
                <span className="ml-2 font-medium">
                  {index < 2 ? `[필수] ` : `[선택] `}
                  {key === 'privacy' && '개인정보 수집 / 이용동의'}
                  {key === 'service' && '서비스 이용 동의'}
                  {key === 'marketing' && '마케팅 메시지 수신 동의'}
                </span>
              </div>
              <Image
                src="/sign/Arrow.svg"
                alt="Arrow"
                width={24}
                height={24}
                onClick={(event) => handleArrowClick(key, event)}
                placeholder="blur"
                priority
                blurDataURL="/sign/Arrow.svg"
              />
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={onNext}
        className={`w-full sm:max-w-[330px] py-3 rounded-[12px] font-bold text-lg transition duration-300 mt-0 sm:mt-[40px] mb-[20px] sm:mb-0 ${
          isNextEnabled
            ? 'bg-gradient2 text-white hover:bg-purple-700'
            : 'bg-gray100 text-heading4 text-gray400 cursor-not-allowed'
        }`}
        disabled={!isNextEnabled}
      >
        다음으로
      </button>

      {activePage === 'privacy' && <PrivacyModal onClose={closePage} />}
      {activePage === 'service' && <ServiceModal onClose={closePage} />}
      {activePage === 'marketing' && <MarketingModal onClose={closePage} />}
    </div>
  );
};

export default Step1;
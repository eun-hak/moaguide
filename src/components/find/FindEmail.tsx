import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { sendVerificationCode, verifyCode } from '@/service/auth';
import Image from 'next/image';
import { validNumberToTime } from '@/utils/validNumberToTime';

const FindEmail = ({ onEmailFound }: { onEmailFound: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // 전화번호
  const [phoneNumberValid, setPhoneNumberValid] = useState(false); // 전화번호 유효성 검사
  const [isRequest, setIsRequest] = useState(false); // 전화번호 입력 후 인증요청 상태
  const [validNumber, setValidNumber] = useState<string>(''); // 인증번호
  const [validNumberOk, setValidNumberOk] = useState(false); // 인증번호 유효성 검사
  const [isComplete, setIsComplete] = useState(false); // 인증번호 인증 성공
  const [isError, setIsError] = useState(false); // 인증번호 인증 실패
  const [validTime, setValidTime] = useState<number>(300); // 인증 시간
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(regex);
  };

  const handleValidNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setValidNumber(regex);
  };

  const handleRequest = async () => {
    try {
      const data = await sendVerificationCode(phoneNumber);
      console.log('인증 요청 성공:', data);
      setIsRequest(true); // 요청 상태 true
      setValidTime(300); // 인증 요청 시 타이머 초기화
    } catch (error) {
      console.error('인증 요청 실패:', error);
      setIsRequest(false); // 요청 실패 시 상태 초기화
    }
  };

  const handleResending = async () => {
    if (isComplete) return;
    try {
      const data = await sendVerificationCode(phoneNumber);
      console.log('인증 재요청 성공:', data);
      setValidNumber('');
      inputRef.current?.focus();
      setIsRequest(true); // 요청 상태 true
      setValidTime(300); // 인증 요청 시 타이머 초기화
    } catch (error) {
      console.error('인증 재요청 실패:', error);
    }
  };

  const handleCertify = async () => {
    if (isComplete) return; // 이미 인증 완료된 상태면 return
    try {
      const data = await verifyCode(phoneNumber, validNumber);
      console.log('인증 완료:', data);
      setIsComplete(true); // 인증 검사 통과
      setIsError(false);
    } catch (error) {
      console.error('인증 실패:', error);
      setIsError(true); // 인증 검사 실패
    }
  };

  const handleComplete = () => {
    if (isComplete) {
      onEmailFound(); 
    }
  };

  useEffect(() => {
    if (phoneNumber.length === 13) {
      setPhoneNumberValid(true);
    } else {
      setPhoneNumberValid(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (validNumber.length === 6) {
      setValidNumberOk(true);
    } else {
      setValidNumberOk(false);
    }
  }, [validNumber]);

  useEffect(() => {
    if (isRequest) {
      inputRef.current?.focus();
    }
  }, [isRequest]);

  useEffect(() => {
    if (isRequest && validTime > 0 && !isComplete) {
      const intervalId = setInterval(() => {
        setValidTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else if (validTime === 0) {
      setIsRequest(false);
    }
  }, [isRequest, validTime, isComplete]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isError) {
      setValidNumber('');
      inputRef.current?.focus();
      timeoutId = setTimeout(() => {
        setIsError(false);
      }, 4000);
    }
    return () => clearTimeout(timeoutId);
  }, [isError]);

  return (
    <div className='find-inner-container flex flex-col items-center min-h-[calc(100vh-220px)] w-[340px]'>
      <section className="w-full mx-auto mt-[30px]">
        <div className="text-heading3">
          <h2 className="text-xl font-bold mb-6 text-left">
            휴대폰 번호를<br />
            인증해주세요
          </h2>
        </div>
        {/* 휴대폰 번호 입력 */}
        <div className="mt-10">
          <div className="text-body3">휴대폰 번호</div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              disabled={isRequest}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="휴대폰 번호 입력"
              className="flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2"
            />
            {phoneNumberValid ? (
              isRequest ? (
                <div
                  onClick={handleResending}
                  className={`ml-[6px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2
                  ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  재전송
                </div>
              ) : (
                <div
                  onClick={handleRequest}
                  className="ml-[6px] flex-shrink-0 cursor-pointer px-4 py-[14px] bg-black rounded-[12px] text-white text-title2"
                >
                  인증 요청
                </div>
              )
            ) : (
              <div className="ml-[6px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
                인증 요청
              </div>
            )}
          </div>
        </div>

        {/* 인증번호 입력 */}
        <div className="mt-[28px]">
          <div className="text-body3">인증번호</div>
          <div className="flex items-center mt-2">
            <input
              ref={inputRef}
              value={validNumber}
              disabled={!isRequest || validTime === 0 || isComplete}
              onChange={handleValidNumberChange}
              type="text"
              placeholder="인증 번호 입력"
              className="flex-1 min-w-0 px-4 py-[14px] bg-bg rounded-[12px] outline-none text-body2"
            />
            {isRequest && validNumberOk ? (
              <div
                onClick={handleCertify}
                className={`ml-[8px] flex-shrink-0 px-4 py-[14px] bg-black rounded-[12px] text-white text-title2
                ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                인증 완료
              </div>
            ) : (
              <div className="ml-[8px] flex-shrink-0 px-4 py-[14px] bg-gray100 rounded-[12px] text-gray400 text-title2">
                인증 완료
              </div>
            )}
          </div>
          {/* 남은 시간 또는 인증 완료 및 에러 메시지 */}
          {isRequest ? (
            <div
              className={`text-body7 text-normal mt-[10px]
            ${isComplete && 'hidden'}
            ${isError && 'hidden'}
            `}
            >
              남은시간 : {validNumberToTime(validTime)}
            </div>
          ) : null}
          {isComplete && (
            <div className="text-body7 text-success mt-[10px]">
              인증이 완료되었습니다.
            </div>
          )}
          {isError && (
            <div className="text-body7 text-error mt-[10px]">
              인증번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        </section>
        <div className='w-full max-w-[340px]'>
        {isComplete ? (
          <div
            onClick={handleComplete}
            className="cursor-pointer flex items-center justify-center px-5 py-3 mt-[60px] w-full rounded-[12px] font-bold text-lg bg-gradient2 text-heading4 text-white"
          >
            다음으로
          </div>
        ) : (
          <div className="flex items-center justify-center px-5 py-3 mt-[60px] w-full rounded-[12px] font-bold text-lg bg-gray100 text-heading4 text-gray400">
            다음으로
          </div>
        )}
        </div>
    </div>
  );
};

export default FindEmail;
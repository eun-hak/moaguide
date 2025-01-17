'use client';
import { getCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Line } from '../../../components/common/Line';
import { usePaymentStatus, usePaymentList } from '@/factory/Payment/paymentcheck';
import { formatDate } from '@/utils/FormatDate';
import { SubscribedInfo } from '@/utils/subscribedDate';
import { SubscribedStatus } from '@/utils/subscribedStatus';
const NotPaymentIndex = () => {
  const { Subscribestatus } = SubscribedStatus();
  console.log(Subscribestatus);
  const { data, isLoading } = usePaymentStatus();
  const { data: paymentListData, isLoading: paymentListLoading } = usePaymentList();
  const { SubScribedDate, SubScribedPrice } = SubscribedInfo();

  const router = useRouter();
  const startDate = data?.date.startDate;
  const endDate = data?.date.endDate;
  const nextPaymentDate = data?.date.paymentDate;

  const StartDate = startDate ? formatDate(startDate) : '';
  const EndDate = endDate ? formatDate(endDate) : '';
  const PaymentDate = nextPaymentDate ? formatDate(nextPaymentDate) : '';

  return (
    <div className="px-5 pb-20 sm:px-0 sm:pb-0">
      {/* 뒤로가기 */}
      <div onClick={() => router.back()} className="pb-[14px] cursor-pointer max-w-max">
        <img src="/images/payment/back.svg" alt="" />
      </div>
      <div className="text-xl py-[20px]  font-bold">구독 관리</div>

      <div className="w-full max-w-[640px] px-[25px] py-[20px] flex items-center justify-between bg-gradient rounded-[12px] mb-[5px] text-white">
        <div className="font-bold">{SubScribedDate}</div>
        <div>월 {SubScribedPrice?.toLocaleString()}원</div>
      </div>
      {Subscribestatus === 'unsubscribing' ? (
        <div
          className=" w-full max-w-[640px] py-[8px] text-gray-400 border-[1px] mt-2 border-gray-300 flex justify-center items-center rounded-[12px] cursor-pointer"
          onClick={() => router.push('/payment/check')}>
          다시 구독하기
        </div>
      ) : Subscribestatus == 'subscribed' ? (
        <div
          className=" w-full max-w-[640px] py-[8px] text-gray-400 border-[1px] mt-2 border-gray-300 flex justify-center items-center rounded-[12px] cursor-pointer"
          onClick={() => router.push('/payment/cancelsubscription')}>
          구독 해지
        </div>
      ) : undefined}

      <div>
        <div className=" flex justify-between items-center py-[20px]">
          <div>구독 시작일</div>
          <div>{StartDate}</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[20px]">
          <div>구독 만료일</div>
          <div>{EndDate}</div>
        </div>
        <Line />
        <div className=" flex justify-between items-center py-[20px]">
          <div>다음 결제일</div>
          <div>{PaymentDate}</div>
        </div>
      </div>

      <div className={`mt-[30px]   w-atuo h-[2px] border border-[#c3c5c8] `} />

      <div className="text-xl mt-[40px] mb-[30px] font-bold">결제 내역</div>

      {paymentListData?.log.map((item, index) => {
        const PaymentAmount = item?.totalAmount;
        const PaymentDate = formatDate(item?.requestedAt);
        const OrderName = item?.orderName;
        return (
          <div key={item.id}>
            <div className="flex flex-col py-[20px]">
              <div className="flex justify-between ">
                <div className="text-gray-400">{OrderName}</div>
                <div className="flex flex-col ">
                  <div className="mb-[10px] text-gray-400">{PaymentDate} 결제</div>
                  <div className="flex justify-end">{PaymentAmount}원</div>
                </div>
              </div>
            </div>
            <Line />
          </div>
        );
      })}
    </div>
  );
};

export default NotPaymentIndex;

import Image from 'next/image';
import Container from '@/components/common/Container';
import { IProductRecruitmentData } from '@/types/Diviend';
import ProductPagenation from '../pagenation/ProductPagenation';
import Link from 'next/link';
import ProductMobilePagenation from '../pagenation/ProductMobilePagenation';
import { CATEGORY } from '@/static/category';
import { useSearchParams } from 'next/navigation';
import { useAddBookMark, useDeleteBookMark } from '@/factory/BookMark';
import { useState } from 'react';

interface IProductContentListProps {
  content: IProductRecruitmentData['product'];
  totalPages: IProductRecruitmentData['totalPages'];
  pageNumber: IProductRecruitmentData['pageable']['pageNumber'];
}
const ProductRecruitmentContentList = ({
  content,
  totalPages,
  pageNumber
}: IProductContentListProps) => {
  const searchParams = useSearchParams();
  const sorted = searchParams.get('sort');

  // 날짜 계산 함수 (D-Day)
  const calculateDateDifference = (date: string) => {
    const currentDate = new Date();
    const target = new Date(date);
    const timeDifference = target.getTime() - currentDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (dayDifference > 0) {
      return `D-${dayDifference}`;
    } else if (dayDifference === 0) {
      return 'D-Day';
    } else {
      return `D+${Math.abs(dayDifference)}`;
    }
  };

  // product_Id

  // const addmutation = useAddBookMark();
  // const deletemutation = useDeleteBookMark();
  // const [localContent, setLocalContent] = useState(content);

  // const handleBookmarkClick = (productId: string, bookmark: boolean) => {
  //   // 낙관적 업데이트를 위해 로컬 상태를 먼저 변경합니다.
  //   setLocalContent((prevContent) =>
  //     prevContent.map((item) =>
  //       item.productId === productId && !bookmark
  //         ? { ...item, bookmark: !bookmark }
  //         : item.productId === productId && bookmark
  //           ? { ...item, bookmark: !bookmark }
  //           : item
  //     )
  //   );
  //   if (!bookmark) {
  //     addmutation.mutate({ productId, bookmark });
  //   } else if (bookmark) {
  //     deletemutation.mutate({ productId });
  //   }
  // };

  return (
    <div>
      <Container>
        <div className="flex flex-row   desk:hidden  md:flex ml-[20px]  ">
          <div className="w-[62px] mr-[16px] ml-[10px] text-gray-500 ">이미지</div>
          <div className="w-[60px] mr-[16px] text-gray-500 ">카테고리</div>
          <div className="w-[100px] mr-[16px] text-gray-500 ">운영 플랫폼</div>
          <div className="w-[260px] mr-[16px] text-gray-500 ">종목 명</div>
          <div className="w-[98px] mr-[42px]  text-gray-500">현재가</div>
          <div className="w-[107px] mr-[32px] text-gray-500 ">모집총액</div>
          {sorted === 'ready' ? (
            <div className="w-[92px] mr-[24px]  text-gray-500 ">예정일</div>
          ) : (
            <div className="w-[92px] mr-[24px]  text-gray-500 ">모집률</div>
          )}

          <div className="w-[24px]  text-gray-500">#</div>
        </div>
      </Container>
      <div className="   desk:hidden  md:flex mt-[10px] mb-[10px] w-atuo h-[0px] border border-[#eceef2]" />

      <Container>
        <div>
          {content?.map((item) => (
            <div
              key={item.productId}
              className=" lg:flex  "
              onClick={() => {
                if (item.sale) {
                  alert('현재는 매각이 완료 된 상품입니다');
                  // console.log(item.sale)
                  window.location.reload();
                }
              }}>
              <Link href={`product/detail/${item.category}/${item.productId}`}>
                <div className="flex items-center  h-[110px] ">
                  <div className="flex  mr-[16px]  desk:ml-[10px] flex-shrink-0 ">
                    <Image
                      src={`https://d2qf2amuam62ps.cloudfront.net/img/${item.productId}.jpg`}
                      width={82}
                      height={82}
                      alt="image"
                      className="object-cover w-[82px] h-[82px] rounded-[8px] "
                    />
                  </div>
                  <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100  flex-shrink-0  desk:hidden  md:flex ">
                    {CATEGORY[item.category]}
                  </div>
                  <div className="w-[100px] mr-[16px]  text-gray-400   desk:hidden  md:flex ">
                    {item.platform}
                  </div>
                  <div className="w-[260px] mr-[16px] text-lg font-bold   desk:hidden  md:flex ">
                    {item.name}
                  </div>

                  {/* /////   반응형  //////////// */}
                  <div className="flex flex-col  md:hidden  desk:flex  ">
                    <div className="flex mb-[5px]">
                      <div className="w-[54px] h-[26px] mr-[16px] flex justify-center items-center rounded-lg text-gray-500  bg-gray-100 ">
                        {CATEGORY[item.category]}
                      </div>
                      <div className="max-w-[100px] mr-[16px]  text-gray-400  whitespace-nowrap">
                        {item.platform}
                      </div>
                    </div>

                    <div className="max-w-[220px] mr-[16px] text-lg font-bold mb-[5px] line-clamp-2 ">
                      {item.name}
                    </div>

                    <div className=" flex  ">
                      <div className=" ml-[4px] mr-[4px] text-gray-500  ">
                        {/* {item.price.toLocaleString()}원 */}
                      </div>
                      {/* <div className="mr-[16px] text-red-500 ">({item.priceRate}%)</div> */}
                    </div>
                  </div>

                  {/* ///// */}

                  <div className=" flex flex-col">
                    <div className="w-[108px] mr-[16px] text-gray-500  desk:hidden  md:flex  ">
                      {/* {item.price.toLocaleString()} 원 */} -
                    </div>
                    <div className="w-[88px] mr-[16px] text-red-500  desk:hidden  md:flex ">
                      {/* ({item.priceRate}%) */}
                    </div>
                  </div>

                  <div className="w-[125px] mr-[28px] text-gray-500    desk:hidden  md:flex ">
                    {item.totalprice.toLocaleString()}원
                  </div>

                  <div className="w-[61px] desk2:mr-[29px] desk:mr-[0px]  text-red-500 bg-red-100  rounded-lg flex justify-center items-center desk: ml-auto ">
                    {sorted === 'ready'
                      ? calculateDateDifference(item.day)
                      : item.recruitmentRate + '%'}
                  </div>
                  <Image
                    src={`${item.bookmark ? '/images/product/BookmarkSimple.svg' : '/images/product/BookmarkWhite.svg'}`}
                    width={24}
                    height={24}
                    alt="Bookmark"
                    className="desk:hidden md:flex cursor-pointer ml-4"
                    // onClick={() => handleBookmarkClick(item.productId, item.bookmark)}
                  />
                </div>
              </Link>

              <div className="  mt-[20px] mb-[20px] w-atuo h-[0px] border border-[#eceef2]" />
            </div>
          ))}
        </div>
        <div className="md:block  desk:hidden">
          <ProductPagenation totalPages={totalPages} />
        </div>
        <div className="md:hidden  desk:block">
          <ProductMobilePagenation totalPages={totalPages} />
        </div>
      </Container>
    </div>
  );
};

export default ProductRecruitmentContentList;

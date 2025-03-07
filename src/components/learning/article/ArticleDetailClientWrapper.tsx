'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleDetailHeader from '@/components/learning/article/ArticleDetailHeader';
import ArticleDetailContent from '@/components/learning/article/ArticleDetailContent';
import RelatedArticles from './RelatedArticles';
import BackButton from './BackButton';
import Image from 'next/image';
import sharedIcon from '../../../../public/images/learning/articleShare.svg';
import likedIcon from '../../../../public/images/learning/articleLiked.svg';
import noLikedIcon from '../../../../public/images/learning/articleNoLike.svg';
import { getArticleDetail } from '@/factory/Article/GetArticle';
import { likeArticle } from '@/factory/Article/ControlLiked';
import { ArticleDetailResponse } from '@/types/learning';
import { useLikeStore } from '@/store/articleLike.store';
import { useAuthStore } from '@/store/userAuth.store';
import { useViewStore } from '@/store/articleView.store';

interface ArticleDetailClientWrapperProps {
  articleId: number;
}

const ArticleDetailClientWrapper = ({ articleId }: ArticleDetailClientWrapperProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const isLoggedInRef = useRef(isLoggedIn);
  const [data, setData] = useState<ArticleDetailResponse | null>(null);
  const { setLikedArticle } = useLikeStore();
  const { setArticleView, getArticleView } = useViewStore();
  const [likedByMe, setLikedByMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedInRef.current) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/sign');
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getArticleDetail(articleId);
        if (result) {
          setData(result);
          setLikedByMe(result.likedByMe);
          // setLikedArticle(articleId, result.likedByMe, result.articleDetail.likes);
  
          // views 업데이트
          const currentViews = getArticleView(articleId) || result.articleDetail.views;
          setArticleView(articleId, currentViews + 1);
        } else {
          console.error('Article data is missing.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [articleId, router, setLikedArticle, setArticleView, getArticleView]);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <div>데이터를 가져오지 못했습니다.</div>;
  }

  const articleDetail = data?.articleDetail;
  const { categoryName, title, createdAt, authorName, imgLink, text, paywallUp } = articleDetail;
  console.log(categoryName);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/learning/detail/${articleId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('URL이 복사되었습니다!');
    } catch (error) {
      console.error('URL 복사 중 오류 발생:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const response = await likeArticle(articleId);
      const updatedLikes = response.liked ? data!.articleDetail.likes + 1 : data!.articleDetail.likes - 1;
      
      setLikedByMe(response.liked);
      setData((prevData) =>
        prevData
          ? {
              ...prevData,
              articleDetail: {
                ...prevData.articleDetail,
                likes: updatedLikes,
              },
            }
          : null
      );
      setLikedArticle(articleId, response.liked, updatedLikes);
    } catch (error) {
      console.error('좋아요 API 호출 실패:', error);
    }
  };

  return (
    <div>
      <ArticleDetailHeader
        categoryName={categoryName || '카테고리 없음'}
        title={title || '제목 없음'}
        createdAt={createdAt || ''}
        authorName={authorName || '작성자 없음'}
        imgLink={imgLink || null}
      />
      <div className="max-w-[1000px] w-[90%] mx-auto py-8 flex items-center justify-between border-b border-[#ececec]">
        <div className="text-sm text-[#a0a0a0]">
          학습하기 &gt; 아티클 &gt; {articleDetail?.categoryName.replace(/[^a-zA-Z0-9가-힣\s]/g, '') || '카테고리 없음'}
        </div>
        <div className="flex items-center gap-4 z-[9999]">
          <Image
            src={likedByMe ? likedIcon : noLikedIcon}
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleLikeToggle}
          />
          <button onClick={handleShare} aria-label="공유하기">
            <Image
              src={sharedIcon}
              alt="공유 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <ArticleDetailContent
        text={text || '내용이 없습니다.'}
        title={title || '제목 없음'}
        paywallUp={paywallUp || ''}
        createdAt={createdAt || ''}
        authorName={authorName || '작성자 없음'}
        imgLink={imgLink || null}
      />
      <RelatedArticles articleId={articleId} />
      <BackButton />
    </div>
  );
};

export default ArticleDetailClientWrapper;
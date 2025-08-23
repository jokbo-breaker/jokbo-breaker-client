import { useEffect, useState, memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/token';
import { useToast } from '@/shared/contexts/ToastContext';
import LoopLoading from './loop-loading';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = memo(function PublicRoute({ children }: PublicRouteProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isChecking, setIsChecking] = useState(true);
  const hasShownToast = useRef(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAccessToken();
        console.log('PublicRoute - 토큰 확인:', token ? '있음' : '없음');
        console.log('PublicRoute - 토큰 값:', token);
        console.log('PublicRoute - 토큰 길이:', token ? token.length : 0);
        
        if (token && token.trim() !== '') {
          console.log('PublicRoute - 이미 로그인됨. 토스트 표시 및 메인으로 리다이렉트');
          
          // 토스트를 한 번만 표시
          if (!hasShownToast.current) {
            showToast('이미 로그인되어 있습니다.', 'info');
            hasShownToast.current = true;
          }
          
          // 토스트가 표시될 시간을 주기 위해 약간의 지연
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);
          setIsChecking(false);
        } else {
          console.log('PublicRoute - 로그인 페이지 표시');
          setIsChecking(false);
        }
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []); // navigate 의존성 제거

  if (isChecking) {
    return <LoopLoading />;
  }

  return <>{children}</>;
});

export default PublicRoute;

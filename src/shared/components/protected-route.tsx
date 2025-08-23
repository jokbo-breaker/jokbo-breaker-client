import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/token';
import LoopLoading from './loop-loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = memo(function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAccessToken();
        console.log('ProtectedRoute - 토큰 확인:', token ? '있음' : '없음');
        
        if (!token || token.trim() === '') {
          console.log('ProtectedRoute - 로그인 페이지로 리다이렉트');
          setIsChecking(false);
          navigate('/login', { replace: true });
        } else {
          console.log('ProtectedRoute - 인증 성공');
          setIsChecking(false);
        }
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
        setIsChecking(false);
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, []); // navigate 의존성 제거

  if (isChecking) {
    return <LoopLoading />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;

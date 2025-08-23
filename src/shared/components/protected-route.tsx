import { useEffect, useState, memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/shared/utils/token';
import { useToast } from '@/shared/contexts/ToastContext';
import LoopLoading from './loop-loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = memo(function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isChecking, setIsChecking] = useState(true);
  const hasShownToast = useRef(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAccessToken();
        console.log('ProtectedRoute - 토큰 확인:', token ? '있음' : '없음');
        console.log('ProtectedRoute - 토큰 값:', token);
        console.log('ProtectedRoute - 토큰 길이:', token ? token.length : 0);

        if (!token || token.trim() === '') {
          console.log('ProtectedRoute - 로그인이 필요합니다. 토스트 표시 및 리다이렉트');
          
          // 토스트를 한 번만 표시
          if (!hasShownToast.current) {
            showToast('로그인이 필요합니다.', 'info');
            hasShownToast.current = true;
          }
          
          // 토스트가 표시될 시간을 주기 위해 약간의 지연
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 100);
          setIsChecking(false);
        } else {
          console.log('ProtectedRoute - 인증 성공');
          setIsChecking(false);
        }
      } catch (error) {
        console.error('인증 확인 중 오류 발생:', error);
        
        if (!hasShownToast.current) {
          showToast('인증 확인 중 오류가 발생했습니다.', 'error');
          hasShownToast.current = true;
        }
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 100);
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

export default ProtectedRoute;

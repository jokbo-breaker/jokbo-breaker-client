import { useToast } from '@/shared/contexts/ToastContext';

export default function DebugToast() {
  const { showToast } = useToast();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      left: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>토스트 테스트:</div>
      <button 
        onClick={() => showToast('테스트 토스트입니다!', 'success')}
        style={{ margin: '5px', padding: '5px', fontSize: '10px' }}
      >
        Success
      </button>
      <button 
        onClick={() => showToast('정보 토스트입니다!', 'info')}
        style={{ margin: '5px', padding: '5px', fontSize: '10px' }}
      >
        Info
      </button>
      <button 
        onClick={() => showToast('에러 토스트입니다!', 'error')}
        style={{ margin: '5px', padding: '5px', fontSize: '10px' }}
      >
        Error
      </button>
    </div>
  );
}

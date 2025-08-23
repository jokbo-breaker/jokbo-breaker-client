import Icon from './icon';
export type ToastType = 'success' | 'info' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
}

const toastStyles = {
  success: {
    icon: <Icon name="toast-success" size={1.1} className="text-white" />,
    iconBg: 'bg-[#769dff]',
    bg: 'bg-gray-800',
  },
  info: {
    icon: <Icon name="toast-info" size={1.1} className="text-white" />,
    iconBg: 'bg-[#DCA048]',
    bg: 'bg-gray-800',
  },
  error: {
    icon: <Icon name="toast-close" size={1.1} className="text-white" />,
    iconBg: 'bg-[#FF5656]',
    bg: 'bg-gray-800',
  },
};

export default function Toast({ type, message }: ToastProps) {
  const { icon, iconBg, bg } = toastStyles[type];

  return (
    <div
      className={`inline-flex w-full items-center gap-[0.8rem] rounded-[8px] px-[1.6rem] py-[1.2rem] shadow-md ${bg}`}
    >
      <div
        className={`flex h-[2rem] w-[2rem] items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <span className="caption2 text-white">{message}</span>
    </div>
  );
}

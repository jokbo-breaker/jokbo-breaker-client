import { renderToString } from 'react-dom/server';
import Icon from '@/shared/components/icon';

export function makeLocationPinHtml(className = 'text-primary') {
  return {
    content: renderToString(
      <div style={{ transform: 'translate(-50%, -100%)' }}>
        <Icon name="location" size={2.4} className={className} ariaHidden />
      </div>,
    ),
  };
}

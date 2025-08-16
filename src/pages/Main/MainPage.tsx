import { useState } from 'react';
import Icon from '@/shared/components/icon';
import SearchTextField from '@/shared/components/search-text-field';

export default function MainPage() {
  const [q, setQ] = useState('');

  return (
    <div className="w-full flex-col gap-4 bg-gray-100">
      <h1 className="text-head1 text-primary">헤드1 22/SB</h1>
      <h2 className="text-head2 text-secondary">헤드2 20/SB</h2>

      <Icon name="home" size={2.4} className="text-black" />

      <SearchTextField
        defaultValue="초기값"
        onSubmit={(v) => console.log('submit(uncontrolled):', v)}
        className="mt-2"
      />
      <SearchTextField
        defaultValue="초기값"
        onSubmit={(v) => console.log('submit(uncontrolled):', v)}
        className="mt-2"
        showSearchIcon={false}
      />

      <div className="text-caption2 text-gray-600">
        현재 값: <span className="text-gray-900">{q || '(비어있음)'}</span>
      </div>
    </div>
  );
}

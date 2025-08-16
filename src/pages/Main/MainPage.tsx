import { useState } from 'react';
import Icon from '@/shared/components/icon';
import SearchTextField from '@/shared/components/text-field/search-text-field';
import TopBar from '@/shared/layouts/top-bar';

export default function MainPage() {
  const [q, setQ] = useState('');

  return (
    <div className="w-full flex-col gap-4 bg-gray-100">
      <h1 className="text-head1 text-primary">헤드1 22/SB</h1>
      <h2 className="text-head2 text-secondary">헤드2 20/SB</h2>

      <Icon name="home" size={2.4} className="text-black" />
      <TopBar title="타이틀" showBack onBack={() => history.back()} />

      <TopBar title="타이틀" showClose onClose={() => console.log('close')} />
      <SearchTextField
        defaultValue="초기값"
        onSubmit={(v) => console.log('submit(uncontrolled):', v)}
        className="mt-2"
        showBackButton={false}
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

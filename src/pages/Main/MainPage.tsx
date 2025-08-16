import Icon from '@/shared/components/common/icon';

export default function MainPage() {
  return (
    <div className="flex gap-4 p-4">
      <h1 className="text-primary-900 text-title-lg">Main</h1>
      <Icon name="home" size={2.4} className="text-accent-500" />
    </div>
  );
}

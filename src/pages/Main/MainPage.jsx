import Icon from '@/shared/components/common/icon';

export default function Example() {
  return (
    <div className="flex gap-4 p-4">
      <h1 className="text-primary-900 text-title-lg">Main</h1>
      <Icon name="home" size={2.4} className="text-purple-500" />
    </div>
  );
}

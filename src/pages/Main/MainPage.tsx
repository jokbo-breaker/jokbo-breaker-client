import Icon from '@/shared/components/common/icon';

export default function MainPage() {
  return (
    <div className="flex-col gap-4 p-4">
      <h1 className="text-head1 text-primary">헤드1 22/SB</h1>
      <h2 className="text-head2 text-secondary">헤드2 20/SB</h2>
      <Icon name="home" size={2.4} className="text-accent-500" />
    </div>
  );
}

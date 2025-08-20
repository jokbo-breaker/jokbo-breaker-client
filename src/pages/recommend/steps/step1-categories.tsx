import Tag from '@/shared/components/chips/tag';
import {
  FOOD_OPTIONS,
  FoodOption,
} from '@/pages/recommend/constants/recommend';

type Props = {
  selected: FoodOption[];
  onToggle: (v: FoodOption) => void;
};

export default function Step1Categories({ selected, onToggle }: Props) {
  return (
    <div className="flex-col gap-[1.2rem] px-[2rem]">
      <h2 className="head3 text-black">닉네임님, 오늘은 어떤 음식이 땡겨요?</h2>

      <div className="flex flex-wrap gap-x-[1rem] gap-y-[1.2rem] pr-[0.5rem]">
        {FOOD_OPTIONS.map((opt) => (
          <Tag
            key={opt}
            selected={selected.includes(opt)}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </Tag>
        ))}
      </div>
    </div>
  );
}

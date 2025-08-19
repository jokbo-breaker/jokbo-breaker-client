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
    <>
      <h2 className="px-[2.0rem] pt-[2.4rem] text-[2.2rem] leading-[1.4] font-bold">
        닉네임님, 오늘은 어떤 음식이 땡겨요?
      </h2>

      <div className="px-[2.0rem] pt-[2.0rem] pb-[12rem]">
        <div className="flex flex-wrap gap-x-[1.2rem] gap-y-[1.2rem]">
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
    </>
  );
}

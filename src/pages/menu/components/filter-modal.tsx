import * as React from 'react';
import { createPortal } from 'react-dom';
import Tag from '@/shared/components/chips/tag';
import TopBar from '@/shared/layouts/top-bar';
import Button from '@/shared/components/button/button';
import {
  FILTER_DEFAULT,
  FOOD_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_OPTIONS,
  RECEIVE_OPTIONS,
  type FilterState,
} from '@/pages/menu/constants/filter';

type Props = {
  open: boolean;
  value: FilterState;
  onApply: (v: FilterState) => void;
  onClose: () => void;
};

export default function FilterModal({ open, value, onApply, onClose }: Props) {
  const [draft, setDraft] = React.useState<FilterState>(value);

  React.useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const toggleInArray = <T extends string>(arr: T[], k: T): T[] =>
    arr.includes(k) ? arr.filter((x) => x !== k) : [...arr, k];

  const sameSet = <T extends string>(a: T[], b: T[]) => {
    if (a.length !== b.length) return false;
    const as = [...a].sort();
    const bs = [...b].sort();
    for (let i = 0; i < as.length; i++) if (as[i] !== bs[i]) return false;
    return true;
  };

  const isSameFilter = (a: FilterState, b: FilterState) =>
    a.foodType === b.foodType &&
    a.priceMax === b.priceMax &&
    sameSet(a.categories, b.categories) &&
    sameSet(a.receive as string[], b.receive as string[]);

  const changed = !isSameFilter(draft, value);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-label="필터"
    >
      <button
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        type="button"
      />

      <div className="fixed inset-0 flex justify-center">
        <div className="mx-auto flex h-full w-full max-w-[43rem] flex-col bg-white">
          <TopBar
            title="필터"
            showClose
            onClose={onClose}
            className="bg-white px-[2rem]"
          />

          <div className="scrollbar-hide flex-1 flex-col gap-[3.6rem] overflow-y-auto px-[2rem]">
            {/* 음식 타입 - Tag로 단일 선택 */}
            <section className="flex-col gap-[1.2rem]">
              <h3 className="body3 font-medium text-black">음식 타입</h3>
              <div className="flex flex-wrap gap-[0.8rem]">
                {FOOD_TYPE_OPTIONS.map((o) => {
                  const selected = draft.foodType === o.value;
                  return (
                    <Tag
                      key={o.value}
                      selected={selected}
                      onClick={() =>
                        setDraft((s) => ({
                          ...s,
                          // 같은 태그 다시 누르면 해제, 다른 태그 누르면 교체
                          foodType: selected
                            ? ''
                            : (o.value as FilterState['foodType']),
                        }))
                      }
                    >
                      {o.label}
                    </Tag>
                  );
                })}
              </div>
            </section>

            {/* 카테고리 - 다중 선택 */}
            <section className="flex-col gap-[1.2rem]">
              <h3 className="body3 font-medium text-black">카테고리</h3>
              <div className="flex flex-wrap gap-[0.8rem]">
                {CATEGORY_OPTIONS.map((c) => {
                  const selected = draft.categories.includes(c);
                  return (
                    <Tag
                      key={c}
                      selected={selected}
                      onClick={() =>
                        setDraft((s) => ({
                          ...s,
                          categories: toggleInArray(s.categories, c),
                        }))
                      }
                    >
                      {c}
                    </Tag>
                  );
                })}
              </div>
            </section>

            {/* 가격대 - 단일 선택 (오타 fix: gap=[1.2rem] → gap-[1.2rem]) */}
            <section className="flex-col gap-[1.2rem]">
              <h3 className="body3 font-medium text-black">가격대</h3>
              <div className="flex flex-wrap gap-[0.8rem]">
                {PRICE_OPTIONS.map((p) => {
                  const selected = draft.priceMax === p.value;
                  return (
                    <Tag
                      key={p.value}
                      selected={selected}
                      onClick={() =>
                        setDraft((s) => ({
                          ...s,
                          priceMax: selected ? '' : p.value,
                        }))
                      }
                    >
                      {p.label}
                    </Tag>
                  );
                })}
              </div>
            </section>

            {/* 수령 방법 - 다중 선택 */}
            <section className="flex-col gap-[1.2rem]">
              <h3 className="body3 font-medium text-black">수령 방법</h3>
              <div className="flex flex-wrap gap-[0.8rem]">
                {RECEIVE_OPTIONS.map((r) => {
                  const selected = draft.receive.includes(r.value);
                  return (
                    <Tag
                      key={r.value}
                      selected={selected}
                      onClick={() =>
                        setDraft((s) => ({
                          ...s,
                          receive: toggleInArray(s.receive, r.value),
                        }))
                      }
                    >
                      {r.label}
                    </Tag>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="sticky right-0 bottom-0 left-0 px-[2rem] pt-[1.2rem] pb-[max(env(safe-area-inset-bottom),2rem)]">
            <div className="flex items-center gap-[1.2rem]">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDraft(FILTER_DEFAULT)}
              >
                초기화
              </Button>
              <Button
                variant={changed ? 'black' : 'white'}
                disabled={!changed}
                className="flex-[2]"
                onClick={() => {
                  onApply(draft);
                  onClose();
                }}
              >
                결과 확인하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

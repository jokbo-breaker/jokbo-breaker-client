import * as React from 'react';
import TopBar from '@/shared/layouts/top-bar';

type PromoModalProps = {
  open: boolean;
  onClose: () => void;
};

function useImagesReady(srcs: string[], enabled: boolean) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }
    let cancelled = false;

    const loadOne = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        const cleanup = () => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
        };
        const onDone = () => {
          cleanup();
          resolve();
        };

        img.addEventListener('load', onDone, { once: true });
        img.addEventListener('error', onDone, { once: true });
        img.src = src;

        if (img.complete) {
          cleanup();
          resolve();
          return;
        }

        const canDecode =
          typeof (img as HTMLImageElement & { decode?: () => Promise<void> })
            .decode === 'function';
        if (canDecode) {
          (img as any).decode().then(onDone).catch(onDone);
        }
      });

    Promise.all(srcs.map(loadOne)).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, JSON.stringify(srcs)]);

  return ready;
}

export default function PromoModal({ open, onClose }: PromoModalProps) {
  const sources = React.useMemo(
    () => ['/promo.svg', '/promo2.svg', '/promo3.svg'],
    [],
  );
  const imagesReady = useImagesReady(sources, open);

  React.useEffect(() => {
    if (!open || !imagesReady) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, imagesReady, onClose]);

  if (!open || !imagesReady) return null;

  return (
    <div
      className="fixed inset-0 z-[var(--z-bottom-modal)] whitespace-nowrap"
      role="dialog"
      aria-modal="true"
      aria-label="프로모션"
    >
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full w-full max-w-[43rem] flex-col bg-white">
          <TopBar
            title="잔반없는날이 만들고자 하는 세상"
            showClose
            onClose={onClose}
            className="bg-white"
          />

          <div className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto">
            <section className="items-centerd flex justify-between gap-[1.6rem] pt-[2.4rem]">
              <div className="flex-col gap-[2rem] pl-[2rem]">
                <div className="flex-col gap-[0.4rem]">
                  <p className="body1 text-black">우리나라의 식품 폐기량</p>
                  <p className="text-primary head1">연간 548만 톤</p>
                </div>
                <div className="flex-col gap-[0.4rem]">
                  <p className="body2 text-black">처리비용</p>
                  <p className="text-primary head1">1조 960억원</p>
                </div>
              </div>

              <img
                src="/promo.svg"
                alt=""
                aria-hidden
                className="w-[20rem] object-contain"
              />
            </section>

            <section className="mr-[2rem] flex items-center justify-center pt-[2.8rem]">
              <img
                src="/promo2.svg"
                alt=""
                aria-hidden
                className="z-0 w-[18rem] object-contain"
              />
              <div className="z-10 -ml-[4rem] flex-col gap-[2rem] text-right">
                <div className="flex-col gap-[0.4rem]">
                  <p className="body1 whitespace-nowrap text-black">
                    한집배달로 인한 이산화탄소 배출량
                  </p>
                  <p className="text-primary head1">km 당 137g</p>
                </div>
                <div className="flex-col gap-[0.4rem]">
                  <p className="body2 text-black">팀배달 사용 시 절감</p>
                  <p className="text-primary head1">건당 34g</p>
                </div>
              </div>
            </section>

            <section className="flex-col items-center gap-[0.6rem] py-[2.2rem] text-center">
              <img
                src="/promo3.svg"
                alt=""
                aria-hidden
                className="mx-auto w-[15rem] object-contain"
              />
              <div className="flex-col gap-[0.2rem]">
                <p className="body2 text-black">잔반없는날과 함께</p>
                <p className="text-primary head1">
                  지구를 살리는 여정에 동참해주세요!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

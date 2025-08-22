import React from 'react';
import PromoModal from './banner';

export default function BannerContents() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-[20rem] w-full cursor-pointer bg-gray-100"
        aria-label="프로모션 배너 자리"
      />
      <PromoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  rotate?: 90 | 180 | 270;
  ariaHidden?: boolean;
  ariaLabel?: string;
}

export default function Icon({
  name,
  size,
  width,
  fill = 'currentColor',
  height,
  className = '',
  rotate,
  ariaHidden = true,
  ariaLabel,
  ...rest
}: IconProps) {
  const computedWidth = width ?? size ?? 2.4;
  const computedHeight = height ?? size ?? 2.4;

  const rotateClass =
    rotate === 90
      ? 'rotate-90'
      : rotate === 180
        ? 'rotate-180'
        : rotate === 270
          ? 'rotate-270'
          : '';

  const combinedClass = ['inline-block', rotateClass, className].filter(Boolean).join(' ');

  return (
    <svg
      width={typeof computedWidth === 'number' ? `${computedWidth}rem` : computedWidth}
      height={typeof computedHeight === 'number' ? `${computedHeight}rem` : computedHeight}
      className={combinedClass}
      fill={fill}
      aria-hidden={ariaHidden}
      role={!ariaHidden ? 'img' : undefined}
      aria-label={!ariaHidden && ariaLabel ? ariaLabel : undefined}
      {...rest}
    >
      {!ariaHidden && ariaLabel && <title>{ariaLabel}</title>}
      <use href={`#icon-${name}`} />
    </svg>
  );
}

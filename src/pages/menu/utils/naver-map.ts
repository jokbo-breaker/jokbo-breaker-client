export const getMapInstance = (ref: any) =>
  ref?.instance ?? ref?.map ?? ref ?? null;

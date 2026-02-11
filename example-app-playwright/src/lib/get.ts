import { lensPath, view, split } from "ramda";

export const get = <TResult, TObject, TPath extends string>(
  obj: TObject,
  path: TPath
): TResult => {
  const pathArray = split(/[[\].]/, path);
  const lens = lensPath(pathArray);
  return view(lens, obj) as TResult;
};

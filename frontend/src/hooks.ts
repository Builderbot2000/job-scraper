import React, { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store";
import storage from "./services/storage";
import { parseString } from "./utils/paramsParser";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePersistentField = (name: string) => {
  const initialValue = storage.loadField(name)
    ? storage.loadField(name)
    : ("" as string);
  const [value, setValue] = useState<string>(parseString(initialValue));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    storage.saveField(name, event.target.value);
  };

  const clear = () => {
    storage.removeField(name);
    setValue("");
  };

  return {
    name,
    value,
    onChange,
    clear,
  };
};

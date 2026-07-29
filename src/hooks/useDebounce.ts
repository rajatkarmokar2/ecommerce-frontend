import { useEffect, useRef, useState } from "react";

const useDebounce = <T>({
  initalValue,
  timer,
}: {
  initalValue: T;
  timer: number;
}) => {
  const [value, setValue] = useState(initalValue);
  const ref = useRef(0);

  useEffect(() => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      setValue(initalValue);
    }, timer);
  }, [initalValue]);

  return value;
};

export default useDebounce;

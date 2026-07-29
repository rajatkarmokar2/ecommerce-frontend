import { useState } from "react";

const useApiMutation = ({ fn }: { fn: Function }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = async (...args: any[]) => {
    setLoading(true);
    try {
      const res = await fn(...args);
      setData(res);
    } catch (e) {
      const err = (e as { message: string }).message;
      setError(err);
    }
    setLoading(false);
  };

  return [fetch, { data, loading, error }];
};

export default useApiMutation;

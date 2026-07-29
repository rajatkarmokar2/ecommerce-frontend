import { useEffect, useState } from "react";

const useApiQuery = ({ fn }: { fn: Function }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch();
  }, [reload]);

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

  const refresh = () => {
    setReload((ps) => !ps);
  };

  return { data, loading, error, refresh };
};

export default useApiQuery;

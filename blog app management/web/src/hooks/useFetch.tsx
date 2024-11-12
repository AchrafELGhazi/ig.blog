import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => {
        console.log(res);
        if (!res.ok) {
          setIsPending(false);
          throw new Error('Failed to fetch blogs');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);

  return { data, isPending, error };
};
export default useFetch;

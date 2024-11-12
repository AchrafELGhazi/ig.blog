import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //need to do an abortController so that the fetching is not done when on another page;

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
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
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};
export default useFetch;

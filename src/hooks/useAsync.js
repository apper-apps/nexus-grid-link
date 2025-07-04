import { useState, useEffect } from 'react';

export const useAsync = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await asyncFunction();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const retry = () => {
    setError(null);
    setLoading(true);
    // Re-run the effect
    const execute = async () => {
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    execute();
  };

  return { data, loading, error, retry };
};
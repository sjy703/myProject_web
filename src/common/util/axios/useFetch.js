import { useEffect, useState } from 'react';
import axiosUtil from './axiosUtil';

export default function useFetch(url, refresh = []) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url);
  }, refresh);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const data = await axiosUtil.get(url);
      setResponse(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };
  return [response, error, isLoading];
}

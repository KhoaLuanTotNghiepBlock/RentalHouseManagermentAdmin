import { useState, useEffect } from 'react';

const useApiWithPagination = (url, pageSize = 5) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}?page=${currentPage}&limit=${pageSize}`);
        const result = await response.json();
        setData(result?.items);
        setTotalPages(result?.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, pageSize]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return { data, currentPage, totalPages, loading, error, handlePageChange };
};

export default useApiWithPagination;
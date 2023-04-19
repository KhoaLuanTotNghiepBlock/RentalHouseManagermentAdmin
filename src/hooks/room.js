import React, { useState, useEffect } from 'react';

const roomWithPagination = (url, pageSize = 5) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}`);
        const result = await response.json();
        const items = result?.data?.items.map((val) => val.room);
        setData(items);
        setTotalPages(result?.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, pageSize]);

  const handlePageChanges = (newPage) => {
    setCurrentPage(newPage);
  };
  return { data, currentPage, totalPages, loading };
};

export default roomWithPagination;
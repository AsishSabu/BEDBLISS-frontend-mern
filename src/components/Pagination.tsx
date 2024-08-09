import React from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  totalData: number;
  dataPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalData, dataPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalData / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <IconButton
            key={i + 1}
            variant={currentPage === i + 1 ? "filled" : "text"}
            color="gray"
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;

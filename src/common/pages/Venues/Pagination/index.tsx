import React from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextPage, onPreviousPage }) => {
  return (
    <div className="pagination my-8">
      <button 
        onClick={onPreviousPage} 
        disabled={currentPage === 1} 
        className={`mx-6 p-1 rounded-full text-white bg-black ${currentPage === 1 ? 'opacity-50 cursor-default' : ''}`}
      >
        <ChevronLeftRoundedIcon />
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button 
        onClick={onNextPage} 
        disabled={currentPage === totalPages} 
        className={`mx-6 p-1 rounded-full text-white bg-black ${currentPage === totalPages ? 'opacity-50 cursor-default' : ''}`}
      >
        <ChevronRightRoundedIcon />
      </button>
    </div>
  );
};

export default Pagination;
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-5 justify-center">
        <svg style={{ cursor: 'pointer' }} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </Button>
      ))}
      
      <svg style={{ cursor: 'pointer' }} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === 1} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  );
}
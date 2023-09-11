import Link from 'next/link'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({currentPage, totalPages}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <li key={i} className="m-1">
        <Link
          href={`/blog?page=${i}`}
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-gray-800 px-2 text-gray-300 transition-colors duration-150 ease-in-out hover:bg-purple-600 ${
            currentPage === i ? 'bg-purple-600' : ''
          }`}
        >
          {i}
        </Link>
      </li>,
    );
  }
  return (
      <nav className="flex justify-center pt-16" role="navigation" aria-label="Pagination Navigation">
    <ul className="inline-flex flex-wrap font-medium text-sm -m-1">
      {/* ...previous button */}
      {pageNumbers}
      {/* ...next button */}
    </ul>
  </nav>
  );
}

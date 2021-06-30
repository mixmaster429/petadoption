import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

type Props = {
  total: number;
  filter: any;
  setpage: any;
};

export const Paginate: React.FC<Props> = ({ total, filter, setpage }) => {
  const page_counts = Math.ceil(total / filter.pagecount);

  const open_page = (page) => {
    if (page === filter.page) return false;
    setpage(page);
  };

  const prev_page = () => {
    if (filter.page === 1) return false;
    open_page(filter.page - 1);
  };

  const next_page = () => {
    if (filter.page === page_counts) return false;
    open_page(filter.page + 1);
  };

  if (total === 0) {
    return <></>;
  }

  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <button
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={prev_page}
        >
          Previous
        </button>
        <button
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
          onClick={next_page}
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{(filter.page - 1) * filter.pagecount + 1}</span>{' '}
            to <span className='font-medium'>{filter.page * filter.pagecount}</span> of{' '}
            <span className='font-medium'>{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <button
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={prev_page}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {Array.from(Array(page_counts), (e, i) => {
              return (
                <React.Fragment key={i}>
                  {i + 1 === filter.page ? (
                    <button
                      className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      onClick={() => open_page(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ) : (
                    <button
                      className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      onClick={() => open_page(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )}
                </React.Fragment>
              );
            })}

            <button
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              onClick={next_page}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

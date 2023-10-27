import cls from './pagination.module.css';

interface PaginationItemProps {
  page: string | number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isDisabled: boolean;
}

const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((el) => el + start);
};

interface PagesCutParams {
  pagesCount: number;
  pagesCutCount: number;
  currentPage: number;
}

const getPagesCut = ({
  pagesCount,
  pagesCutCount,
  currentPage
}: PagesCutParams) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);

  if (pagesCount < pagesCutCount) {
    return { start: 1, end: pagesCount + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  } else if (currentPage + floor >= pagesCount) {
    return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

const PaginationItem = ({
  page,
  currentPage,
  onPageChange,
  isDisabled
}: PaginationItemProps) => {
  let classesList = cls['page-item'];
  if (page === currentPage) {
    classesList += ' ' + cls.active;
  }
  if (isDisabled) {
    classesList += ' ' + cls.disabled;
  }

  return (
    <div className={classesList} onClick={() => onPageChange(+page)}>
      <span className={cls['page-link']}>{page}</span>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  total,
  limit,
  onPageChange
}: PaginationProps)=> {
  const pagesCount = Math.ceil(total / limit);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 3, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  return (
    <div className={cls.pagination}>
      <PaginationItem
        page="First"
        currentPage={currentPage}
        onPageChange={() => onPageChange(1)}
        isDisabled={isFirstPage}
      />
      <PaginationItem
        page="Prev"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage - 1)}
        isDisabled={isFirstPage}
      />
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
          isDisabled={false}
        />
      ))}
      <PaginationItem
        page="Next"
        currentPage={currentPage}
        onPageChange={() => onPageChange(currentPage + 1)}
        isDisabled={isLastPage}
      />
      <PaginationItem
        page="Last"
        currentPage={currentPage}
        onPageChange={() => onPageChange(pagesCount)}
        isDisabled={isLastPage}
      />
    </div>
  );
};

export default Pagination;

interface Props {
  className: string;
  currentPage: number;
  pageCount: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({className, currentPage, pageCount, onPageChange}: Props) => {
  return (
    <nav className={className} aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li onClick={() => onPageChange(currentPage - 1)} className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}>
          <span className={"page-link"}>Previous</span>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <li key={i} className={`page-item ${i + 1 == currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(i + 1)}>
            <span className={"page-link"}>{i + 1}</span>
          </li>
        ))}
        <li onClick={() => onPageChange(currentPage + 1)}
            className={`page-item ${currentPage == pageCount ? 'disabled' : ''}`}>
          <span className={"page-link"}>Next</span>
        </li>
      </ul>
    </nav>
  );

}

export default Pagination;
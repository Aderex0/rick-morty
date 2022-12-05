import Button from "./Button";

interface Props {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, lastPage, setPage }: Props) => {
  const handlePrev = () => page !== 1 && setPage(page - 1);
  const handleNext = () => page !== lastPage && setPage(page + 1);
  const disableLastPage = page === lastPage ? "slate-400" : null;
  const disableFirstPage = page === 1 ? "slate-400" : null;

  return (
    <div className="w-full h-16 flex justify-between fixed bottom-0 p-2 bg-white shadow-inner">
      <Button text="Prev" onClick={handlePrev} bg={disableFirstPage} disabled={!!disableFirstPage} />
      <div className="h-inherit flex">
        {page !== 1 && <Button text={1} width={12} onClick={() => setPage(1)} />}
        {page !== lastPage && <Button text={page} width={12} bg="slate-400" disabled />}
        <p className="my-0 mx-2 self-end translate-y-1">. . .</p>
        <Button
          text={lastPage}
          width={12}
          onClick={() => setPage(lastPage)}
          disabled={!!disableLastPage}
          bg={disableLastPage}
        />
      </div>
      <Button text="Next" onClick={handleNext} bg={disableLastPage} disabled={!!disableLastPage} />
    </div>
  );
};

export default Pagination;

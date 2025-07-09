
const Pagination = ({totalPages, currentPage, handlePageChange}) => {
    return (
        <div className="flex justify-center p-10">
            {Array.from({length: totalPages}, (_, i) => (
                <button onClick={() => handlePageChange(i+1)} className={`mx-1 px-2  rounded-sm ${currentPage === i+1 ? "bg-secondary text-white" : "bg-gray-200"}`} key={i}>{i+1}</button>
            ))}
        </div>
    );
};

export default Pagination;
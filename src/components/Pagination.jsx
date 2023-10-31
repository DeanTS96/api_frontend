function Pagination({perPage, limit, setLimit, page, setPage, itemsLength}) {
    return (
        <>
            <div>
                <label className="pagination-head" htmlFor={`${perPage}-per-page`}>{perPage} per page</label>
                <select className="pagination-head rounded pagination-dropdown size-10em" id={`${perPage}-per-page`} name={`${perPage}-per-page`} value={limit} onChange={(e)=>{setLimit(e.target.value)}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <button className="btn-none clickable size-20em pagination-arrow dis-inblk" disabled={page < 2} onClick={()=> {setPage(page => page - 1)}}>&lt;</button>
            <p className="size-20em pagination-page dis-inblk">{page}</p>
            <button className="btn-none clickable size-20em pagination-arrow dis-inblk" disabled={itemsLength < limit} onClick={()=> {setPage(page => page + 1)}}>&gt;</button>
        </>
    )
}

export default Pagination;
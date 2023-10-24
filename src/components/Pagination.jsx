

function Pagination({perPage, limit, setLimit, page, setPage, itemsLength}) {
    return (
        <>
            <label htmlFor={`${perPage}-per-page`}>comments per page</label>
            <select id={`${perPage}-per-page`} name={`${perPage}-per-page`} value={limit} onChange={(e)=>{setLimit(e.target.value)}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            <button disabled={page < 2} onClick={()=> {setPage(page => page - 1)}}>&lt;</button>
            <p>{page}</p>
            <button disabled={itemsLength < limit} onClick={()=> {setPage(page => page + 1)}}>&gt;</button>
        </>
    )
}

export default Pagination;
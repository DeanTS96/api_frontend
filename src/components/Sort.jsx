function Sort({sortBy, setSortBy, order, setOrder, isOrderUnchanged, setIsOrderUnchanged, isSortByUnchanged, setIsSortByUnchanged}) {
    return (
        <form>
            {//<div className="dis-inblk border-2px bg-white rounded articles-sort-item">
            }
                {//<label className="articles-sort-label" htmlFor="sort-by">Sort by </label>
}
                <select className="size-08em center rounded clickable articles-sort-select" id="sort-by" name="sort-by" value={sortBy} onChange={(e) => {
                    setIsSortByUnchanged(false);
                    setSortBy(e.target.value)}}>
                    {isSortByUnchanged ? <option value={sortBy}>Sort by</option> : ''}
                    <option value="created_at">Date posted</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>

            {//<div className="dis-inblk border-2px bg-white rounded articles-sort-item">
}
                {//<label className="articles-sort-label" htmlFor="order">Order</label>
}
                <select className="size-08em center rounded clickable articles-sort-select" id="order" name="order" value={order} onChange={(e) => {
                    setIsOrderUnchanged(false);
                    setOrder(e.target.value)}}>
                    {isOrderUnchanged ? <option value={order}>Order</option> : ''}
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
        </form>
    )
}

export default Sort;
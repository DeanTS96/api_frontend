function Sort({sortBy, setSortBy, order, setOrder}) {
    return (
        <form>
            <div className="dis-inblk border-2px bg-white rounded articles-sort-item">
                <label className="articles-sort-label" htmlFor="sort-by">Sort by </label>
                <select className="center rounded articles-sort-select" id="sort-by" name="sort-by" value={sortBy} onChange={(e) => {setSortBy(e.target.value)}}>
                    <option value="created_at">Date posted</option>
                    <option value="comment_count">Comments</option>
                    <option value="votes">Votes</option>
                </select>
            </div>

            <div className="dis-inblk border-2px bg-white rounded articles-sort-item">
                <label className="articles-sort-label" htmlFor="order">Order</label>
                <select className="center rounded articles-sort-select" id="order" name="order" value={order} onChange={(e) => {setOrder(e.target.value)}}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </form>
    )
}

export default Sort;
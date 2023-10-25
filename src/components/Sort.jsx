function Sort({sortBy, setSortBy, order, setOrder}) {
    return (
        <form>
            <label htmlFor="sort-by">Sort by </label>
            <select id="sort-by" name="sort-by" value={sortBy} onChange={(e) => {setSortBy(e.target.value)}}>
                <option value="created_at">Date posted</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Votes</option>
            </select>

            <label htmlFor="order">Order</label>
            <select id="order" name="order" value={order} onChange={(e) => {setOrder(e.target.value)}}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </form>
    )
}

export default Sort;
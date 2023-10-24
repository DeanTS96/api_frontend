import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Articles</Link></li>
                <li><Link to="/create_article">Post Article</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
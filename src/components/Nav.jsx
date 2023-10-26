import {Link} from 'react-router-dom';

function Nav({setCurrentURL}) {
    return (
        <nav>
            <ul>
                <li><Link to="/" onClick={()=>{setCurrentURL('http://localhost:5173/')}}>Articles</Link></li>
                <li><Link to="/create_article">Post Article</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
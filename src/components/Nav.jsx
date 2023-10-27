import {Link} from 'react-router-dom';

function Nav({setCurrentURL}) {
    return (
        <nav>
            <ul>
                <li className="nav-item"><Link className="nav-link" to="/" onClick={()=>{setCurrentURL('http://localhost:5173/')}}>Articles</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/create_article">Post Article</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/topics">Topics</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
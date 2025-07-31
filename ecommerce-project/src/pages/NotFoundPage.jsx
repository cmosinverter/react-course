import { Header } from '../components/Header.jsx';
import { Link } from 'react-router';
import './NotFoundPage.css';
export function NotFoundPage() {
    return (
        <>
            <Header />
            <div className="notfound-page">
                <div className="four-o-four">404</div>
                <img className="four-o-four-bg" src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
                <p className="lost-message">Looks like you are lost</p>
                <p className="lost-message">The page you are looking is unavailable</p>
                <Link to="/" className="back-home-link">
                    Back to home
                </Link>
            </div>
        </>
    );
}
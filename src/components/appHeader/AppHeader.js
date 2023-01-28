import './appHeader.scss';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink href="#" to='/'>
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink to="/"
                        style={({ isActive }) => isActive ? { 'color': '#9F0013' } : { 'color': 'inherit' }}> Characters</NavLink></li>
                    /
                    <li><NavLink href="#"
                        to='/comics'
                        style={({ isActive }) => isActive ? { 'color': '#9F0013' } : { 'color': 'inherit' }}>Comics</NavLink></li>
                </ul>
            </nav>
        </header >
    )
}

export default AppHeader;
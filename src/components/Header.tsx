import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <div
                className='logo'
            ></div>
            <ul className='nav-link'>

                <li>
                    <span >Logout</span>
                </li>
            </ul>
        </div>
    );
};

export default Header;

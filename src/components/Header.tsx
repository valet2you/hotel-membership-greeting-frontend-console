import { NavLink } from 'react-router-dom';
import { logoutUser } from '../services/apiService';

const Header = () => {

    const logoutClickHandler = async () => {
        try {
            // const response = await logoutUser();
            // console.log(response);
            console.log('logout-clicked')
        } catch (error) {}
    };
    return (
        <div className='header'>
            <div className='logo'></div>
            <ul className='nav-link'>
                <li>
                    <span onClick={logoutClickHandler}>Logout</span>
                </li>
            </ul>
        </div>
    );
};

export default Header;

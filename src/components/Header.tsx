import { NavLink, useNavigate } from 'react-router-dom';
import { deleteCookie } from '../helpers/cookieHelper';
import { logoutUser } from '../services/apiService';

const Header = () => {
    const navigate = useNavigate();
    const logoutClickHandler = async () => {
        try {
            const response = await logoutUser();
            if(response.status === 200) {
                    deleteCookie('__user-token');
                    navigate('/login', { replace: true });
            }
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

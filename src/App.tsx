import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import "./styles/__main.scss"

function App() {
    const NotFound = () => <p>Page not found</p>;
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Layout />
                }
            >
                <Route index element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;

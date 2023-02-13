import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
} from '@chakra-ui/react';
// import { getCookie, setCookie } from '../helpers/cookieHelper';
import { useNavigate } from 'react-router-dom';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { loginUser } from '../services/apiService';
import { getCookie, setCookie } from '../helpers/cookieHelper';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    let navigate = useNavigate();
    const toast = useToast();

    
    useEffect(() => {
        const token = getCookie('__user-token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, []);

    const handleLoginClick = async () => {
        if (!loginData.username || !loginData.username.trim()) {
            toast({
                title: 'Username is required!',
                description: 'Please enter a valid username!',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        if (!loginData.password || !loginData.password.trim()) {
            toast({
                title: 'Password is required!',
                description: 'Please enter a valid Password!',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        try {
            setLoading(true);
            let response = await loginUser(loginData);
            if (response.status === 200) {
                let result = await response.json();
                const token = result.response.access_token;
                if (token) {
                    setCookie('__user-token', `${token}`, 1);
                    navigate('/', { replace: true });
                } else {
                    toast({
                        title: 'Invalid username or password',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                }
            }
            if (response.status === 400 || response.status === 401) {
                toast({
                    title: 'Invalid username or password',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            // const { response } = error;
            toast({
                title: 'Invalid username or password',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <div className='login-page'>
            <div className='login-wrapper'>
                <div className='app-logo '></div>
                <div className='login-box'>
                    <div className='login-title text-center'>
                        <div className='title'>Welcome back,</div>
                        <div className='subtitle'>
                            Please sign in to manage your orders
                        </div>
                    </div>
                    <FormControl marginBottom={'0.5rem'}>
                        {/* <FormLabel fontSize={"13px"} margin={0}>
              Email address
            </FormLabel> */}
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<EmailIcon color='gray' />}
                            />
                            <Input
                                placeholder='Enter username'
                                type='email'
                                size='md'
                                colorScheme='gray'
                                marginBottom={'0.5rem'}
                                fontSize={'13px'}
                                name='username'
                                value={loginData.username}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        {/* <FormLabel fontSize={"13px"} margin={0}>
              Email password
            </FormLabel> */}
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<LockIcon color='gray' />}
                            />
                            <Input
                                placeholder='Enter password'
                                colorScheme='gray'
                                type='password'
                                size='md'
                                marginBottom={'0.5rem'}
                                fontSize={'13px'}
                                name='password'
                                value={loginData.password}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </InputGroup>
                    </FormControl>

                    <Button
                        colorScheme='yellow'
                        marginTop={'0.5rem'}
                        fontSize={'13px'}
                        onClick={handleLoginClick}
                        isLoading={loading}
                    >
                        Login
                    </Button>
                </div>
                <div className='copyright'>Copyright &copy; 2022 ViralOps.</div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
} from '@chakra-ui/react';
// import { loginUser } from '../services/apiService';
// import { getCookie, setCookie } from '../helpers/cookieHelper';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    let navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const handleLoginClick = async () => {
        if (!loginData.email || !loginData.email.trim()) {
            toast({
                title: 'Email is required!',
                description: 'Please enter a valid email!',
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
            // const response = await loginUser(JSON.stringify(loginData));
            // if (response.status === 200) {
            //     const data = response.data?.data || {};
            //     if (data && data.token) {
            //         setCookie('token', `${data.token}`, 1);
            //         navigate('/', { replace: true });
            //     } else {
            //         toast({
            //             title: 'Invalid username or password',
            //             status: 'error',
            //             duration: 2000,
            //             isClosable: true,
            //         });
            //     }
            // }
            // if (response.status === 400 || response.status === 401) {
            //     toast({
            //         title: 'Invalid username or password',
            //         status: 'error',
            //         duration: 2000,
            //         isClosable: true,
            //     });
            // }
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

    // const handleInputChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setLoginData({ ...loginData, [name]: value });
    // };
    // const token = getCookie('token');
    // if (token) {
    //     navigate('/', { replace: true });
    // }
    return (
        <div className='login-page'>
            <div className='login-wrapper'>
                <div
                    className='app-logo '
                ></div>
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
                                name='email'
                            // onChange={(e) => handleInputChange(e)}
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
                            // onChange={(e) => handleInputChange(e)}
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


export default Login
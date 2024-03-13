import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Toaster from './Toaster';

const Login = () => {
    const [loading, setloading] = useState(false);
    const [loginStatus, setloginStatus] = useState({
    })

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#e3805b', // Change this to your desired color
            },
            // Add more color overrides if needed
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData({ ...formData, [name]: value });

        // Check if username or email field is being edited
        if (name === 'username' && value.trim() !== '') {
            // If username field has value, disable email field
            setFormData(prevState => ({ ...prevState, email: '' }));
        } else if (name === 'email' && value.trim() !== '') {
            // If email field has value, disable username field
            setFormData(prevState => ({ ...prevState, username: '' }));
        }
    };


    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Add your login logic here
        setloading(true);
        // console.log(formData);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const res = await axios.post(
                "/api/user/login/",
                formData,
                config
            );
            console.log("Login: ", res);
            setloginStatus({
                message: "success",
                key: Math.random()
            });
            localStorage.setItem("userData", JSON.stringify(res));
            navigate("/welcome");
            // history.push("/");
            
        } catch (error) {
            setloginStatus({
                message: error.response.data.message,
                key: Math.random()
            });
            // console.error("Error: ", error);
        }
        finally{
            setloading(false);
        }

    };

    const handleTogglePasswordVisibility = () => {
        // event.preventDefault();
        setShowPassword(!showPassword);
        setTimeout(() => {
            setShowPassword(false);
        }, 2000);
    };

    return (
        <AnimatePresence>
            <motion.div
                className='login-container'>
                <div className='image-container'>
                    <img src="lets-chat-high-resolution-logo-transparent.png" alt="" className='login-image' />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        ease: "anticipate",
                        duration: "0.3",
                    }}
                    className='login-box'>
                    <p>Login to your Account</p>
                    <ThemeProvider theme={theme}>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <TextField name='username' onChange={handleChange} value={formData.usernameOrEmail} label="Username" variant="outlined" disabled={formData.email.trim() !== ''} required={formData.email.trim() === ''} />
                            -or-
                            <TextField name='email' onChange={handleChange} value={formData.usernameOrEmail} label="Email" variant="outlined" disabled={formData.username.trim() !== ''} required={formData.username.trim() === ''} />
                            <TextField id="password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                                label="Password" type={showPassword ? 'text' : 'password'} variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={handleTogglePasswordVisibility}
                                            disableTouchRipple
                                            disableRipple
                                            size='small'
                                            style={{ margin: '-25px' }}>
                                            {/* <button onClick={handleTogglePasswordVisibility} className='visibility-button'> */}
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            {/* </button> */}
                                        </IconButton>
                                    ),
                                }} required />
                            <Button type='submit' variant="outlined" size="medium" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                            <Link to="/signup">Create an account?</Link>
                            {(loginStatus.message) ? (
                                <Toaster key={loginStatus.key + '_login'} message={loginStatus.message} />
                            ) : null}
                        </form>
                    </ThemeProvider>
                </motion.div>
            </motion.div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </AnimatePresence>
    );
}

export default Login;

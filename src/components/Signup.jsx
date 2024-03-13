import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"
import Toaster from './Toaster';
import axios from 'axios';

const Signup = () => {
    const [loading, setloading] = useState(false);
    const [signupStatus, setsignupStatus] = useState({
        message: '',
        key: ''
    })

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);

        // Update form data
        setFormData({ ...formData, [name]: value });

        // Validate password and confirm password on change
        if (name === 'confirmPassword' && value !== formData.password) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    };

    const [showPassword, setShowPassword] = useState(false)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#e3805b', // Change this to your desired color
            },
            // Add more color overrides if needed
        },
    });

    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Add your Signup logic here
        setloading(true);
        console.log(formData);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const res = await axios.post(
                "api/user/register/",
                formData,
                config
            );
            console.log("Signup: ", res);
            setsignupStatus({
                message: "success",
                key: Math.random()
            });
            // navigate("/");
            localStorage.setItem("userData", JSON.stringify(res));
            navigate("/welcome");
        } catch (error) {
            console.log(error.response);
            setsignupStatus({
                message: error.response.data.message,
                key: Math.random()
            });
            // console.log("Error: ", error);
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
                    }} className='login-box'>
                    <p>Create an Account</p>
                    <ThemeProvider theme={theme}>
                        <form onSubmit={handleSubmit} className='login-form'>
                            <TextField required onChange={handleChange} name='name' label="Name" variant="outlined" />
                            <TextField required onChange={handleChange} name='username' label="Username" variant="outlined" />
                            <TextField required onChange={handleChange} name='email' label="Email" variant="outlined" />
                            <TextField required name="password"
                                style={{ width: '100%' }}
                                onChange={handleChange}
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
                                }} />
                            <TextField required name="confirmPassword"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                label="Confirm Password" type={showPassword ? 'text' : 'password'} variant="outlined"
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
                                }} />
                            {error && <div>{error}</div>}
                            <Button type='submit' variant="outlined" size="medium" style={{ width: '100%' }}>
                                Signup
                            </Button>
                            <Link to="/login">Already have an account?</Link>
                            {(signupStatus.message !== '') ? (
                                <Toaster key={signupStatus.key + '_signup'} message={signupStatus.message} />
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

export default Signup;

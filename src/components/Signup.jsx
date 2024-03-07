import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

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

    const handleSubmit = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Add your Signup logic here
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
                        <form action={handleSubmit} className='login-form'>
                            <TextField id="outlined-basic1" label="Name" variant="outlined" />
                            <TextField id="outlined-basic1" label="Username" variant="outlined" />
                            <TextField id="outlined-basic1" label="Email" variant="outlined" />
                            <TextField name="password"
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
                            <TextField name="confirmPassword"
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
                            <Button variant="outlined" size="medium">
                                Signup
                            </Button>
                            <Link to="/login">Already have an account?</Link>
                        </form>
                    </ThemeProvider>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Signup;

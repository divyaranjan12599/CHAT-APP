import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const Login = () => {
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
        // Add your login logic here
    };

    const handleTogglePasswordVisibility = () => {
        // event.preventDefault();
        setShowPassword(!showPassword); 
        setTimeout(() => {
            setShowPassword(false);
        }, 2000);
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src="lets-chat-high-resolution-logo-transparent.png" alt="" className='login-image' />
            </div>
            <div className='login-box'>
                <p>Login to your Account</p>
                <ThemeProvider theme={theme}>
                    <form action={handleSubmit} className='login-form'>
                        <TextField id="outlined-basic1" label="Username" variant="outlined" />
                        <TextField id="password"
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
                            }} />
                        <Button variant="outlined" size="medium">
                            Login
                        </Button>
                    </form>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default Login;

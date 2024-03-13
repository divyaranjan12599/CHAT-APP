import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Toaster = (props) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={props.message}
                action={[
                    <IconButton key="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ]}
            >
                <Alert onClose={handleClose} severity='warning' sx={{ width: '30vw' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Toaster;

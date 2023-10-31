import * as React from 'react';
import Button from '@mui/material/Button';

export default function CustomButton({ content, link }) {
    return (
        <Button href={link} variant="contained" disableElevation
        sx={{
            fontFamily: 'Fedoka',
            fontSize: '1rem',
            fontWeight: 'bold',
            padding: '10px 10px',
            margin: '40px 10px',
            borderRadius: '20px',
            color: 'white',
            backgroundColor: '#000',
            '&:hover': {
                backgroundColor: '#fff',
                color: '#000',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }
        }}>
            {content}
        </Button>
    );
}
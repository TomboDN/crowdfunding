import React from 'react';
import { Box, Typography } from '@mui/material';

const CampaignPerkItem = ({ perk, onChange }) => {
    const { title, description, price } = perk;

    return (
        <Box sx={{ p: 2, border: 1, borderColor: 'grey.400', borderRadius: 1 , marginBottom: '5px'}}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                {description}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {price} рублей
            </Typography>
        </Box>
    );
};

export default CampaignPerkItem;

import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const CampaignItem = ({ campaign }) => {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const endDate = new Date(campaign.end_date);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);
    }, [campaign.end_date]);

    return (
        <Link to={`/campaigns/${campaign.id}`}>
            <Box display="flex" mb={2} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px' }}>
                <Box width={300}>
                    <img src={"http://localhost:8080/" + campaign.image_url} alt={campaign.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                </Box>
                <Box p={2} flexGrow={1}>
                    <Typography variant="h5" style={{color: 'black'}} mb={1}>
                        {campaign.title}
                    </Typography>
                    <Typography variant="subtitle1" style={{color: 'red'}} mb={1}>
                        {campaign.category}
                    </Typography>
                    <Typography variant="body1" style={{color: 'gray'}} mb={2}>
                        {campaign.tagline}
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress
                            variant="determinate"
                            value={Math.round(campaign.progress * 100) / 100}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption">
                            {Math.round(campaign.progress * 100) / 100}% собрано
                        </Typography>
                        <Typography variant="caption">
                            {daysLeft <= 0 ? ("Кампания Завершена") : (daysLeft + " дней осталось")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Link>

    );
};

export default CampaignItem;

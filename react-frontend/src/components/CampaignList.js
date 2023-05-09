import React, { useState, useEffect } from 'react';
import CampaignItem from './CampaignItem';
import { Grid } from '@mui/material';

function CampaignList(props) {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        setCampaigns(props.campaigns);
    }, [props.campaigns]);


    return (
        <Grid container spacing={3}>
            {campaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={6} key={campaign.id}>
                    <CampaignItem campaign={campaign} />
                </Grid>
            ))}
        </Grid>
    );
}

export default CampaignList;

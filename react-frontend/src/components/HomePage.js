import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CampaignList from './CampaignList';
import { Container, Typography } from '@mui/material';

function HomePage() {
    const [campaigns, setCampaigns] = useState([]);
    const API_URL = "http://localhost:8080/api/campaigns/";

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                console.log(response)
                setCampaigns(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    if (!campaigns) {
        return <div>Кампаний нет...</div>;
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Список кампаний
            </Typography>
            <CampaignList campaigns={campaigns}/>
        </Container>
    );
}

export default HomePage;

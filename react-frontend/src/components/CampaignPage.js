import React, {useEffect, useState} from 'react';
import {Typography, Button, Box, Grid, Divider} from '@mui/material';
import CampaignPerkItem from './CampaignPerkItem';
import axios from "axios";

const CampaignPage = () => {
    const [campaign, setCampaign] = useState(null);
    const id = window.location.pathname.split('/')[2];
    const API_URL = "http://localhost:8080/api/campaigns/";
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        axios.get(API_URL + id)
            .then(response => {
                console.log(response)
                setCampaign(response.data)

                const endDate = new Date(response.data.end_date);
                const today = new Date();
                const diffTime = endDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDaysLeft(diffDays);
                console.log(daysLeft)
            })
            .catch(error => console.log(error));
    });

    if (!campaign) {
        return <div>Кампании нет...</div>;
    }

    const perks = campaign.perks.map((perk) => (
        <CampaignPerkItem key={perk.id} perk={perk}/>
    ));

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography variant="h2">{campaign.title}</Typography>
                        <Box width={200}>
                            <img src={`http://localhost:8080/${campaign.image_url}`} alt={campaign.title}
                                 style={{width: '100%', height: 'auto', objectFit: 'cover'}}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography gutterBottom variant="body1">Категория: {campaign.category}</Typography>
                        <Typography gutterBottom variant="body1">Цель: {campaign.goal_amount} рублей</Typography>
                        <Typography gutterBottom
                            variant="body1">{daysLeft <= 0 ? 'Кампания завершена' : `Дней осталось: ${daysLeft}`}</Typography>
                        <Typography gutterBottom variant="body1">Собрано средств: {campaign.raised_amount} рублей</Typography>
                        <Typography gutterBottom variant="body1">Поддержавших: {campaign.backers}</Typography>
                        <Button variant="contained" href={`/campaigns/${id}/donate`}>
                            Поддержать
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Divider></Divider>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography gutterBottom variant="h5" component="div">
                            Описание кампании:
                        </Typography>
                        <p>{campaign.description}</p>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                        <Typography gutterBottom variant="h5" component="div">
                            Варианты поддержки:
                        </Typography>
                        <div>{perks}</div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default CampaignPage;

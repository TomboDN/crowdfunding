import {Formik, Form, FieldArray} from 'formik';
import {TextField, Checkbox, FormControlLabel, Button, Typography, Grid} from '@mui/material';
import CampaignPerkItem from './CampaignPerkItem';
import {useEffect, useState} from 'react';
import axios from 'axios';
import * as Yup from "yup";
import authHeader from "../services/auth-header";
import { useNavigate } from "react-router-dom";

function DonateForm() {
    const initialValues = {
        name: '',
        email: '',
        perks: [],
        cardNumber: '',
        cardExpiration: '',
        cardCvc: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Обязательное поле'),
        email: Yup.string().required('Обязательное поле'),
        cardNumber: Yup.number().required('Обязательное поле').min(1000000000000000, 'Номер из 16 цифр').max(9999999999999999, 'Номер из 16 цифр').integer('Номер из 16 целых цифр'),
        cardExpiration: Yup.date().required('Обязательное поле'),
        cardCvc: Yup.number().required('Обязательное поле').min(100, 'CVC из 3 цифр').max(999, 'CVC из 3 цифр').integer('CVC из 3 целых цифр'),
        perks: Yup.array().of(
            Yup.object().shape({
                quantity: Yup.number().required('Обязательное поле').min(0, 'Цена должна быть положительной'),
            })
        ).min(1, 'Должен быть хотя бы 1 вариант')
    });

    const [campaignPerks, setCampaignPerks] = useState([]);
    const id = window.location.pathname.split('/')[2];
    const user = JSON.parse(localStorage.getItem('user'));
    const API_URL = 'http://45.155.121.48:8080/api/campaigns/';
    const navigate = useNavigate();
    if (user == null) {
        navigate("/authError", { replace: true });
    }

    useEffect(() => {
        axios
            .get(API_URL + id + '/perks')
            .then((response) => {
                setCampaignPerks(response.data);
            })
            .catch((error) => console.log(error));
    });

    const handleSubmit = (values, actions) => {
        axios.post(API_URL + id + '/donate', values, { headers: authHeader() }).then(response => {
            navigate("/", { replace: true });
        })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({values, handleChange, handleSubmit, isSubmitting, errors, touched}) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">Личная информация</Typography>
                            <TextField sx={{marginBottom: '5px'}} name="name" label="Имя" fullWidth value={values.name}
                                       onChange={handleChange} error={touched.name && Boolean(errors.name)}
                                       helperText={touched.name && errors.name}/>
                            <TextField name="email" label="Почта" fullWidth value={values.email} onChange={handleChange}
                                       error={touched.email && Boolean(errors.email)}
                                       helperText={touched.email && errors.email}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">Платежная информация</Typography>
                            <TextField sx={{marginBottom: '5px'}} name="cardNumber" label="Номер карты" fullWidth
                                       value={values.cardNumber} onChange={handleChange}
                                       error={touched.cardNumber && Boolean(errors.cardNumber)}
                                       helperText={touched.cardNumber && errors.cardNumber}/>
                            <TextField type="date" sx={{marginBottom: '5px'}} name="cardExpiration"
                                       label="Дата завершения обслуживания" fullWidth value={values.cardExpiration}
                                       onChange={handleChange}
                                       error={touched.cardExpiration && Boolean(errors.cardExpiration)}
                                       helperText={touched.cardExpiration && errors.cardExpiration}/>
                            <TextField name="cardCvc" label="CVC" fullWidth value={values.cardCvc}
                                       onChange={handleChange} error={touched.cardCvc && Boolean(errors.cardCvc)}
                                       helperText={touched.cardCvc && errors.cardCvc}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Выберите варианты поддержки (минимум 1)</Typography>
                            <FieldArray
                                name="perks"
                                render={({push, remove}) => (
                                    <>
                                        {campaignPerks.map((perk) => {
                                            const index = values.perks.findIndex((p) => p.id === perk.id);
                                            const quantity = index !== -1 ? values.perks[index].quantity : 0;

                                            return (
                                                <FormControlLabel
                                                    key={perk.id}
                                                    control={
                                                        <Checkbox
                                                            checked={index !== -1}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    push({...perk, quantity: 1});
                                                                } else {
                                                                    remove(index);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <>
                                                            <CampaignPerkItem perk={perk}/>
                                                            {index !== -1 && (
                                                                <TextField
                                                                    label="Количество"
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    inputProps={{min: 1}}
                                                                    value={quantity}
                                                                    onChange={(e) => {
                                                                        const newQuantity = parseInt(e.target.value);
                                                                        const newPerks = [...values.perks];
                                                                        newPerks[index] = {
                                                                            ...perk,
                                                                            quantity: newQuantity
                                                                        };
                                                                        handleChange({
                                                                            target: {
                                                                                name: "perks",
                                                                                value: newPerks
                                                                            }
                                                                        });
                                                                    }}
                                                                />
                                                            )}
                                                        </>
                                                    }
                                                />
                                            );
                                        })}
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Отправить поддержку
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default DonateForm;

import * as Yup from "yup";
import {FieldArray, Form, Formik} from 'formik';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useEffect, useState} from "react";
import Thumb from "./Thumb";
import axios from "axios";
import authHeader from "../services/auth-header";
import {useNavigate} from "react-router-dom";

const CampaignForm = () => {
    const initialValues = {
        title: '',
        description: '',
        tagline: '',
        goal_amount: '',
        end_date: '',
        uploadImage: '',
        category: '',
        perks: [{
            title: '',
            description: '',
            price: ''
        }]
    };
    const [categories, setCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            navigate("/authError", { replace: true });
        }
        axios.get('http://localhost:8080/api/campaigns/categories', { headers: authHeader() })
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    });


    const validationSchema = Yup.object({
        title: Yup.string().required('Обязательное поле'),
        description: Yup.string().required('Обязательное поле'),
        tagline: Yup.string().required('Обязательное поле'),
        goal_amount: Yup.number().required('Обязательное поле').min(0, 'Цель должна быть положительной'),
        end_date: Yup.date().required('Обязательное поле'),
        uploadImage: Yup.mixed().required().test({
            message: `Файл слишком большой`,
            test: (file) => {
                return file?.size < 2000000;
            }
        }),
        category: Yup.string().required('Обязательное поле'),
        perks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Обязательное поле'),
                description: Yup.string().required('Обязательное поле'),
                price: Yup.number().required('Обязательное поле').min(0, 'Цена должна быть положительной'),
            })
        ).min(1, 'Должен быть хотя бы 1 вариант')
    });

    const handleSubmit = (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const API_URL = "http://localhost:8080/api/campaigns/";
        console.log(values);
        axios.post(API_URL, values, { headers: { Authorization: "Bearer " + user.token, 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response);
            axios.post(API_URL + response.data.message + "/perks", values.perks, { headers: authHeader() }).then(response => {
                console.log(response);
            })
                .catch(error => {
                    console.error(error);
                });
        })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form encType="multipart/form-data">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: 'auto' }}>
                        <Typography variant="h4">Создать новую кампанию</Typography>
                        <TextField label="Название" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} error={touched.title && Boolean(errors.title)} helperText={touched.title && errors.title} />
                        <TextField label="Описание" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} multiline rows={4} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} />
                        <TextField label="Краткое описание" name="tagline" value={values.tagline} onChange={handleChange} onBlur={handleBlur} error={touched.tagline && Boolean(errors.tagline)} helperText={touched.tagline && errors.tagline} />
                        <TextField type="number" label="Цель сборов в рублях" name="goal_amount" value={values.goal_amount} onChange={handleChange} onBlur={handleBlur} error={touched.goal_amount && Boolean(errors.goal_amount)} helperText={touched.goal_amount && errors.goal_amount} />
                        <input id="end_date" name="end_date" type="date" onChange={(event) => {
                            setFieldValue("end_date", event.currentTarget.value);
                        }} />
                        <Typography variant="h6">Фото кампании:</Typography>
                        <input id="file" name="file" type="file" accept='image/*' onChange={(event) => {
                            setFieldValue("uploadImage", event.currentTarget.files[0]);
                        }} />
                        <Thumb file={values.uploadImage} />
                        <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                            <InputLabel>Категория</InputLabel>
                            <Select label="Категория" name="category" value={values.category} onChange={handleChange} onBlur={handleBlur}>
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                            {touched.category && errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                        </FormControl>
                        <Typography variant="h6">Опции:</Typography>
                        <FieldArray name="perks">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.perks.length > 0 &&
                                        values.perks.map((perk, index) => (
                                            <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '5px' }} key={index}>
                                                <TextField
                                                    fullWidth
                                                    label="Название"
                                                    name={`perks[${index}].title`}
                                                    value={perk.title}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors?.perks?.[index]?.title) && Boolean(touched?.perks?.[index]?.title)}
                                                    helperText={touched?.perks?.[index]?.title && errors?.perks?.[index]?.title}
                                                    required
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Описание"
                                                    name={`perks[${index}].description`}
                                                    value={perk.description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors?.perks?.[index]?.description) && Boolean(touched?.perks?.[index]?.description)}
                                                    helperText={touched?.perks?.[index]?.description && errors?.perks?.[index]?.description}
                                                    required
                                                />
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    label="Цена"
                                                    name={`perks[${index}].price`}
                                                    value={perk.price}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={Boolean(errors?.perks?.[index]?.price) && Boolean(touched?.perks?.[index]?.price)}
                                                    helperText={touched?.perks?.[index]?.price && errors?.perks?.[index]?.price}
                                                    required
                                                />
                                                <IconButton onClick={() => remove(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => push({ title: '', description: '', price: '' })}
                                    >
                                        Добавить опцию
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                        <Button type="submit" variant="contained" color="primary">
                            Создать
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default CampaignForm;

import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CampaignPerkForm = ({ perk, deletePerk, index }) => {
    const initialValues = {
        title: perk.title,
        description: perk.description,
        price: perk.price,
    };

    const validationSchema = yup.object({
        title: yup.string().required('Required'),
        description: yup.string().required('Required'),
        price: yup.number().required('Required').min(0, 'Price must be positive'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: '10px',
            }}
        >
            <form onSubmit={formik.handleSubmit} style={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <TextField
                        fullWidth
                        label="Title"
                        name={`perks[${index}].title`}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name={`perks[${index}].description`}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        required
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Price"
                        name={`perks[${index}].price`}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        required
                    />
                    <IconButton onClick={deletePerk}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Box>
                    {formik.errors.title || formik.errors.description || formik.errors.price ? (
                        <Box sx={{ color: 'red' }}>Please fill in all the fields</Box>
                    ) : null}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <button type="submit" style={{ display: 'none' }} />
                </Box>
            </form>
        </Box>
    );
};

export default CampaignPerkForm;

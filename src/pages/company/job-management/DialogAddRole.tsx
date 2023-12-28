import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
// import { useForm } from 'react-hook-form'
// import * as Yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Autocomplete, CircularProgress } from '@mui/material'
import JobCategory from 'src/contract/models/job_category'
// import RoleType from 'src/contract/models/role_type'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
// })

type DialogProps = {
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
}

const DialogAddRole = (props: DialogProps) => {
    const [onLoading, setOnLoading] = useState(false);
    const [CatId, setCatId] = useState(0);
    const [JobCategory, getJobCategory] = useState<any[]>([]);
    const [Name, setSetName] = useState('');
    const combobox = async () => {

        HttpClient.get(`/job-category?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getJobCategory(response.data.categories.data);
        })
    }

    useEffect(() => {
        combobox()
    }, [])

    // const { handleSubmit, register } = useForm<RoleType>({
    //     mode: 'onBlur',
    //     resolver: yupResolver(validationSchema)
    // })

    // const onSubmit = async (formData: RoleType) => {
    //     const { name } = formData
    //     const json = {
    //         "name": name,
    //         "category_id": CatId
    //     }
        
    //     setOnLoading(true);
    //     try {
    //         const resp = await HttpClient.post('/role-type', json);
    //         if (resp.status != 200) {
    //             throw resp.data.message ?? "Something went wrong!";
    //         }

    //         props.onCloseClick();
    //         toast.success(`${json.name} submited successfully!`);
    //     } catch (error) {
    //         toast.error(`Opps ${getCleanErrorMessage(error)}`);
    //     }

    //     setOnLoading(false);
    //     props.onStateChange();
    // }
    const simpan = async () => {
         const json = {
            "name": Name,
            "category_id": CatId
        }
        
        setOnLoading(true);
        try {
            const resp = await HttpClient.post('/role-type', json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${json.name} submited successfully!`);
        } catch (error) {
            toast.error(`Opps ${getCleanErrorMessage(error)}`);
        }

        setOnLoading(false);
        props.onStateChange();
    }

    return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='sm'
            scroll='body'
            TransitionComponent={Transition}
        >
            <form noValidate autoComplete='off'   >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <IconButton
                        size='small'
                        sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                        onClick={props.onCloseClick}
                    >
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Add New Job Title
                        </Typography>
                        <Typography variant='body2'>Add Job Title</Typography>
                    </Box>
                    <Grid container spacing={6}>
                        <Grid item md={12} xs={12} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={JobCategory}
                                getOptionLabel={(option: JobCategory) => option.name}
                                renderInput={(params) => <TextField {...params} label="Job Category" />}
                                onChange={(event: any, newValue: JobCategory | null) => (newValue?.id) ? setCatId(newValue.id) : setCatId(0)}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <TextField label='Job Title Name'
                                placeholder='Job Title Name'
                                fullWidth sx={{ mb: 6 }}
                                onChange={e => setSetName(e.target.value)} 
                                value={Name}
                                 />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Button variant='contained' sx={{ mr: 2 }} onClick={() => simpan()}>
                        {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={props.onCloseClick}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DialogAddRole

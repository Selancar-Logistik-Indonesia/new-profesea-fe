import { Ref, useState, forwardRef, ReactElement } from 'react'
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
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { HttpClient } from 'src/services'
import JobCategory from 'src/contract/models/job_category'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Autocomplete, CircularProgress } from '@mui/material'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

const code = [
    { employee_type: 'onship', label: 'On-Ship' },
    { employee_type: 'offship', label: 'Off-Ship' }
]

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

type EditProps = {
    selectedItem: JobCategory;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

const DialogEdit = (props: EditProps) => {
    const [onLoading, setOnLoading] = useState(false);
    const [sType, setsType] = useState('');

    const { handleSubmit, register } = useForm<JobCategory>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (formData: JobCategory) => {
        const { name } = formData
        const json = {
            "name": name,
            "employee_type": sType
        }

        setOnLoading(true);
        try {
            const resp = await HttpClient.patch(`/job-category/${props.selectedItem.id}`, json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`Updated successfully!`);
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
            onClose={props.onCloseClick}
            TransitionComponent={Transition}
        >
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }} >
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18}>
                            Edit Job Category
                        </Typography>
                        <Typography variant='body2'>Fulfill your Job Categories Info here</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item sm={12} xs={12}>
                            <TextField label='Category Name'
                                placeholder='Category Name'
                                defaultValue={props.selectedItem.name}
                                fullWidth {...register("name")} />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={code.find(x => x.employee_type === props?.selectedItem?.employee_type)}
                                options={code}
                                getOptionLabel={(option: any) => option.label}
                                renderInput={(params) => <TextField {...params} label="Employee Type" />}
                                onChange={(event: any, newValue: any | null) => (newValue?.employee_type) ? setsType(newValue.employee_type) : setsType('')}
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
                    <Button variant='contained' size="small" sx={{ mr: 2 }} type='submit'>
                        <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
                        {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                    </Button>
                    <Button variant='outlined' size="small" color='error' onClick={props.onCloseClick}>
                        <Icon
                            fontSize='large'
                            icon={'material-symbols:cancel-outline'}
                            color={'info'}
                            style={{ fontSize: '18px' }}
                        />
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DialogEdit;
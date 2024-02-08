import { Ref, forwardRef, ReactElement, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import FormAddSeafarer from './form/FormAddSeafarer'
import FormAddNonSeafarer from './form/FormAddNonSeafarer'
// import { v4 } from 'uuid'
// import DialogAddRole from './DialogAddRole'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}
const DialogAdd = (props: DialogProps) => {
  const [alignment, setAlignment] = useState('seafarer')

  // const combobox = async () => {
  //   HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getRoleLevel(response.data.roleLevels.data)
  //   })
  //   HttpClient.get(`/public/data/role-type?search=&page=1&take=250`).then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getRoleType(response.data.roleTypes.data)
  //   })
  //   HttpClient.get(`/job-category?search=&page=1&take=250`).then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getJobCategory(response.data.categories.data)
  //   })
  //   HttpClient.get(`/public/data/degree`).then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getEducation(response.data.degrees)
  //   })
  //   HttpClient.get('/public/data/country?search=').then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getComboCountry(response.data.countries)
  //   })
  //   HttpClient.get('/public/data/vessel-type?page=1&take=250&search=').then(response => {
  //     if (response.status != 200) {
  //       throw response.data.message ?? 'Something went wrong!'
  //     }
  //     getVesselType(response.data.vesselTypes.data)
  //   })
  //   const resp = await HttpClient.get('/public/data/city?search=&country_id=' + 100)
  //   if (resp.status != 200) {
  //     throw resp.data.message ?? 'Something went wrong!'
  //   }
  //   const code = resp.data.cities
  //   getComboCity(code)

  //   const resp2 = await HttpClient.get(`/licensi/all`)
  //   if (resp2.status != 200) {
  //     throw resp2.data.message ?? 'Something went wrong!'
  //   }
  //   getlicenseData(resp2.data.licensiescoc)
  // }

  const handleChangeToggle = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      {alignment === 'seafarer' ? (
        <FormAddSeafarer dialogProps={props} alignment={alignment} handleChangeToggle={handleChangeToggle} />
      ) : (
        <FormAddNonSeafarer dialogProps={props} alignment={alignment} handleChangeToggle={handleChangeToggle} />
      )}
    </Dialog>
  )
}

export default DialogAdd

// ** React Imports
import React, { useState } from 'react'

import { Button,  CircularProgress, Box } from '@mui/material'
// ** Layout Import
 
import { toast } from 'react-hot-toast'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import Alumni from 'src/contract/models/alumni'
import { v4 } from 'uuid'
import DialogDelete from 'src/pages/alumni/DialogDelete'
import DialogJoin from 'src/pages/alumni/DialogJoin'
// import Link from 'next/link'
  

const ButtonJoinAlumni = (props: { selectedAlumni: any; iduser: any; onMessage: (message: string) => void ;url:string}) => {
  const { selectedAlumni } = props
  const { iduser } = props
  const { onMessage } = props
  const {url} =props
  const [isLoading, setIsLoading] = useState(false) 
  const [hookSignature, setHookSignature] = useState(v4())
  const [selectedItem, setSelectedItem] = useState<Alumni | null>(null) 
  const [selectedItem2, setSelectedItem2] = useState<Alumni | null>(null) 
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openJoinModal2, setOpenDelModal2] = useState(false)
  const buildConnectText = () => {
    return selectedAlumni.statusmember
  }
  const joinAlumni = async () => {
    debugger;
    JoinHandler(selectedAlumni);
     
   
  }

   const deleteHandler = (row: Alumni) => {
     setSelectedItem(row)
     setOpenDelModal(true)
      console.log(hookSignature)
   }
   const JoinHandler = (row: Alumni) => {
     setSelectedItem2(row)
     setOpenDelModal2(true)
     console.log(hookSignature)
   }

  return (
    <>
      {selectedAlumni.user_id == iduser ? (
        <Box mr={2}>
          <Button onClick={() => deleteHandler(selectedAlumni)} variant={'contained'} size='small' color='error'>
            DELETE
          </Button>
        </Box>
      ) : (
        <Button onClick={() => JoinHandler(selectedAlumni)} variant={'contained'} size='small'>
          {isLoading ? <CircularProgress /> : buildConnectText()}
        </Button>
      )}

      {selectedItem2 && (
        <>
          <DialogJoin
            selectedItem={selectedItem2}
            iduser={iduser}
            visible={openJoinModal2}
            onMessage={onMessage}
            setIsLoading={setIsLoading}
            url={url}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenDelModal2(!openJoinModal2)}
          />
        </>
      )}
      {selectedItem && (
        <>
          <DialogDelete
            selectedItem={selectedItem} 
            visible={openDelModal} 
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenDelModal(!openDelModal)}
          />
        </>
      )}
    </>
  )
}


ButtonJoinAlumni.acl = {
  action: 'read',
  subject: 'home'
};
export default ButtonJoinAlumni

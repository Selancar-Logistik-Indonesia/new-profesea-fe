// ** React Imports
import React, { useState } from 'react'

import { Button,  CircularProgress, Box } from '@mui/material'
// ** Layout Import
 
import { toast } from 'react-hot-toast'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import Group from 'src/contract/models/group'
import { v4 } from 'uuid'
import DialogDelete from 'src/pages/group/DialogDelete'
// import Link from 'next/link'
  

const ButtonJoinGroup = (props: { selectedGroup: any; iduser: any; onMessage: (message: string) => void ;url:string}) => {
  const { selectedGroup } = props
  const { iduser } = props
  const { onMessage } = props
  const {url} =props
  const [isLoading, setIsLoading] = useState(false) 
  const [hookSignature, setHookSignature] = useState(v4())
  const [selectedItem, setSelectedItem] = useState<Group | null>(null) 
  const [openDelModal, setOpenDelModal] = useState(false)
  const buildConnectText = () => {
    return selectedGroup.statusmember
  }
  const joinGroup = async () => {
    const json = {
      idgroup: selectedGroup.id,
      iduser: iduser
    }
    setIsLoading(true)
    try {
      console.log(json)
      onMessage('ganticuk')
      const resp = await HttpClient.post(url, json)
      setIsLoading(false)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong create group!'
      }

      // toast.success(` Create Group successfully!`)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

   const deleteHandler = (row: Group) => {
     setSelectedItem(row)
     setOpenDelModal(true)
      console.log(hookSignature)
   }

  return (
    <>
      {selectedGroup.user_id == iduser && (
        <Box mr={2}>
          <Button onClick={() => deleteHandler(selectedGroup)} variant={'contained'} size='small' color='error'>
            DELETE
          </Button>
        </Box>
      )}
      <Button onClick={() => joinGroup()} variant={'contained'} size='small'>
        {isLoading ? <CircularProgress /> : buildConnectText()}
      </Button>
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


ButtonJoinGroup.acl = {
  action: 'read',
  subject: 'home'
};
export default ButtonJoinGroup

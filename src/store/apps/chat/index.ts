// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

// ** Types
import { Dispatch } from 'redux'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { SendMsgParamsType } from 'src/types/apps/chatTypes'

const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
   
  return user
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
   // const response = await axios.get('/apps/chat/chats-and-contacts')
  const response = await axios.get('/messanger?page=1&take=25')  
  const response2 = await axios.get('/friendship/friends?page=1&take=25&search')
  
  for (let x = 0; x < response.data.messangers.data.length; x++) {
    const element = response.data.messangers.data[x]
    element.name = element.participants[0].name
    element.friend_id = element.participants[0].id
  }
  for (let i = 0; i < response2.data.friends.data.length; i++) {
    const element = response2.data.friends.data[i]
    element.id_chat=0
    for (let x = 0; x < response.data.messangers.data.length; x++) {
      if(element.friend_id ==  response.data.messangers.data[x].friend_id){
        element.id_chat = response.data.messangers.data[x].id
        break;
      }
    }    
  }
  const hasil = {
    contacts: response2.data.friends,
    chat: response.data.messangers
  } 
  
  return hasil
})
  
// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (id: number | string, { dispatch }: { dispatch: Dispatch<any> }) => {
    if(id!= 0){
      const response = await axios.get('/messanger/' + id, {
        params: {
          page: 1,
          take: 25
        }
      })
      await dispatch(fetchChatsContacts())

      return response.data.contents
    } else{

      return null
    }

  }
)

export const headerChatFromContact = createAsyncThunk(
  'appChat/header',
  async (header: any ) => {
    
    if (header) {
      const arr: any = {
        name: header.friend?.name,
        photo: header.friend?.photo,
        is_online: header.friend?.is_online,
        id: header.friend?.id
      }

      return arr
    }     

  }
)
export const headerChatFromParam= createAsyncThunk('appChat/header', async (header: any) => {
  debugger
  if (header) {
    const arr: any = {
      name: header?.name,
      photo: header?.photo,
      is_online: header?.is_online,
      id: header?.id
    }

    return arr
  }
})
 export const headerChat = createAsyncThunk('appChat/header', async (header: any) => {
  if(header){
    const arr: any = {
      name: header.participants[0]?.name,
      photo: header.participants[0]?.photo,
      is_online: header.participants[0]?.is_online,
      id: header.participants[0]?.id
    }

    return arr
  }     

        
 })
// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  
   const response = await HttpClient.post(AppConfig.baseUrl + '/messanger/send-message', {
       messanger_id: obj.data[0].messanger_id,
       content: obj.message     
   })
  await dispatch(selectChat(obj.data[0].messanger_id))
  await dispatch(fetchChatsContacts())

  return response.data
})
export const sendNewMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  debugger
  const create = await HttpClient.post(AppConfig.baseUrl + '/messanger/inititate', {
    friend_id: obj.id,
    })
  const idroom = create.data.messanger.id
  const response = await HttpClient.post(AppConfig.baseUrl + '/messanger/send-message', {
    messanger_id: idroom,
    content: obj.message
  })
  await dispatch(selectChat(idroom))
  await dispatch(fetchChatsContacts())

  return response.data
})

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: null,
    contacts: null,
    userProfile: user,
    selectedChat: null,
    headerchat: null
  },
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts.data
      state.chats = action.payload.chat.data
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
    
    builder.addCase(headerChat.fulfilled, (state, action) => {
      state.headerchat = action.payload
    })
  }
})

export const { removeSelectedChat } = appChatSlice.actions

export default appChatSlice.reducer

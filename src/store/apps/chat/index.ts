// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios, { AxiosResponse } from 'axios'
import secureLocalStorage from 'react-secure-storage'

// ** Types
import { Dispatch } from 'redux'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { SendMsgParamsType } from 'src/types/apps/chatTypes'

const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  // const response = await new Promise<AxiosResponse>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: {
  //         id: 11,
  //         avatar: '/images/avatars/1.png',
  //         fullName: 'John Doe',
  //         role: 'admin',
  //         about:
  //           'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
  //         status: 'online',
  //         settings: {
  //           isTwoStepAuthVerificationEnabled: true,
  //           isNotificationsOn: false
  //         }
  //       }
  //     } as AxiosResponse)
  //   }, 1000)
  // })
  return user
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
   // const response = await axios.get('/apps/chat/chats-and-contacts')
  const response = await axios.get('/messanger?page=1&take=25')  
  // const response = await new Promise<AxiosResponse>((resolve, reject) => {
  //   setTimeout(() => {
  //       resolve({
  //         data: {
  //           'name': "test",
            
  //         }
  //       } as AxiosResponse);
  //   }, 1000);
  // })

  return response.data.messangers
})

// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (id: number | string, { dispatch }: { dispatch: Dispatch<any> }) => {
    const response = await axios.get('/messanger/'+ id, {
      params: { 
        page:1,
        take:25
      }
    })
    await dispatch(fetchChatsContacts())

    return response.data.contents
  }
)
export const headerChat = createAsyncThunk(
  'appChat/header',
  async (header: any ) => {
    
    return header
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', {
    data: {
      obj
    }
  })
  if (obj.contact) {
    await dispatch(selectChat(obj.contact.id))
  }
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
      state.contacts = action.payload.contacts
      state.chats = action.payload.data
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

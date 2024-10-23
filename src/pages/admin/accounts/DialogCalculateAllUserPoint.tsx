import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
import { HttpClient } from 'src/services'

interface IDialogCalculateAllUserPointProps {
    visible:boolean
    onCloseClick:VoidFunction
}

export default function DialogCalculateAllUserPoint(props:IDialogCalculateAllUserPointProps){

    const [usersId, setUserdId] = useState([]); // only collections user ID [1,2,3 ..]
    const [totalUser, setTotalUser] = useState(0) // total user that already calculated 
    const [itemResult, setItemResult] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const fetchUsersId = async () => {
        setLoading(true)
        try {
            const response = await HttpClient.get('/public/data/usersId');
            const userResponse = response?.data?.data?.map((item:any) => {
                return item.id
            })
            setUserdId(userResponse)
        } catch(err) {
            console.log(" error : ", err)
        }
        
    }

    const calculateEachUser = () => {
        return usersId.map( async(userId:number) => {
            try{
                const calculate = await HttpClient.get(`/public/data/user/calculate-point/${userId}`)
                setTotalUser(totalUser + 1)
                const newItem : any = itemResult.push(calculate.data)
                setItemResult(newItem)
                
                return calculate
            } catch(err) {
                console.log("error : ", err)
                
                return null
            }
            
        })
    }

    useEffect(() => {
        const promises = calculateEachUser()
        Promise.all(promises).then(() => {
            setLoading(false)
        })
    },[usersId])
    
    useEffect(() => {

    }, [])

    const handleClickCalculateAllButton = () => {
        fetchUsersId()
    }

    return (<Dialog open={props.visible} scroll="paper" maxWidth={'md'} fullWidth >
         <DialogTitle id="scroll-dialog-title">
            User Calculation Point 
           
            <div>
            Total User Calculation : {totalUser}
            </div>
         </DialogTitle>
         <DialogContent sx={{ height:200}}>
            <Box>
                <table style={{ width:"100%", border:'1px solid black'}} border={1}  >
                    <thead>
                        <th> Name </th>
                        <th> Point </th>
                        <th> Detail </th>
                    </thead>
                    <tbody>
                    {itemResult?.map((item:any, index) => {
                        return (<tr key={index}>
                            <td>{item?.profile.name}</td>
                            <td>{item?.point}</td>
                            <td>{JSON.stringify(item?.detail_point)}</td>
                        </tr>)
                    })}
                    </tbody>
                </table>
               
            </Box>
         </DialogContent>
        <DialogActions>
            <Button disabled={loading} variant="contained" onClick={() => {
                handleClickCalculateAllButton()
            }}> {loading ? "Calculating ... " : "Start Calculation" }</Button>
        </DialogActions>
    </Dialog>)
}
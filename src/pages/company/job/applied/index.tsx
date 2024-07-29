import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useState } from 'react'
import AppliedDataGrid, { RowItem } from './AppliedDataGrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Applicant from 'src/contract/models/applicant'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'
import { v4 } from 'uuid'
import DialogView from './DialogView'
import { Button, Typography } from '@mui/material'
// import JobCategory from 'src/contract/models/job_category'
// import RoleType from 'src/contract/models/role_type'
// import VesselType from 'src/contract/models/vessel_type'
import { Icon } from '@iconify/react'
import { subscribev } from 'src/utils/helpers'
import BasicFilter from './BasicFilter'
import Job from 'src/contract/models/job'
import AdvancedFilter from './AdvancedFilter'
import axios from 'axios'
import { useRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'

const status: any[] = [
  { id: 'AP', title: 'Approved' },
  { id: 'RJ', title: 'Rejected' },
  { id: 'PR', title: 'Proceed' },
  { id: 'VD', title: 'Viewed' },
  { id: 'WR', title: 'Waiting Review' }
]

// const dokumen = [
//   { title: 'Certificate of Competency', docType: 'COC' },
//   { title: 'Certificate of Profeciency', docType: 'COP' },
//   { title: 'Certificate of Recognition', docType: 'COR' },
//   { title: 'Certificate of Endorsement', docType: 'COE' },
//   { title: 'Other Certificate', docType: 'OTH' },
//   { title: 'MCU Certificates', docType: 'MCU' }
// ]

interface IJobAppliedProps {
  jobDetail: Job | undefined
}

const JobApplied = (props: IJobAppliedProps) => {
  const jobDetail = props.jobDetail
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const plan = params.get('plan')
  const searchCandidate = params.get('applicant')

  const [collapsed, setCollapsed] = useState<boolean>(plan === 'advance' ? false : true)
  const [collapsedAdvanced, setCollapsedAdvanced] = useState<boolean>(true)
  // const [JobCategory, getJobCategory] = useState<any[]>([])
  // const [JobTitle, getJobTitle] = useState<any[]>([])
  // const [VesselType, getVesselType] = useState<any[]>([])
  // const [combocode, getCombocode] = useState<any[]>([])
  //   const [textCandidate, SetTextCandidate] = useState<any>('')
  // const [sJobCategory, setJobCategory] = useState<any>('')
  // const [sJobTitle, setJobTitle] = useState<any>('')
  // const [sVesselType, setVesselType] = useState<any>('')
  // const [comboShip, getShip] = useState<any>([])
  const [comboStatus, getStatus] = useState<any>([])
  const [statusOnBoard, setStatusOnBoard] = useState<any>('')
  // const [values, setValues] = useState<any[]>([])
  // const [currValue, setCurrValue] = useState('')
  // const [valuesoneword, setValuesOneWord] = useState<any[]>([])
  // const [currValueoneword, setCurrValueOneWord] = useState('')
  // const [valuesexclude, setValuesExclude] = useState<any[]>([])
  // const [currValueexclude, setCurrValueExclude] = useState('')
  // const [valueslitle, setValuesLitle] = useState<any[]>([])
  // const [currValuelitle, setCurrValueLitle] = useState('')
  const [showadvance, setShowAdvance] = useState<boolean>(true)
  // const [showadvance2, setShowAdvance2] = useState<boolean>(true)
  const [experience, setExperience] = useState<any>('')
  const [education, setEducation] = useState<any>('')
  const [licenseCOC, setLicenseCOC] = useState<any>([])
  const [licenseCOP, setLicenseCOP] = useState<any>([])
  const [language, setLanguage] = useState<any>(null)
  const [citizenship, setCitizenship] = useState<any>(null)
  const [isVisaUSA, setIsVisaUSA] = useState<boolean>(false)
  const [isVisaSchengen, setIsVisaSchengen] = useState<boolean>(false)

  useEffect(() => {
    const a = subscribev(['A19'])
    if (a == true) {
      setShowAdvance(true)
      //  setCollapsed2(true)
      setCollapsed(true)
    }
  }, [])

  const [hookSignature, setHookSignature] = useState(v4())
  const [onLoading, setOnLoading] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [selectedItem, setSelectedItem] = useState<Applicant | null>(null)
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(10)

  const getListApplicant = async () => {
    console.log('coc =>', licenseCOC) // nanti bakal ada filter by license COC
    console.log('cop =>', licenseCOP) // nanti bakal ada filter by license COP
    console.log('language =>', language)
    console.log('citizenship =>', citizenship)
    console.log('is visa usa =>', isVisaUSA)
    console.log('is bisa schengen =>', isVisaSchengen)
    try {
      // const resp = await HttpClient.get(
      //   `/job/${params.get('id')}/appllicants?` +
      //     'vesseltype_id=' +
      //     sVesselType +
      //     '&roletype_id=' +
      //     sJobTitle +
      //     '&rolelevel_id=' +
      //     sJobCategory +
      //     '&employee_type=' +
      //     comboShip +
      //     '&status=' +
      //     comboStatus +
      //     `&experience=${experience}&status_onboard=${statusOnBoard}&education=${education}&search=${search}&page=${page}&take=${perPage}`
      // )

      const resp = await HttpClient.get(
        `/job/${params.get('id')}/appllicants?` +
          `experience=${experience}&status_onboard=${statusOnBoard}&education=${education}&search=${
            searchCandidate || search
          }&page=${page}&take=${perPage}`
      )

      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.applicants.data as Applicant[]
      const items = rows.map((row, index) => {
        const a = subscribev(['A19'])

        return {
          no: index + 1,
          id: row.id,
          user_id: row.user_id,
          name: row.user?.name,
          username: row?.user?.username,
          category: row.user?.employee_type,
          email: row.user?.email,
          phone: row.user?.phone,
          status: status.find(e => e.id === row.status).title,
          subsribed: a,
          actions: {
            onView: () => viewHandler(row),
            onDownload: () => resumeHandler(row),
            onApprove: () => handleApprove(row),
            onReject: () => handleReject(row),
            onSave: () => handleSaved(row),
            onChat: () => handleChat(row)
          }
        } as RowItem
      })

      setRowCount(resp.data.applicants?.total ?? 0)
      setDataSheet(items)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  const handleApprove = async (row: Applicant) => {
    try {
      const response = await HttpClient.patch(`/job/appllicant/proceed`, { applicant_id: row.id })

      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      const newSatus = response?.data?.applicant?.status

      setDataSheet(prevState => {
        return prevState.map(p => ({
          ...p,
          status: p.id == row?.id ? status.find(e => e.id === newSatus).title : p.status
        }))
      })

      toast.success(`${row?.user?.name} proceed successfully!`)
    } catch (error) {
      console.error(error)
      toast.error(`${row?.user?.name} proceed failed, Something went wrong!`)
    }
  }

  const handleReject = async (row: Applicant) => {
    try {
      const resp = await HttpClient.patch(`/job/appllicant/reject`, { applicant_id: row.id })
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const newSatus = resp?.data?.applicant?.status

      setDataSheet(prevState => {
        return prevState.map(p => ({
          ...p,
          status: p.id == row?.id ? status.find(e => e.id === newSatus).title : p.status
        }))
      })

      toast.success(`${row?.user?.name} rejected successfully!`)
    } catch (error) {
      console.error(error)
      toast.error(`${row?.user?.name} rejected failed, Something went wrong!`)
    }
  }

  const handleSaved = async (row: Applicant) => {
    try {
      const resp = await HttpClient.post(`/directory/save`, {
        dirable_id: row?.user_id,
        dirable_type: 'user'
      })
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      toast.success(`${row.user?.name} saved successfully!`)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (axios.isAxiosError(error)) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      toast.error(`${row?.user?.name} save failed, ${errorMessage}`)
    }
  }

  const handleChat = (row: Applicant) => {
    if (!row?.user?.phone) {
      return
    }

    // Fungsi regex untuk menggantikan 0 di depan dengan +62
    const formattedPhone = row?.user?.phone.startsWith('0')
      ? row?.user?.phone.replace(/^0/, '+62')
      : `+62${row?.user?.phone}`

    // URL WhatsApp dengan nomor yang telah diformat
    const whatsappUrl = `https://wa.me/${formattedPhone}`

    // Membuka tab baru dengan URL WhatsApp
    window.open(whatsappUrl, '_blank')
    // window.location.replace('/chat?username=' + row?.user.username)
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    []
  )

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  const viewHandler = (row: Applicant) => {
    setSelectedItem(row)
    setOpenViewModal(true)
  }

  const resumeHandler = (row: Applicant) => {
    HttpClient.get(`/user/${row.user_id}/profile/resume`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      // hit endpoint update status  { id: 'VD', title: 'Viewed' },
      handlerUpdateStatusApplicantToViewed(row)

      window.open(`${response.data?.path}`, '_blank', 'noreferrer')
    })
  }

  const handlerUpdateStatusApplicantToViewed = (row: Applicant) => {
    HttpClient.patch(`/job/appllicant/resume/view`, { applicant_id: row.id })
      .then(response => {
        if (response?.status != 200) {
          throw response.data.message ?? 'Something went wrong!'
        }

        const newSatus = response?.data?.applicant?.status

        setDataSheet(prevState => {
          return prevState.map(p => ({
            ...p,
            status: p.id == row?.id ? status.find(e => e.id === newSatus).title : p.status
          }))
        })
      })
      .catch(error => console.log(error))
  }

  // const handleKeyUp = (e: any) => {
  //   console.log(e.keyCode)
  //   if (e.keyCode == 32) {
  //     //    getdatapencarian()
  //   }
  // }

  // const handleKeyDown = (e: any, x: any) => {
  //   if (e.keyCode == 32) {
  //     if (x == 1) {
  //       setValues(oldState => [...oldState, e.target.value])
  //       setCurrValue('')
  //     } else if (x == 2) {
  //       setValuesOneWord(oldState => [...oldState, e.target.value])
  //       setCurrValueOneWord('')
  //     } else if (x == 3) {
  //       setValuesExclude(oldState => [...oldState, e.target.value])
  //       setCurrValueExclude('')
  //     } else if (x == 4) {
  //       setValuesLitle(oldState => [...oldState, e.target.value])
  //       setCurrValueLitle('')
  //     }
  //   }
  // }

  // const handleChange = (e: any, x: any) => {
  //   if (x == 1) {
  //     setCurrValue(e.value)
  //   } else if (x == 2) {
  //     setCurrValueOneWord(e.value)
  //   } else if (x == 3) {
  //     setCurrValueExclude(e.value)
  //   } else if (x == 4) {
  //     setCurrValueLitle(e.value)
  //   }
  // }

  // const handleDelete = (item: any, index: any, x: any) => {
  //   if (x == 1) {
  //     const arr = [...values]
  //     arr.splice(index, 1)
  //     setValues(arr)
  //   } else if (x == 2) {
  //     const arr = [...valuesoneword]
  //     arr.splice(index, 1)
  //     setValuesOneWord(arr)
  //   } else if (x == 3) {
  //     const arr = [...valuesexclude]
  //     arr.splice(index, 1)
  //     setValuesExclude(arr)
  //   } else if (x == 4) {
  //     const arr = [...valueslitle]
  //     arr.splice(index, 1)
  //     setValuesLitle(arr)
  //   }
  //   // getdatapencarian();
  // }

  useEffect(() => {
    setOnLoading(true)
    getListApplicant().then(() => {
      setOnLoading(false)
    })
  }, [
    page,
    search,
    comboStatus,
    hookSignature,
    perPage,
    experience,
    statusOnBoard,
    licenseCOC,
    licenseCOP,
    language,
    citizenship,
    isVisaUSA,
    isVisaSchengen
  ])

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item lg={3} md={5} xs={12}>
          {false && ( // dihide dulu
            <>
              <BasicFilter
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                jobCategory={jobDetail?.category.employee_type}
                setExperience={setExperience}
                getStatus={getStatus}
                setStatusOnBoard={setStatusOnBoard}
                setEducation={setEducation}
              />
              <AdvancedFilter
                collapsedAdvanced={collapsedAdvanced}
                isVisaUSA={isVisaUSA}
                isVisaSchengen={isVisaSchengen}
                showadvance={showadvance}
                setCollapsedAdvanced={setCollapsedAdvanced}
                setLicenseCOC={setLicenseCOC}
                setLicenseCOP={setLicenseCOP}
                setLanguage={setLanguage}
                setCitizenship={setCitizenship}
                setIsVisaUSA={setIsVisaUSA}
                setIsVisaSchengen={setIsVisaSchengen}
              />
            </>
          )}

          {/* {showadvance2 == true && (
            <Box mb={3}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardHeader
                  title={
                    <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
                      Advanced Filter
                    </Typography>
                  }
                />
                <CardContent>
                  {showadvance != true ? (
                    <>
                      <Button href={'/account'} variant='contained' color='warning' sx={{ mr: 2 }} fullWidth>
                        Advance Filter
                      </Button>
                    </>
                  ) : (
                    <>
                      <Autocomplete
                        disablePortal
                        id='code'
                        options={dokumen}
                        getOptionLabel={(option: any) => option.title}
                        // defaultValue={props.datauser?.country}
                        renderInput={params => <TextField {...params} label='License' sx={{ mb: 2 }} />}
                        // onChange={(event: any, newValue: Dokumen | null) =>
                        //   newValue?.id ? searchcity(newValue.id) : searchcity(0)
                        // }
                        sx={{ marginBottom: 2 }}
                      />
                      <Typography>Including all these words</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {values.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 1)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValue}
                            onChange={e => handleChange(e, '1')}
                            onKeyDown={e => handleKeyDown(e, '1')}
                            onKeyUp={handleKeyUp}
                            id='1'
                            name='1'
                          />
                        </div>
                      </FormControl>

                      <Typography>include one word</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valuesoneword.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 2)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValueoneword}
                            onChange={e => handleChange(e, '2')}
                            onKeyDown={e => handleKeyDown(e, '2')}
                            onKeyUp={handleKeyUp}
                            id='2'
                            name='2'
                          />
                        </div>
                      </FormControl>

                      <Typography>Excluding all these words</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valuesexclude.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 3)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValueexclude}
                            onChange={e => handleChange(e, '3')}
                            onKeyDown={e => handleKeyDown(e, '3')}
                            onKeyUp={handleKeyUp}
                          />
                        </div>
                      </FormControl>
                      <Typography>Including these words in the title</Typography>
                      <FormControl>
                        <div className={'container'}>
                          {valueslitle.map((item, index) => (
                            <Chip
                              color='primary'
                              size='small'
                              onDelete={() => handleDelete(item, index, 4)}
                              label={item}
                              key={item}
                            />
                          ))}
                          <Input
                            value={currValuelitle}
                            onChange={e => handleChange(e, '4')}
                            onKeyDown={e => handleKeyDown(e, '4')}
                            onKeyUp={handleKeyUp}
                          />
                        </div>
                      </FormControl>
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>
          )} */}
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              {params.get('plan') === 'advance' && (
                <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                  List Applicants
                </Typography>
              )}

              <Grid
                container
                sx={{ display: 'flex', justifyContent: searchCandidate ? 'space-between' : 'flex-end', mb: 2 }}
              >
                {searchCandidate && (
                  <Button
                    variant='outlined'
                    sx={{ textTransform: 'none', ml: '4px', borderRadius: '18px !important', px: '12px !important' }}
                    endIcon={<Icon icon='mdi:clear-circle-outline' color='#32497A' />}
                    onClick={() => router.push(pathname + '?id=' + jobDetail?.id + '&tabs=2')}
                  >
                    {searchCandidate}
                  </Button>
                )}
                <TextField
                  disabled={searchCandidate === ''}
                  size='small'
                  placeholder='Search'
                  onChange={e => handleSearch(e.target.value)}
                />
              </Grid>

              <AppliedDataGrid
                page={page - 1} // di MUI page pertama = 0
                rowCount={rowCount}
                pageSize={perPage}
                loading={onLoading}
                onPageChange={model => onPageChange(model)}
                rows={dataSheet}
                subsribed={showadvance}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {selectedItem && (
        <>
          <DialogView
            key={selectedItem.id}
            selectedItem={selectedItem}
            visible={openViewModal}
            onCloseClick={() => setOpenViewModal(!openViewModal)}
            onStateChange={() => setHookSignature(v4())}
          />
        </>
      )}
    </>
  )
}

JobApplied.acl = {
  action: 'read',
  subject: 'company-job-applied'
}

export default JobApplied

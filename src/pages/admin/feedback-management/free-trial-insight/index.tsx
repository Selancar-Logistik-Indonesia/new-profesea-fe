import { Icon } from '@iconify/react'
import { Box, Breadcrumbs, Grid, InputAdornment, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import { PieChart } from '@mui/x-charts/PieChart'
import TableUser from 'src/views/admin/feedback-management/TableUser'
import { HttpClient } from 'src/services'
import { IFeedbackAnalytic, IFeedbackRowData, IUserFeedback } from 'src/contract/models/feedback'
import { formatDate } from 'src/@core/utils/format'
import { GridPaginationModel } from '@mui/x-data-grid'

type QuizType = { question: string; detail: string; value: number; color: string; key: string }

const tabsOption = [
  { value: 'comapny', label: 'Company' },
  { value: 'candidate', label: 'User' }
]

const section = [
  {label: 'Quiz 1', value:'Feedback Company 1'},
  {label: 'Quiz 2', value:'Feedback Company 2'},
  {label: 'Quiz 3', value:'Feedback Company 3'},
  {label: 'Quiz 4', value:'Feedback Company 4'},
]

const quizList: QuizType[] = [
  {
    question: 'Unlimited Active Job Postings',
    detail: 'Post as many jobs as you need. No limits.',
    key: 'job_post',
    color: '#005F73',
    value: 0
  },
  {
    question: 'Boost Job Visibility',
    detail:
      'Make one of your job appear at the top of search results and get more views to reach more candidates faster.',
    key: 'boost_job',
    color: '#0A9396',
    value: 0
  },
  {
    question: 'Message Candidates Directly',
    detail: 'Send messages to candidates directly — no middle steps.',
    key: 'message_candidate',
    color: '#94D2BD',
    value: 0
  },
  {
    question: 'Offer Job Instantly',
    detail: 'Send offers right away to the candidates you want to hire, with no waiting.',
    key: 'offer_job',
    color: '#E9D8A6',
    value: 0
  },
  {
    question: 'Customized URLs',
    detail: 'Customize your profile link for easy sharing.',
    key: 'customize_url',
    color: '#EE9B00',
    value: 0
  },
  {
    question: 'Access Smart Candidate Recommendations',
    detail: 'View a curated list of candidates matched to your job by skills and experience.',
    key: 'smart_candidate',
    color: '#CA6702',
    value: 0
  },
  {
    question: 'Manage Your Hiring Pipeline',
    detail: 'Track and manage candidates through every hiring stage — from application to hire.',
    key: 'hiring_pipeline',
    color: '#BB3E03',
    value: 0
  },
  {
    question: 'Saved Candidates',
    detail: 'Save standout candidates to revisit anytime.',
    key: 'saved_candidates',
    color: '#370617',
    value: 0
  }
]

const getPercent = (arr: any, num: number) => {
  let total = 0

  arr?.forEach((item: any) => {
    total += item.total
  })

  return (num/total * 100).toFixed(2)
}



export const FreeTrialInsight = () => {

  //datas
  const [feedbacks, setFeedbacks] = useState<any>([])
  const [analytics, setAnalytics] = useState<IFeedbackAnalytic>()
  const [quizzes, setQuizzes] = useState<QuizType[]>(quizList)

  //page settings
  const [activeTab, setActiveTab] = useState<string>('company')
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState(10)

  // filter settings
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('desc')
  const [quiz, setQuiz] = useState<string | number>('')

  const getList = async () => {
    setLoading(true)
      try {
        const res = await HttpClient.get('/feedback/user-feedbacks', {
          take:perPage,
          page:page,
          search: search,
          sort: sort,
          section:quiz
        })
          console.log(res.data.userFeedbacks.data)
        const rows:IFeedbackRowData[] = res.data.userFeedbacks.data.map((item:IUserFeedback, index: number) => {
          return {
            id: item.id,
            no: index+1,
            name: item.user.name,
            email: item.user.email,
            date: formatDate(item.created_at, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }, 'en-GB'),
            selectedFeatures: item?.feedback?.length,
            feedback: item.feedback
          }
        })
        setFeedbacks(rows)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }

  }

  const getAnalytics = async () => {
    try {
      const res = await HttpClient.get('/feedback/analytics', {
        user_type : activeTab
      })

      setAnalytics(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  const updateQuizChart = () => {
    const update = quizzes?.map((item) => {
      const newQuiz = analytics?.most_selected_features.find(f => f.message === item.question)
      if(newQuiz) {
        return {...item, value: newQuiz.total}
      }

      return item
    })
    setQuizzes(update)
  }

  const onPageChange = (model: GridPaginationModel) => {
      const mPage = model.page + 1
      setPage(mPage)
      setPerPage(model.pageSize)
    }

  useEffect(() => {
    updateQuizChart()
  },[analytics])

  useEffect(() => {
    getAnalytics()
  },[])

  useEffect(() => {
    getList()
  }, [search, sort, activeTab, quiz, page, perPage])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* breadcrumb */}
      <Box>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
          <Link key='1' href='/trainer/training-management' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Feedback Management
            </Typography>
          </Link>
          <Typography
            key='2'
            sx={{
              color: '#949EA2',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            Free Trial Insight
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 10px 0px #00000014',
          borderRadius: '12px',
          padding: '16px'
        }}
      >
        {/* title and tab */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography sx={{ color: '#32497A', fontSize: 24, fontWeight: 700 }}>Free Trial Insight</Typography>
          <AnimatedTabs tabs={tabsOption} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Box>
        {/* Crats and Statistics */}
        <Grid container gap={4}>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: '25px 20px',
              border: '1px solid #E7E7E7',
              borderRadius: '8px',
              boxShadow: '0px 2px 10px 0px #00000014',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#CBE2F9',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon icon='ph:sparkle' style={{ color: '#FFFFFF' }} fontSize={32} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>Total Subscriptions</Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#2D3436' }}>{analytics?.total_subscriptions}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#CBE2F9',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon icon='ph:tray-arrow-down' style={{ color: '#FFFFFF' }} fontSize={32} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>Total Submissions</Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#2D3436' }}>{analytics?.total_submissions}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: '25px 20px',
              border: '1px solid #E7E7E7',
              borderRadius: '8px',
              boxShadow: '0px 2px 10px 0px #00000014',
              backgroundColor: '#FFFFFF',
              width: 'fit-content'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#CBE2F9',
                  padding: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon icon='ph:clock' style={{ color: '#FFFFFF' }} fontSize={32} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>
                  Recent Submissions / day
                </Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#2D3436' }}>{analytics?.recent_submissions}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={5.5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '25px 20px',
              border: '1px solid #E7E7E7',
              borderRadius: '8px',
              boxShadow: '0px 2px 10px 0px #00000014',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#32497A' }}>Most Selected Features</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <PieChart
                  slots={{
                    legend() {
                      return null
                    }
                  }}
                  width={166}
                  height={166}
                  colors={quizzes?.map(item => item.color)}
                  series={[
                    {
                      data: quizzes?.map(item => {
                        return { value: item.value, label: item.value !== 0 ? `${getPercent(analytics?.most_selected_features, item.value)}% ${item.question}` : ''}
                      }),
                      cx:80,
                      outerRadius:80,
                      // arcLabel: item => item.value !== 0 ? `${getPercent(analytics?.most_selected_features, item.value)}%` : '',     
                    }
                  ]}
                  slotProps={{
                    popper:{
                      style:{display:'none'}
                    }
                  }}
                />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {quizzes?.map((item, i) => {
                  return (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Icon icon={'ph:diamond-fill'} color={item.color} />
                      <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#6B7280' }}>{item.question}</Typography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* filter */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box sx={{ display: 'flex', gap: '70px' }}>
            <TextField
              sx={{ flexGrow: 1 }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              variant='outlined'
              placeholder='Search Company Name'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start' sx={{ marginRight: '8px' }}>
                    <Icon icon='ph:magnifying-glass' fontSize={16} />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ width: '240px', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'right' }}>
              <Icon icon='ph:funnel' fontSize={16} fontWeight={700} />
              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>Sort by :</Typography>
              <Select
                size='small'
                defaultValue='newest'
                value={sort}
                onChange={e => setSort(e.target.value)}
                sx={{
                  border: 'none',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
              >
                <MenuItem value='desc'>Newest to Oldest</MenuItem>
                <MenuItem value='asc'>Oldest to Newest</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '70px' }}>
            <Grid container spacing={6}>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  size='small'
                  value={quiz}
                  onChange={e => setQuiz(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value=''>
                    <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Select Quiz</Typography>
                  </MenuItem>
                  {section.map((item: {label: string, value: string}, i:number) => (
                    <MenuItem key={i} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* table */}
        <TableUser feedbacks={feedbacks} loading={loading} onChangePage={(model:any) => onPageChange(model)} page={page - 1} perPage={perPage}/>
      </Box>
    </Box>
  )
}

FreeTrialInsight.acl = {
  action: 'read',
  subject: 'admin-company-and-job-management'
}

export default FreeTrialInsight

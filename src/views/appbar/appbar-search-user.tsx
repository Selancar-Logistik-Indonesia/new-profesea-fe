import { useCallback, useEffect, useState, useRef } from 'react'
import { Autocomplete, Box, Grid, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import ISearchContent from 'src/contract/models/search_content'
import SearchContentType from 'src/contract/types/search_content_type'
import { HttpClient } from 'src/services'
import debounce from 'src/utils/debounce'
import { getUserAvatarByPath, toLinkCase } from 'src/utils/helpers'
import { Icon } from '@iconify/react'

const AppbarSearchUser = () => {
  const router = useRouter()
  const [listFriends, setListFriends] = useState<ISearchContent[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const searchTimeoutRef = useRef<number | undefined>(undefined)

  const fetchListFriends = async () => {
    setIsLoading(true)
    try {
      const resp = await HttpClient.get('/search/content', {
        search: search
      })
      const { contents } = (await resp.data) as { contents: ISearchContent[] }

      setListFriends(contents)
      setNoResults(contents.length === 0 && search.length >= 4)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  const handleClick = (option: ISearchContent) => {
    if (option.content_type === SearchContentType.socialFeed) {
      return router.push(`/feed/${option.content.id}`)
    }

    return router.push(
      `/${option.content.role === 'Seafarer' ? 'profile' : 'company'}/${option.content.id}/${toLinkCase(
        option.content.username
      )}`
    )
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
      setNoResults(false)
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      searchTimeoutRef.current = window.setTimeout(() => {
        if (value === search && value.length >= 4) {
          setNoResults(true)
        }
      }, 3000)
    }, 500),
    []
  )

  useEffect(() => {
    fetchListFriends()
  }, [search])

  const options = () => {
    if (noResults) {
      return [
        {
          title: `There are no results for "${search}"`,
          content_type: '',
          leading: '',
          subtitle: '',
          content: ''
        }
      ]
    } else return listFriends
  }

  return (
    <Autocomplete
      freeSolo
      fullWidth
      sx={{ minWidth: '250px', maxWidth: '300px' }}
      size='small'
      options={options()}
      getOptionLabel={option => (option as ISearchContent).title}
      onInputChange={(_event, newInputValue) => {
        setListFriends([])
        if (newInputValue === '') {
          setSearch('')
          setNoResults(false)
        } else {
          handleSearch(newInputValue)
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder='Search...'
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment
                position='start'
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  paddingLeft: '6px',
                  alignItems: 'center'
                }}
              >
                {isLoading ? <CircularProgress size={20} /> : <Icon icon='mdi:magnify' style={{ fontSize: '20px' }} />}
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiInputBase-root': { height: '40px', borderRadius: '20px' },
            '& .MuiInputBase-input': { fontSize: '14px' }
          }}
        />
      )}
      renderOption={(props, option) => {
        if (!option.content_type) {
          return (
            <Typography
              component='li'
              {...props}
              sx={{
                color: 'grey',
                cursor: 'default'
              }}
            >
              {option.title}
            </Typography>
          )
        }

        return (
          <Grid
            container
            component='li'
            {...props}
            sx={{ width: '100%', display: 'flex', alignItems: 'center', p: '8px !important', gap: 2 }}
            onClick={() => handleClick(option)}
          >
            {option.content_type === SearchContentType.user && (
              <Box
                component='img'
                loading='lazy'
                sx={{ flexShrink: 0, borderRadius: '100px', width: '40px', aspectRatio: 1, mr: 1 }}
                src={getUserAvatarByPath(option.leading)}
                alt={option.title}
              />
            )}
            <Grid item xs={true} sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <Typography
                variant='body1'
                sx={{
                  fontSize: '14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {option.title}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontSize: '12px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {option.subtitle}
              </Typography>
            </Grid>
          </Grid>
        )
      }}
      ListboxProps={{
        style: {
          maxHeight: '250px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        },
        sx: {
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          p: 0
        }
      }}
    />
  )
}

export default AppbarSearchUser

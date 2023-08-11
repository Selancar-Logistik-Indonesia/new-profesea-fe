import { Icon } from '@iconify/react'
import { Box, Button } from '@mui/material'
import React from 'react'

interface EmailShareButtonProps {
  subject: string
  body: string
}

const EmailShareButton: React.FC<EmailShareButtonProps> = ({ subject, body }) => {
  const emailLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div>
      <Button variant='contained' color='secondary' href={emailLink}>
        <Box mr={2}>
          <Icon icon='mdi:share' />
        </Box>
        Email
      </Button>
    </div>
  )
}

export default EmailShareButton

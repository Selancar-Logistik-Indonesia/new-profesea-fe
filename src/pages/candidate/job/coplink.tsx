import { Button } from '@mui/material'
import React, { useState } from 'react'

interface CopyLinkButtonProps {
  linkToCopy: string
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ linkToCopy }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(linkToCopy)
    setIsCopied(true)

    // Reset the "Copied" state after a brief delay
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div>
      <Button variant='contained' color='warning' onClick={copyLinkToClipboard}>
        {isCopied ? 'Link Copied!' : 'Copy Link'}
      </Button>
    </div>
  )
}

export default CopyLinkButton

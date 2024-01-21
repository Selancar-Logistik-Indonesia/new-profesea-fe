// ** Returns initials from string
export const getInitials = (text?: string) => {
  if (!text) {
    return "";
  }

  return text.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
}

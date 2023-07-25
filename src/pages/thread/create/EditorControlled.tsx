// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const EditorControlled = () => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())
  

  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} toolbar={{
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
}}  />
}

export default EditorControlled

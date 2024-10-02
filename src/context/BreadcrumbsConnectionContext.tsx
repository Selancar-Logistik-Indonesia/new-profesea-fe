import React, { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type Props = { children: ReactNode }

interface Breadcrumb {
  name: string
  path: string
}

interface BreadcrumbState {
  breadcrumbs: Breadcrumb[]
}

interface BreadcrumbAction {
  type: 'SET_BREADCRUMBS'
  payload: Breadcrumb[]
}

const breadcrumbReducer = (state: BreadcrumbState, action: BreadcrumbAction): BreadcrumbState => {
  switch (action.type) {
    case 'SET_BREADCRUMBS':
      return { breadcrumbs: action.payload }
    default:
      return state
  }
}

const BreadcrumbsConnectionContext = createContext<{
  breadcrumbs: Breadcrumb[]
  dispatch: Dispatch<BreadcrumbAction>
}>({
  breadcrumbs: [],
  dispatch: () => null
})

const BreadcrumbsConnectionProvider = (props: Props) => {
  const [state, dispatch] = useReducer(breadcrumbReducer, { breadcrumbs: [] })

  return (
    <BreadcrumbsConnectionContext.Provider value={{ breadcrumbs: state.breadcrumbs, dispatch }}>
      {props.children}
    </BreadcrumbsConnectionContext.Provider>
  )
}

export const useBreadcrumbsConnection = () => useContext(BreadcrumbsConnectionContext)

export { BreadcrumbsConnectionProvider }

export default BreadcrumbsConnectionContext

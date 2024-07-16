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

const BreadcrumbsNewsContext = createContext<{
  breadcrumbs: Breadcrumb[]
  dispatch: Dispatch<BreadcrumbAction>
}>({
  breadcrumbs: [],
  dispatch: () => null
})

const BreadcrumbsNewsProvider = (props: Props) => {
  const [state, dispatch] = useReducer(breadcrumbReducer, { breadcrumbs: [] })

  return (
    <BreadcrumbsNewsContext.Provider value={{ breadcrumbs: state.breadcrumbs, dispatch }}>
      {props.children}
    </BreadcrumbsNewsContext.Provider>
  )
}

export const useBreadcrumbsNews = () => useContext(BreadcrumbsNewsContext)

export { BreadcrumbsNewsProvider }

export default BreadcrumbsNewsContext

import ISeafarerRecommendationData from "./../../contract/models/seafarer_recommendation"

export interface ISeafarerRecommendationProps {
    user_id: number | undefined
}

export interface ISeafarerRecommendationForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: (type: string, data?: any) => void
    loadRecommendation: () => void
    seafarerRecommendation?: ISeafarerRecommendationData
}

export interface ISeafarerRecommendationDelete {
    showModal: boolean
    handleModalDelete: () => void
    loadRecommendation: () => void
    seafarerRecommendation?: ISeafarerRecommendationData
}
import ISeafarerExperieceData from "../../../contract/models/seafarer_experience"

export interface ISeafarerExperienceProps {
    user_id: number
    no_experience: boolean
    setNoExperience: () => void
}

export interface ISeafarerExperienceForm {
    user_id: number
    type: string
    showModal: boolean
    handleModalForm: () => void
    loadCompetency: () => void
    seafarerExperience?: ISeafarerExperieceData
}

export interface ISeafarerExperienceDelete {
    showModal: boolean
    handleModalDelete: () => void
    loadExperience: () => void
    seafarerExperience?: ISeafarerExperieceData
}
import ISeafarerExperieceData from "../../../contract/models/seafarer_experience"

export interface ISeafarerExperienceProps {
    user_id: number
}

export interface ISeafarerExperienceForm {
    type: string
    showModal: boolean
    handleModalForm: Function
    loadExperience: Function
    seafarerExperience?: ISeafarerExperieceData
}

export interface ISeafarerExperienceDelete {
    showModal: boolean
    handleModalDelete: Function
    loadExperience: Function
    seafarerExperience?: ISeafarerExperieceData
}
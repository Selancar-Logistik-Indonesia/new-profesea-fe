import ISeafarerProficiencyData from "./../../contract/models/seafarer_proficiency"

export interface ISeafarerProficiencyProps {
    user_id: number
}

export interface ISeafarerProficiencyForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: (type: string, data?: any) => void
    loadProficiency: () => void
    seafarerProficiency?: ISeafarerProficiencyData
}

export interface ISeafarerProficiencyDelete {
    showModal: boolean
    handleModalDelete: () => void
    loadProficiency: () => void
    seafarerProficiency?: ISeafarerProficiencyData
}
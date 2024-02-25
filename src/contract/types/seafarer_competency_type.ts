import ISeafarerCompetencyData from "./../../contract/models/seafarer_competency"

export interface ISeafarerCompetencyProps {
    user_id: number
}

export interface ISeafarerCompetencyForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: (type: string, data?: any) => void
    loadCompetency: () => void
    seafarerCompetency?: ISeafarerCompetencyData
}

export interface ISeafarerCompetencyDelete {
    showModal: boolean
    handleModalDelete: () => void
    loadCompetency: () => void
    seafarerCompetency?: ISeafarerCompetencyData
}
import ISeafarerCompetencyData from "./../../../contract/models/seafarer_competency"

export interface ISeafarerCompetencyProps {
    user_id: number
}

export interface ISeafarerCompetencyForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: Function
    loadCompetency: Function
    seafarerCompetency?: ISeafarerCompetencyData
}

export interface ISeafarerCompetencyDelete {
    showModal: boolean
    handleModalDelete: Function
    loadCompetency: Function
    seafarerCompetency?: ISeafarerCompetencyData
}
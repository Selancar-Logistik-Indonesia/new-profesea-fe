import ISeafarerCompetencyData from "./../../../contract/models/seafarer_competency"

export interface ISeafarerCompetencyProps {
    user_id: number
}

export interface ISeafarerCompetencyForm {
    type: string
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
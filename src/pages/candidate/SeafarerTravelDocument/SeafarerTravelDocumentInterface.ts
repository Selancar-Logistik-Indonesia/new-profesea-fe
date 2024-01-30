import ISeafarerTravelDocumentData from "./../../../contract/models/seafarer_travel_document"

export interface ISeafarerTravelDocumentProps {
    user_id: number
}

export interface ISeafarerTravelDocumentForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: Function
    loadTravelDocument: Function
    seafarerTravelDocument?: ISeafarerTravelDocumentData
}

export interface ISeafarerTravelDocumentDelete {
    showModal: boolean
    handleModalDelete: Function
    loadTravelDocument: Function
    seafarerTravelDocument?: ISeafarerTravelDocumentData
}
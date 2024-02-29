import ISeafarerTravelDocumentData from "./../../contract/models/seafarer_travel_document"

export interface ISeafarerTravelDocumentProps {
    user_id: number | undefined
}

export interface ISeafarerTravelDocumentForm {
    type: string
    user_id: number
    showModal: boolean
    handleModalForm: (type: string, data?: any) => void
    loadTravelDocument: () => void
    seafarerTravelDocument?: ISeafarerTravelDocumentData
}

export interface ISeafarerTravelDocumentDelete {
    showModal: boolean
    handleModalDelete: () => void
    loadTravelDocument: () => void
    seafarerTravelDocument?: ISeafarerTravelDocumentData
}
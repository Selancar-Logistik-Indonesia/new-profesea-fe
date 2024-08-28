export interface IDocument {
  id: number
  documentable_id: number
  documentable_type: string
  document_type: string
  document_name: string
  document_number: number | null
  path: string
  created_at: string | null
  updated_at: string | null
  parent_id: number | null
  expired_at: string | null
}

export interface IUserProfile {
  id: number
  name: string
  team: string
  employee_type: string
}

export interface IDetailPercentage {
  total_onboarding_percentage: number
  total_photo_percentage: number
  total_bio_percentage: number
  travel_document_percentage: number
  competency_percentage: number
  proficiency_percentage: number
  experience_percentage: number
  recommendation_percentage: number
  total_seafarer_education_percentage: number
  total_professional_education_percentage: number
  total_experience_percentage: number
  total_certificate_percentage: number
}

export interface IUserProfilePercentage {
  profile: IUserProfile
  percentage: number
  detail_percentage: IDetailPercentage
}

import TrainingDetailPage from 'src/pages/candidate/trainings/[trainername]/[id]/[trainingtitle]'

const CompanyTraining = () => {
  return <TrainingDetailPage pageView='company' />
}
CompanyTraining.acl = {
  action: 'read',
  subject: 'company-training'
}

export default CompanyTraining

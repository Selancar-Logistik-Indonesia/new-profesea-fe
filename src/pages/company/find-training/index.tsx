import SeafarerTraining from 'src/pages/candidate/trainings'

const CompanyTraining = () => {
  return <SeafarerTraining pageView='company' />
}
CompanyTraining.acl = {
  action: 'read',
  subject: 'company-training'
}

export default CompanyTraining

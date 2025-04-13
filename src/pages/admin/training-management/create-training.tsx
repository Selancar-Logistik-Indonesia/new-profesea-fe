import TrainingForm from 'src/views/training-management/TrainingForm'

const CreateTraining = () => {
  return <TrainingForm pageView='admin' type='create' />
}

CreateTraining.acl = {
  action: 'read',
  subject: 'admin-training-management'
}

export default CreateTraining

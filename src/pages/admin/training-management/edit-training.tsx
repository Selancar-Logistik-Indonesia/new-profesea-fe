import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Training from 'src/contract/models/training'
import { HttpClient } from 'src/services'
import TrainingForm from 'src/views/training-management/TrainingForm'

const EditTraining = () => {
  const [training, setTraining] = useState<Training>()
  const params = useSearchParams()
  const trainingId = params.get('id')

  const onLoad = async () => {
    try {
      const res = await HttpClient.get(`/training/${trainingId}`)
      console.log(res.data.training)

      setTraining(res.data.training)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return <TrainingForm pageView='admin' type='edit' training={training} />
}

EditTraining.acl = {
  action: 'read',
  subject: 'admin-training-management'
}

export default EditTraining

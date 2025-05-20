import Icon from 'src/@core/components/icon'
import moment, { now } from 'moment'

import NotificationType from 'src/contract/types/notification_type'
import INotification from 'src/contract/models/notification'

const buildNotifies = (e: INotification) => {
  const diff = moment(e.created_at).diff(now())
  const hDiff = moment.duration(diff).humanize()

  if (e.type == NotificationType.feedLike) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.liker.name,
      title: e.data.liker.name,
      avatarIcon: <Icon icon='ic:baseline-thumb-up-off-alt' />,
      subtitle: 'like your feed.',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequest) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: e.data.friend.name,
      avatarIcon: <Icon icon='ic:baseline-person-add-alt' />,
      subtitle: 'request to connect with You.',
      type: e.type,
      payload: e.data.friend,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.applicantApplied) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.candidate.name,
      title: 'Application Submitted:',
      avatarIcon: e?.data?.company?.photo,
      subtitle: `You've Applied for ${e.data.job.job_title ? e.data.job.job_title : e.data.job.role_type.name}!`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.newApplicant) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.candidate.name,
      title: e.data.candidate.name,
      avatarIcon: e?.data?.candidate?.photo,
      subtitle: `applied for ${
        e.data.job.category?.employee_type == 'onship'
          ? e.data.job.role_type.name ?? ''
          : e.data.job.job_title ?? e.data.job.role_type.name
      }.`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequestApproved) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: e.data.friend.name,
      avatarIcon: <Icon icon='ic:round-check-circle-outline' />,
      subtitle: 'approved your connect request.',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequestRejected) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: e.data.friend.name,
      avatarIcon: <Icon icon='ic:baseline-remove-circle-outline' />,
      subtitle: 'rejected your connect request.',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.completeProfileEncouragement) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Please complete your profile:',
      avatarIcon: <Icon icon='ph:confetti' />,
      subtitle: (
        <span>
          Hey <b className='name'>{e.data.user.name}</b>, a warm welcome to Profesea! To boost your profile visibility
          and help recruiters find your resume effortlessly, we suggest filling out your profile. It's a great way to
          showcase your talents!
        </span>
      ),
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.companyApproval) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Congratulations!',
      avatarIcon: <Icon icon='ic:baseline-mark-email-read' />,
      subtitle: 'Your Company Registration on Profesea Has Been Approved!',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.companyOnboarding) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Complete Registration on Profesea!',
      avatarIcon: <Icon icon='ic:baseline-mark-email-read' />,
      subtitle: 'Upload your document to complete Registration',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantViewed) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: e?.data?.company?.name,
      avatarIcon: <Icon icon='fluent:people-search-24-regular' />,
      subtitle: 'has viewed your application!',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantRejected) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `Check your application status:`,
      avatarIcon: <Icon icon='icon-park-outline:people-delete' />,
      subtitle: (
        <span>
          Your Application for
          {e?.data?.job?.vesseltype_id ? e?.data?.job?.job_title : e?.data?.job?.rolelevel?.levelName} - Rejected
        </span>
      ),
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantApproved) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `Check your application status:`,
      avatarIcon: <Icon icon='fluent:people-checkmark-24-regular' />,
      subtitle: (
        <span>
          Your Application for
          {e?.data?.job?.vesseltype_id ? e?.data?.job?.job_title : e?.data?.job?.rolelevel?.levelName} - Approved
        </span>
      ),
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.jobOffer) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `You have a new job offer!`,
      avatarIcon: <Icon icon='ph:briefcase' />,
      subtitle: (
        <span>
          {e?.data?.company?.name} has offered you the{' '}
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1F1F1F' }}>
            {e?.data?.job?.vesseltype_id ? e?.data?.job?.job_title : e?.data?.job?.rolelevel?.levelName}
          </span>{' '}
          position
          <br />
          <span>View the job details and respond to the offer.</span>
        </span>
      ),
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  return {
    id: '0',
    meta: hDiff,
    avatarAlt: 'undefined',
    title: 'undefined',
    avatarImg: '',
    subtitle: <span>undefined</span>,
    type: '',
    read_at: '',
    data: null
  }
}

export default buildNotifies

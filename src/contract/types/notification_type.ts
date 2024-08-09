enum NotificationType {
    feedLike = "App\\Notifications\\FeedLikedNotification",
    connectRequest = "App\\Notifications\\ConnectRequestNotification",
    applicantApplied = "App\\Notifications\\ApplicantApplied",
    newApplicant = "App\\Notifications\\NewApplicantNotification",
    connectRequestApproved = "App\\Notifications\\ConnectRequestApproved",
    connectRequestRejected = "App\\Notifications\\ConnectRequestRejected",
    completeProfileEncouragement = "App\\Notifications\\CompleteProfileEncouragement",
    companyApproval = "App\\Notifications\\NotificationCompanyApproval",
    companyOnboarding = "App\\Notifications\\NotificationCompanyOnboarding",
    applicantViewed = "App\\Notifications\\ApplicantViewed",
    applicantRejected = "App\\Notifications\\ApplicantRejected",
    applicantApproved = "App\\Notifications\\ApplicantApproved",
}

export default NotificationType;

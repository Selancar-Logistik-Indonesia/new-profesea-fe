enum NotificationType {
    feedLike = "App\\Notifications\\FeedLikedNotification",
    connectRequest = "App\\Notifications\\ConnectRequestNotification",
    newApplicant = "App\\Notifications\\NewApplicantNotification",
    connectRequestApproved = "App\\Notifications\\ConnectRequestApproved",
    connectRequestRejected = "App\\Notifications\\ConnectRequestRejected",
    completeProfileEncouragement = "App\\Notifications\\CompleteProfileEncouragement",
    companyApproval = "App\\Notifications\\NotificationCompanyApproval",
    companyOnBoarding = "App\\Notifications\\NotificationCompanyOnBoarding",
}

export default NotificationType;
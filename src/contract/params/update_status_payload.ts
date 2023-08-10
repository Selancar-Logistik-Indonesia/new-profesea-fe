interface UpdateStatusPayload {
    content: string,
    content_type: string,
    attachments?: any
    feed_repost?: string
}

export default UpdateStatusPayload;
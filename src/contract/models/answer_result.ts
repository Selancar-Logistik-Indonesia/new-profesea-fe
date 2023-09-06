import Question from "./question"

interface AnswerResult {
    id: number
    training_id: number
    user_id: number
    question_id: number
    answer_text: string
    form_type: string
    correct: number
    score: number
    created_at: string
    updated_at: string
    answer_id: number
    question: Question
}

export default AnswerResult;
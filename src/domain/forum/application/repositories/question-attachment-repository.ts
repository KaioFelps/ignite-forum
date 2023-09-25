import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface IQuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}

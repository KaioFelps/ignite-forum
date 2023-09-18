import { IQuestionCommentRepository } from "../repositories/question-comment-repository";

interface IDeleteQuestionCommentService {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentService {
  constructor(private questionCommentRepository: IQuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentService): Promise<void> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionCommentRepository.delete(questionComment);
  }
}

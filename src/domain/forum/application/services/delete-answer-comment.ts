import { IAnswerCommentRepository } from "../repositories/answer-comment-repository";

interface IDeleteAnswerCommentService {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentService {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentService): Promise<void> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error("Answer comment not found.");
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerCommentRepository.delete(answerComment);
  }
}

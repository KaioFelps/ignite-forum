import { IAnswerRepository } from "../repositories/answer-repository-interface";

interface IDeleteAnswerService {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerService {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({ authorId, answerId }: IDeleteAnswerService): Promise<void> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerRepository.delete(answer);
  }
}

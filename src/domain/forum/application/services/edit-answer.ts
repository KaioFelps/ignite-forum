import { Answer } from "../../enterprise/entities/answer";
import { IAnswerRepository } from "../repositories/answer-repository-interface";

interface IEditAnswerService {
  authorId: string;
  answerId: string;
  content: string;
}

interface IEditAnswerResponse {
  answer: Answer;
}

export class EditAnswerService {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: IEditAnswerService): Promise<IEditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}

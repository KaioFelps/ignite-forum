import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { IAnswerRepository } from "../repositories/answer-repository-interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface IEditAnswerService {
  authorId: string;
  answerId: string;
  content: string;
}

type IEditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>;

export class EditAnswerService {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: IEditAnswerService): Promise<IEditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}

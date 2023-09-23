import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/question-repository-interface";
import { Either, right } from "@/core/either";

interface ICreateQuestionService {
  authorId: string;
  title: string;
  content: string;
}

type ICreateQuestionResponse = Either<null, { question: Question }>;

export class CreateQuestionService {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionService): Promise<ICreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    });

    await this.questionRepository.create(question);

    return right({ question });
  }
}

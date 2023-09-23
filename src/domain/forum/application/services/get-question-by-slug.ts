import { Either, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/question-repository-interface";

interface IGetQuestionBySlugService {
  slug: string;
}

type IGetQuestionBySlugResponse = Either<null, { question: Question }>;

export class GetQuestionBySlugService {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugService): Promise<IGetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found.");
    }

    return right({ question });
  }
}

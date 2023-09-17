import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/question-repository-interface";

interface IFetchLatestQuestionsService {
  page: number;
}

interface IFetchLatestQuestionsResponse {
  questions: Question[];
}

export class FetchLatestQuestionsService {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    page,
  }: IFetchLatestQuestionsService): Promise<IFetchLatestQuestionsResponse> {
    const questions = await this.questionRepository.findManyLatest({
      page: page ?? 1,
    });

    return { questions };
  }
}

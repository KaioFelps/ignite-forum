import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/question-repository-interface";
import { IAnswerRepository } from "../repositories/answer-repository-interface";

interface IChooseBestAnswerService {
  answerId: string;
  authorId: string;
}

interface IChooseBestAnswerResponse {
  question: Question;
}

export class ChooseBestAnswerService {
  constructor(
    private questionRepository: IQuestionRepository,
    private answerRepository: IAnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: IChooseBestAnswerService): Promise<IChooseBestAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}

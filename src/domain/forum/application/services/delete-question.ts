import { IQuestionRepository } from "../repositories/question-repository-interface";

interface IDeleteQuestionService {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionService {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionService): Promise<void> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionRepository.delete(question);
  }
}

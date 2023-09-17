import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/question-repository-interface";

interface IEditQuestionService {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface IEditQuestionResponse {
  question: Question;
}

export class EditQuestionService {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
  }: IEditQuestionService): Promise<IEditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return { question };
  }
}

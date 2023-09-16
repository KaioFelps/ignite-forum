import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerRepository } from "../repositories/answer-repository-interface";
import { Answer } from "../../enterprise/entities/answer";

interface IAnswerQuestionService {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionService {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({ instructorId, questionId, content }: IAnswerQuestionService) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      content,
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}
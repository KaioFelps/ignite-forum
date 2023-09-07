import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { IAnswerRepository } from "../repositories/answer-repository-interface";

interface IAnswerQuestionService {
  instructorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
}

export class AnswerQuestionService {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({ instructorId, questionId, content }: IAnswerQuestionService) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answerRepository.create(answer);

    return answer;
  }
}

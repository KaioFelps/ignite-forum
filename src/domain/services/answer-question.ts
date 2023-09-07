import { Answer } from "../entities/answer";

interface IAnswerQuestionService {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionService {
  execute({ instructorId, questionId, content }: IAnswerQuestionService) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    return answer;
  }
}

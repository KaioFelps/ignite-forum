import { IAnswerRepository } from "../repositories/answer-repository-interface";
import { AnswerQuestionService } from "./answer-question";

const fakeAnswerRepository: IAnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(answer) {
    return;
  },
};

test("create answer", async () => {
  const answerQuestion = new AnswerQuestionService(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});

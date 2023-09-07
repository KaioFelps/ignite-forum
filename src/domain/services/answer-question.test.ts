import { expect, test } from "vitest";
import { AnswerQuestionService } from "./answer-question";
import { IAnswerRepository } from "../repositories/answer-repository-interface";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

const fakeAnswerRepository: IAnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(answer) {
    return;
  },
};

test("create answer", async () => {
  const answerQuestion = new AnswerQuestionService(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    questionId: new UniqueEntityId("1"),
    instructorId: new UniqueEntityId("1"),
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});

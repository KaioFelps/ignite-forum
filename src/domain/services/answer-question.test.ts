import { expect, test } from "vitest";
import { AnswerQuestionService } from "./answer-question";

test("create answer", () => {
  const answerQuestion = new AnswerQuestionService();

  const answer = answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Nova resposta",
  });

  expect(answer.content).toEqual("Nova resposta");
});

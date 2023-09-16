import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { AnswerQuestionService } from "./answer-question";

let inMemoryRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionService;

describe("Create answer service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionService(inMemoryRepository);
  });

  test("if it's possible to create an answer", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Nova resposta",
    });

    expect(answer.content).toEqual("Nova resposta");
    expect(inMemoryRepository.items[0].id).toEqual(answer.id);
  });
});

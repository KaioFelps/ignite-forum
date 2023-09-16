import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { CreateQuestionService } from "./create-question";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: CreateQuestionService;

describe("Create question service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionService(inMemoryRepository);
  });

  test("if it's possible to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      content: "Sample question content here",
      title: "Sample question title",
    });

    expect(question.title).toEqual("Sample question title");
    expect(inMemoryRepository.items[0].id).toEqual(question.id);
    expect(question.id).toBeTruthy();
  });
});

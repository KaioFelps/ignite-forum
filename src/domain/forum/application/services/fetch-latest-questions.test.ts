import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { FetchLatestQuestionsService } from "./fetch-latest-questions";
import { MakeQuestionFactory } from "test/factories/make-question";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: FetchLatestQuestionsService;

describe("Fetch latest questions service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new FetchLatestQuestionsService(inMemoryRepository);
  });

  test("if it's possible to get paginated list of latest questions", async () => {
    await inMemoryRepository.create(
      MakeQuestionFactory.execute({
        createdAt: new Date(2022, 0, 20),
      }),
    );

    await inMemoryRepository.create(
      MakeQuestionFactory.execute({
        createdAt: new Date(2022, 0, 18),
      }),
    );

    await inMemoryRepository.create(
      MakeQuestionFactory.execute({
        createdAt: new Date(2022, 0, 23),
      }),
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022, 0, 23),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 18),
      }),
    ]);
  });

  test("if latest questions are comming paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(MakeQuestionFactory.execute({}));
    }

    let { questions } = await sut.execute({ page: 1 });

    expect(questions).toHaveLength(20);

    questions = (await sut.execute({ page: 2 })).questions;

    expect(questions).toHaveLength(2);
  });
});

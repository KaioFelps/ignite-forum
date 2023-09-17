import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { GetQuestionBySlugService } from "./get-question-by-slug";
import { MakeQuestionFactory } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugService;

describe("Get question by slug service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugService(inMemoryRepository);
  });

  test("if it's possible to get a question by it's slug", async () => {
    const newQuestion = MakeQuestionFactory.execute({
      slug: Slug.create("slug-de-teste"),
    });

    await inMemoryRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "slug-de-teste",
    });

    expect(newQuestion.id).toEqual(question.id);
  });
});

import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { GetQuestionBySlugService } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugService;

describe("Get question by slug service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugService(inMemoryRepository);
  });

  test("if it's possible to get a question by it's slug", async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId("1"),
      title: "Sample question",
      content: "Sample question's content",
      slug: Slug.create("slug-de-teste"),
    });

    await inMemoryRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "slug-de-teste",
    });

    expect(newQuestion.id).toEqual(question.id);
  });
});

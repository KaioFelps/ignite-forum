import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { DeleteQuestionService } from "./delete-question";
import { MakeQuestionFactory } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionService;

describe("Delete question service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionService(inMemoryRepository);
  });

  test("if it's possible to delete a question", async () => {
    const newQuestion = MakeQuestionFactory.execute(
      {},
      new UniqueEntityId("question-1"),
    );

    await inMemoryRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1",
      authorId: newQuestion.authorId.toString(),
    });

    expect(inMemoryRepository.items).toHaveLength(0);
  });

  test("if it's impossible to delete a question that doesn't belong to the user", async () => {
    const newQuestion = MakeQuestionFactory.execute(
      {},
      new UniqueEntityId("question-1"),
    );

    await inMemoryRepository.create(newQuestion);

    const deleteRequest = sut.execute({
      questionId: "question-1",
      authorId: "not-the-author-id",
    });

    expect(deleteRequest).rejects.toBeInstanceOf(Error);
  });
});

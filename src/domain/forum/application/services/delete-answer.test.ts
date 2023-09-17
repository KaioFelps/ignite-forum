import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { DeleteAnswerService } from "./delete-answer";
import { MakeAnswerFactory } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerService;

describe("Delete answer service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerService(inMemoryRepository);
  });

  test("if it's possible to delete a answer", async () => {
    const newAnswer = MakeAnswerFactory.execute(
      {},
      new UniqueEntityId("answer-1"),
    );

    await inMemoryRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: newAnswer.authorId.toString(),
    });

    expect(inMemoryRepository.items).toHaveLength(0);
  });

  test("if it's impossible to delete a answer that doesn't belong to the user", async () => {
    const newAnswer = MakeAnswerFactory.execute(
      {},
      new UniqueEntityId("answer-1"),
    );

    await inMemoryRepository.create(newAnswer);

    const deleteRequest = sut.execute({
      answerId: "answer-1",
      authorId: "not-the-author-id",
    });

    expect(deleteRequest).rejects.toBeInstanceOf(Error);
  });
});

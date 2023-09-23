import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { EditAnswerService } from "./edit-answer";
import { MakeAnswerFactory } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryRepository: InMemoryAnswerRepository;
let sut: EditAnswerService;

describe("Edit answer service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerService(inMemoryRepository);
  });

  test("if it's possible to edit a answer", async () => {
    const newAnswer = MakeAnswerFactory.execute(
      {},
      new UniqueEntityId("answer-1"),
    );

    await inMemoryRepository.create(newAnswer);

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: "Conteúdo teste",
    });

    expect(inMemoryRepository.items[0]).toMatchObject({
      content: "Conteúdo teste",
    });
  });

  test("if it's impossible to edit a answer that doesn't belong to the user", async () => {
    const newAnswer = MakeAnswerFactory.execute(
      {},
      new UniqueEntityId("answer-1"),
    );

    await inMemoryRepository.create(newAnswer);

    const response = await sut.execute({
      authorId: "wrong-author-id",
      answerId: newAnswer.id.toString(),
      content: "Conteúdo teste",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});

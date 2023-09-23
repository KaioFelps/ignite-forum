import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { EditQuestionService } from "./edit-question";
import { MakeQuestionFactory } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryRepository: InMemoryQuestionRepository;
let sut: EditQuestionService;

describe("Edit question service", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionService(inMemoryRepository);
  });

  test("if it's possible to edit a question", async () => {
    const newQuestion = MakeQuestionFactory.execute(
      {},
      new UniqueEntityId("question-1"),
    );

    await inMemoryRepository.create(newQuestion);

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });

    expect(inMemoryRepository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });
  });

  test("if it's impossible to edit a question that doesn't belong to the user", async () => {
    const newQuestion = MakeQuestionFactory.execute(
      {},
      new UniqueEntityId("question-1"),
    );

    await inMemoryRepository.create(newQuestion);

    const response = await sut.execute({
      authorId: "wrong-author-id",
      questionId: newQuestion.id.toString(),
      title: "Pergunta teste",
      content: "Conteúdo teste",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});

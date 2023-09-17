import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";
import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository";
import { ChooseBestAnswerService } from "./choose-best-answer";
import { MakeAnswerFactory } from "test/factories/make-answer";
import { MakeQuestionFactory } from "test/factories/make-question";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: ChooseBestAnswerService;

describe("Choose best answer service", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();

    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    sut = new ChooseBestAnswerService(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    );
  });

  test("if it's possible to choose a best answer", async () => {
    const question = MakeQuestionFactory.execute();
    const answer = MakeAnswerFactory.execute({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  test("if it's impossible to choose a best answer if user is not the author", async () => {
    const question = MakeQuestionFactory.execute();
    const answer = MakeAnswerFactory.execute();

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    const chooseBestAnswerRequest = sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(chooseBestAnswerRequest).rejects.toBeInstanceOf(Error);
  });
});

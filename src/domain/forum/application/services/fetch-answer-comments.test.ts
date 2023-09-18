import { MakeAnswerFactory } from "test/factories/make-answer";
import { FetchAnswerCommentService } from "./fetch-answer-comments";
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository";
import { MakeAnswerCommentFactory } from "test/factories/make-answer-comment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerCommentService;

describe("Fetch answer's comment service", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new FetchAnswerCommentService(inMemoryAnswerCommentRepository);
  });

  test("if it's possible to get a paginated list of comments from a answer", async () => {
    await inMemoryAnswerCommentRepository.create(
      MakeAnswerCommentFactory.execute({
        answerId: new UniqueEntityId("answer-1"),
      }),
    );

    await inMemoryAnswerCommentRepository.create(
      MakeAnswerCommentFactory.execute({
        answerId: new UniqueEntityId("answer-1"),
      }),
    );

    await inMemoryAnswerCommentRepository.create(
      MakeAnswerCommentFactory.execute({
        answerId: new UniqueEntityId("answer-1"),
      }),
    );

    const { answerComments } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  test("if comments are comming paginated", async () => {
    const answer = MakeAnswerFactory.execute();
    await inMemoryAnswerRepository.create(answer);

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        MakeAnswerCommentFactory.execute({ answerId: answer.id }),
      );
    }

    let { answerComments } = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    });

    expect(answerComments).toHaveLength(20);

    answerComments = (
      await sut.execute({ answerId: answer.id.toString(), page: 2 })
    ).answerComments;

    expect(answerComments).toHaveLength(2);
  });
});

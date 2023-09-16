import { IQuestionRepository } from "../repositories/question-repository-interface";
import { CreateQuestionService } from "./create-question";

const fakeQuestionRepository: IQuestionRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(answer) {
    return;
  },
};

test("create question", async () => {
  const createQuestion = new CreateQuestionService(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    content: "Sample question content here",
    title: "Sample question title",
  });

  expect(question.title).toEqual("Sample question title");
});

import { randomUUID } from "node:crypto";

interface IAnswer {
  id?: string;
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor({ content, authorId, questionId, id }: IAnswer) {
    this.content = content;
    this.id = id ?? randomUUID();
    this.authorId = authorId;
    this.questionId = questionId;
  }
}

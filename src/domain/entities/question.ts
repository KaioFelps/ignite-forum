import { randomUUID } from "node:crypto";

interface IQuestion {
  title: string;
  content: string;
  authorId: string;
  id?: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;

  constructor({ authorId, content, title, id }: IQuestion) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.id = id ?? randomUUID();
  }
}

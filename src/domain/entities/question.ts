import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

interface IQuestion {
  title: string;
  content: string;
  authorId: string;
  slug?: Slug;
  id?: string;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor({ authorId, content, title, id, slug }: IQuestion) {
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.id = id ?? randomUUID();
    this.slug = slug ?? Slug.createFromText(title);
  }
}

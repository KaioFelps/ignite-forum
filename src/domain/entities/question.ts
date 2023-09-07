import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface IQuestion {
  title: string;
  content: string;
  authorId: string;
  slug?: Slug;
}

export class Question extends Entity<IQuestion> {
  get authorId() {
    return this.props.authorId;
  }

  get content() {
    return this.props.content;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }
}

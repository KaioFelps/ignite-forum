import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/@types/optional";

interface IQuestion {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug?: Slug;
  createdAt: Date;
  updatedAt?: Date;
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<IQuestion, "createdAt">, id?: UniqueEntityId) {
    const question = new Question({ ...props, createdAt: new Date() }, id);

    return question;
  }
}

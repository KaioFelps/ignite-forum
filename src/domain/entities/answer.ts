import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface IAnswer {
  content: string;
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<IAnswer> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }
}

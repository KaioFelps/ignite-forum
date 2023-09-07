import { Optional } from "../../core/@types/optional";
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<IAnswer, "createdAt">, id?: UniqueEntityId) {
    const answer = new Answer({ ...props, createdAt: new Date() }, id);

    return answer;
  }
}

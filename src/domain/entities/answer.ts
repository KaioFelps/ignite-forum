import { Entity } from "../../core/entities/entity";

interface IAnswer {
  content: string;
  authorId: string;
  questionId: string;
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

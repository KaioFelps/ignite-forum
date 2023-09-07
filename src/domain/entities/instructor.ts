import { Entity } from "../../core/entities/entity";

interface IInstructor {
  name: string;
}

export class Instructor extends Entity<IInstructor> {
  get name() {
    return this.props.name;
  }
}

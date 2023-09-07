import { Entity } from "../../core/entities/entity";

interface IStudent {
  name: string;
}

export class Student extends Entity<IStudent> {
  get name() {
    return this.props.name;
  }

  constructor(props: IStudent, id?: string) {
    super(props, id);
  }
}

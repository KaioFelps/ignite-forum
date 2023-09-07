import { randomUUID } from "node:crypto";

interface IInstructor {
  id?: string;
  name: string;
}

export class Instructor {
  public id: string;
  public name: string;

  constructor({ name, id }: IInstructor) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

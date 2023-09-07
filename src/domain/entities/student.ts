import { randomUUID } from "node:crypto";

interface IStudent {
  id?: string;
  name: string;
}

export class Student {
  public id: string;
  public name: string;

  constructor({ name, id }: IStudent) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}

import { randomUUID } from "node:crypto";

export class Entity<PropsType> {
  private _id: string;

  // protected indica que essa propriedade só será acessível à classe entity e aquelas classes que a extendem.
  protected props: PropsType;

  get id() {
    return this._id;
  }

  constructor(props: PropsType, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}

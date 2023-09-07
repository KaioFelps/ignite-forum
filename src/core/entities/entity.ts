import { UniqueEntityId } from "./unique-entity-id";

export class Entity<PropsType> {
  private _id: UniqueEntityId;

  // protected indica que essa propriedade só será acessível à classe entity e aquelas classes que a extendem.
  protected props: PropsType;

  get id() {
    return this._id;
  }

  constructor(props: PropsType, id?: string) {
    this._id = new UniqueEntityId(id);
    this.props = props;
  }
}

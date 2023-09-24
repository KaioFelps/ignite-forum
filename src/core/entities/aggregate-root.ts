// classes abstratas não podem ser instanciadas como `new Class()`, mas podemos instanciar classes que a herdam.

import { Entity } from "./entity";

export abstract class AggregateRoot<Props> extends Entity<Props> {}

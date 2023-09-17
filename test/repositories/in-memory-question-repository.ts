import { IQuestionRepository } from "@/domain/forum/application/repositories/question-repository-interface";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements IQuestionRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    this.items.splice(itemIndex, 1);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug?.value === slug);

    return question ?? null;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    return question ?? null;
  }
}

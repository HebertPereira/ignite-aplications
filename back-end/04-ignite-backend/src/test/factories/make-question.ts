import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function MakeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      slug: Slug.create("example-question"),
      content: faker.lorem.text(),
      bestAnswerId: undefined,
      ...overrides
    },
    id
  );

  return question;
}

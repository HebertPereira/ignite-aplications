import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { faker } from "@faker-js/faker";

export function MakeAnswer(
  overrides: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.sentence(),
      questionId: new UniqueEntityId(),
      ...overrides
    },
    id
  );

  return question;
}

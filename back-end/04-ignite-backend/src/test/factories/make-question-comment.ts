import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  QuestionComment,
  QuestionCommentProps
} from "@/domain/forum/enterprise/entities/question-comment";

export function MakeQuestionComment(
  overrides?: Partial<QuestionCommentProps>,
  id?: UniqueEntityId
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      ...overrides
    },
    id
  );

  return questionComment;
}

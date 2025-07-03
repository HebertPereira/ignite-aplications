import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  QuestionAttachment,
  QuestionAttachmentProps
} from "@/domain/forum/enterprise/entities/question-attachment";

export function MakeQuestionAttachment(
  overrides: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const questionAttachments = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides
    },
    id
  );

  return questionAttachments;
}

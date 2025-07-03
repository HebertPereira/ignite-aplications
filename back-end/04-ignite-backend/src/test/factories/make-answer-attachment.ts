import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  AnswerAttachment,
  AnswerAttachmentProps
} from "@/domain/forum/enterprise/entities/answer-attachment";

export function MakeAnswerAttachment(
  overrides: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const answerAttachments = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overrides
    },
    id
  );

  return answerAttachments;
}

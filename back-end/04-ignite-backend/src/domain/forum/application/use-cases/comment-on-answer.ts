import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answer-repository";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  content: string;
  answerId: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersrepository: AnswersRepository,
    private answersCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    answerId
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersrepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId)
    });

    await this.answersCommentsRepository.create(answerComment);

    return { answerComment };
  }
}

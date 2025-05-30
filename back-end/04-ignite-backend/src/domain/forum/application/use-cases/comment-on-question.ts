import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionsRepository } from "../repositories/question-repository";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  content: string;
  questionId: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsrepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    questionId
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsrepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId)
    });

    await this.questionsCommentsRepository.create(questionComment);

    return { questionComment };
  }
}

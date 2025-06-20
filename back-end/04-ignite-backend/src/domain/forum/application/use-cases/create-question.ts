import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";
import { Either, right } from "@/core/either";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private QuestionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      bestAnswerId: undefined,
      authorId: new UniqueEntityId(authorId),
      title,
      content
    });

    await this.QuestionsRepository.create(question);

    return right({ question });
  }
}

import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";

interface FetchQuestionsAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyQuestionId(
      questionId,
      { page }
    );

    return { answers };
  }
}

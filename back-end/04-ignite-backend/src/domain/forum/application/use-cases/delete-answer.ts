import { AnswersRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const question = await this.answersRepository.findById(answerId);

    if (!question) {
      throw new Error("Question not found!");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed!");
    }

    await this.answersRepository.delete(question);

    return;
  }
}

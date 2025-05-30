import { MakeQuestion } from "@/test/factories/make-question";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { MakeAnswer } from "@/test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = MakeQuestion({});
    const Answer = MakeAnswer({
      questionId: question.id
    });

    inMemoryAnswersRepository.create(Answer);
    inMemoryQuestionsRepository.create(question);

    await sut.execute({
      answerId: Answer.id.toString(),
      authorId: question.authorId.toString()
    });

    expect(
      inMemoryQuestionsRepository.items[0].bestAnswerId?.toString()
    ).toEqual(Answer.id.toString());
  });

  it("should not be able to choose another userquestion best answer", async () => {
    const question = MakeQuestion({
      authorId: new UniqueEntityId("author-1")
    });
    const Answer = MakeAnswer({
      questionId: question.id
    });

    inMemoryAnswersRepository.create(Answer);
    inMemoryQuestionsRepository.create(question);

    await expect(() => {
      return sut.execute({
        answerId: Answer.id.toString(),
        authorId: "author-2"
      });
    }).rejects.instanceOf(Error);
  });
});

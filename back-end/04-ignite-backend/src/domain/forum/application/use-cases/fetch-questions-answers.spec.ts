import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { FetchQuestionsAnswersUseCase } from "./fetch-questions-answers";
import { MakeAnswer } from "@/test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

describe("Fetch Question Answers", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      MakeAnswer({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityId("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      MakeAnswer({
        createdAt: new Date(2022, 0, 18),
        questionId: new UniqueEntityId("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      MakeAnswer({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityId("question-1")
      })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1
    });

    expect(result.value?.answers).toHaveLength(3);
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022, 0, 23)
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 20)
      }),
      expect.objectContaining({
        createdAt: new Date(2022, 0, 18)
      })
    ]);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        MakeAnswer({
          questionId: new UniqueEntityId("question-1")
        })
      );
    }
    const result = await sut.execute({
      questionId: "question-1",
      page: 2
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});

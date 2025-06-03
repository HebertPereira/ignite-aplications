import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";
import { MakeAnswerComment } from "@/test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe("Fetch Answer Comments", async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({
        createdAt: new Date(2022, 0, 20),
        answerId: new UniqueEntityId("answer-1")
      })
    );
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({
        createdAt: new Date(2022, 0, 18),
        answerId: new UniqueEntityId("answer-1")
      })
    );
    await inMemoryAnswerCommentsRepository.create(
      MakeAnswerComment({
        createdAt: new Date(2022, 0, 23),
        answerId: new UniqueEntityId("answer-1")
      })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1
    });

    expect(result.value?.answerComments).toHaveLength(3);
    expect(result.value?.answerComments).toEqual([
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

  it("should be able to fetch paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        MakeAnswerComment({
          answerId: new UniqueEntityId("answer-1")
        })
      );
    }
    const result = await sut.execute({
      answerId: "answer-1",
      page: 2
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});

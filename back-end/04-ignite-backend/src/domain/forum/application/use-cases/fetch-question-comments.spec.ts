import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "@/test/repositories/in-memory-question-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { MakeQuestionComment } from "@/test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe("Fetch Question Comments", async () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to fetch question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityId("question-1")
      })
    );
    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({
        createdAt: new Date(2022, 0, 18),
        questionId: new UniqueEntityId("question-1")
      })
    );
    await inMemoryQuestionCommentsRepository.create(
      MakeQuestionComment({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityId("question-1")
      })
    );

    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 1
    });

    expect(questionComments).toHaveLength(3);
    expect(questionComments).toEqual([
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

  it("should be able to fetch paginated question comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        MakeQuestionComment({
          questionId: new UniqueEntityId("question-1")
        })
      );
    }
    const { questionComments } = await sut.execute({
      questionId: "question-1",
      page: 2
    });

    expect(questionComments).toHaveLength(2);
  });
});

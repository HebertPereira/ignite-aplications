import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { MakeAnswer } from "@/test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete an answer.", async () => {
    const newAnswer = MakeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({ answerId: "answer-1", authorId: "author-1" });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an answer.", async () => {
    const newAnswer = MakeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-2"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

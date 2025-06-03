import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { MakeQuestion } from "@/test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to dele a question", async () => {
    const newQuestion = MakeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: "question-1"
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not be notable to delete a question", async () => {
    const newQuestion = MakeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: "question-1"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

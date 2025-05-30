import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { MakeQuestion } from "@/test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

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

    expect(() => {
      return sut.execute({
        authorId: "author-2",
        questionId: "question-1"
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

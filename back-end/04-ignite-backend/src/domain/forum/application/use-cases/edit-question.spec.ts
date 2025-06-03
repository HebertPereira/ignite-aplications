import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { MakeQuestion } from "@/test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = MakeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-1",
      title: "Title test",
      content: "Content test"
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Title test",
      content: "Content test"
    });
  });

  it("should not be able to edit a question", async () => {
    const newQuestion = MakeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: "author-2",
      title: "Title test",
      content: "Content test"
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

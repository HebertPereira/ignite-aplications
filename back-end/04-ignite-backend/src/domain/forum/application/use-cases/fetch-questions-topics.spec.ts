import { InMemoryQuestionsRepository } from "@/test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "@/test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-questions-topics";
import { InMemoryQuestionAttachmentsRepository } from "@/test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: FetchRecentQuestionsUseCase;

describe("Fetch Question Topics", async () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 20) })
    );
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 18) })
    );
    await inMemoryQuestionsRepository.create(
      MakeQuestion({ createdAt: new Date(2022, 0, 23) })
    );

    const result = await sut.execute({
      page: 1
    });

    expect(result.value?.questions).toHaveLength(3);
    expect(result.value?.questions).toEqual([
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

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(MakeQuestion({}));
    }
    const result = await sut.execute({
      page: 2
    });

    expect(result.value?.questions).toHaveLength(2);
  });
});

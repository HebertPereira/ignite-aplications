import { InMemoryAnswerCommentsRepository } from "@/test/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "@/test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "@/test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "@/test/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

let sut: CommentOnAnswerUseCase;

describe("Comment On Answer", async () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = MakeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "Comment test"
    });
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "Comment test"
    );
  });
});

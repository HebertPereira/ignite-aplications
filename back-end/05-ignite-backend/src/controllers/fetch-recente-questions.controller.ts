import { Controller, Get, HttpCode, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jet-auth.guard";
import { ZodValidationPipe } from "@/pipes/zod-validation";
import { PrismaService } from "@/prisma/prisma.service";
import z from "zod";

const fetchRecentQuestionsParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().min(1)),
  size: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(z.number().min(1))
});

type FetchRecentQuestionsParamsSchema = z.infer<
  typeof fetchRecentQuestionsParamsSchema
>;

const QueryValidationPipe = new ZodValidationPipe(
  fetchRecentQuestionsParamsSchema
);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query(QueryValidationPipe) queryParams: FetchRecentQuestionsParamsSchema
  ) {
    const { page, size } = queryParams;

    const itemPerPage = size ? size : 20;
    const questions = await this.prisma.question.findMany({
      where: {},
      orderBy: { createdAt: "desc" },
      take: itemPerPage,
      skip: (page - 1) * itemPerPage
    });

    return { questions, page, size, totalItems: questions.length };
  }
}

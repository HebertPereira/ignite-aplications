import { UniqueEntityId } from "@/core/entities/unique-entity-id";

import { Either, right } from "@/core/either";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private NotificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content
    });

    await this.NotificationsRepository.create(notification);

    return right({ notification });
  }
}

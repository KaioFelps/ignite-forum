import { Notification } from "../../enterprise/entities/notification";

export interface INotificationRepository {
  create(notification: Notification): Promise<void>;
}

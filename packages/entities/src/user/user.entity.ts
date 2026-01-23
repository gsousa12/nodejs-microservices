import { BaseEntity } from "./base.entity";

export type UserEntity = {
  name: string;
  email: string;
  password: string;
} & BaseEntity;

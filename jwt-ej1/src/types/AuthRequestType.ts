import { Request } from "express";

export type AuthedRequest = Request & {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
};

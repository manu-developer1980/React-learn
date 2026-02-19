import { Request } from "express";

export type AuthedRequest = Request & {
  userId?: number;
  userName?: string;
  userEmail?: string;
  userRole?: string;
};

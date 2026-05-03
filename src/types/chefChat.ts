/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CookingResult } from './cooking';

export interface ChefChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChefChatResponse {
  status: "answer" | "revision" | "error";
  message: string;
  proposedResult?: CookingResult;
  warnings?: string[];
}

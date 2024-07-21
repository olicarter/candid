"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/lib/auth";

export async function createFeedback(formData: FormData) {
  const feedbackInputSchema = z.object({
    recipient: z.string().uuid(),
    content: z.string().trim(),
    created_by: z.string().uuid(),
  });

  const supabase = createClient();

  const user = await getUser();

  const feedbackInput = feedbackInputSchema.parse({
    recipient: formData.get("recipient"),
    content: formData.get("content"),
    created_by: user?.id,
  });

  const { error } = await supabase.from("feedback").insert(feedbackInput);

  if (error) throw error;
}

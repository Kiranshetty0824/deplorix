import { supabase } from "@/integrations/supabase/client";

export type EnquiryInput = {
  divisionId: string;
  topic: string;
  service?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  source: string;
};

export type LastEnquiry = {
  id: string;
  divisionId: string;
  topic: string;
  name: string;
  email: string;
  submittedAt: string;
};

const LAST_KEY = "deplorix:last-enquiry";

/** Short human-friendly reference shown to visitors and in the portal. */
export const enquiryRef = (id: string) => `DX-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;

/** Stores the enquiry. Visitors can insert but never read enquiries back. */
export const submitEnquiry = async (input: EnquiryInput): Promise<LastEnquiry> => {
  const id = crypto.randomUUID();
  const { error } = await supabase.from("enquiries").insert({
    id,
    division_id: input.divisionId,
    topic: input.topic,
    service: input.service || null,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message || null,
    source: input.source,
  });
  if (error) throw new Error("We couldn't send your request. Please try again or email us directly.");

  const last: LastEnquiry = {
    id,
    divisionId: input.divisionId,
    topic: input.topic,
    name: input.name,
    email: input.email,
    submittedAt: new Date().toISOString(),
  };
  sessionStorage.setItem(LAST_KEY, JSON.stringify(last));
  return last;
};

export const readLastEnquiry = (): LastEnquiry | null => {
  try {
    const raw = sessionStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as LastEnquiry) : null;
  } catch {
    return null;
  }
};

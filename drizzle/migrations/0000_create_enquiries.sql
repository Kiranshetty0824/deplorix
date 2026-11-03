CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  division_id text NOT NULL DEFAULT 'general',
  topic text NOT NULL DEFAULT 'General enquiry',
  service text,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  admin_notes text,
  replied_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT enquiries_status_check CHECK (status IN ('new', 'replied', 'closed')),
  CONSTRAINT enquiries_name_len CHECK (char_length(name) BETWEEN 2 AND 100),
  CONSTRAINT enquiries_email_len CHECK (char_length(email) BETWEEN 5 AND 255 AND email LIKE '%@%'),
  CONSTRAINT enquiries_phone_len CHECK (phone IS NULL OR char_length(phone) <= 30),
  CONSTRAINT enquiries_message_len CHECK (message IS NULL OR char_length(message) <= 2000),
  CONSTRAINT enquiries_topic_len CHECK (char_length(topic) <= 200),
  CONSTRAINT enquiries_division_len CHECK (char_length(division_id) <= 40),
  CONSTRAINT enquiries_service_len CHECK (service IS NULL OR char_length(service) <= 200),
  CONSTRAINT enquiries_source_len CHECK (char_length(source) <= 60)
);

GRANT INSERT ON public.enquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit enquiries"
ON public.enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new' AND admin_notes IS NULL AND replied_at IS NULL);

CREATE POLICY "Admins can view enquiries"
ON public.enquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enquiries"
ON public.enquiries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete enquiries"
ON public.enquiries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX enquiries_created_at_idx ON public.enquiries (created_at DESC);

CREATE TRIGGER update_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
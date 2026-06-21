CREATE TABLE public.internship_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  college_name TEXT NOT NULL,
  internship_start_date DATE NOT NULL,
  internship_end_date DATE NOT NULL,
  issue_date DATE NOT NULL,
  certificate_status TEXT NOT NULL DEFAULT 'Verified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.internship_certificates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.internship_certificates TO authenticated;
GRANT ALL ON public.internship_certificates TO service_role;

ALTER TABLE public.internship_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can verify certificates"
  ON public.internship_certificates FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert certificates"
  ON public.internship_certificates FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update certificates"
  ON public.internship_certificates FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certificates"
  ON public.internship_certificates FOR DELETE
  TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_internship_certificates_updated_at
  BEFORE UPDATE ON public.internship_certificates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
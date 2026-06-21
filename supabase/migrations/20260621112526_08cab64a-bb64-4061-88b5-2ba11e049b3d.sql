CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

-- Tighten certificate write policies to admin role only
DROP POLICY "Authenticated users can insert certificates" ON public.internship_certificates;
DROP POLICY "Authenticated users can update certificates" ON public.internship_certificates;
DROP POLICY "Authenticated users can delete certificates" ON public.internship_certificates;

CREATE POLICY "Admins can insert certificates"
  ON public.internship_certificates FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificates"
  ON public.internship_certificates FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certificates"
  ON public.internship_certificates FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed certificate records
INSERT INTO public.internship_certificates (certificate_id, student_name, domain, college_name, internship_start_date, internship_end_date, issue_date, certificate_status) VALUES
('DTX-2026-SU01', 'Bhagyashankar', 'Web Development', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU02', 'P Prasad', 'Web Development', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU03', 'Navami Shet', 'Web Development', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU04', 'Navya H G', 'Web Development', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU05', 'Rahul Halasagi', 'Artificial Intelligence', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU06', 'Grisha H D', 'Artificial Intelligence', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU07', 'Drishya Monica', 'Artificial Intelligence', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU08', 'Ranjan Hegde', 'Cybersecurity', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU09', 'Manjunath Teli', 'Cybersecurity', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU10', 'Hitesh Pereira', 'Cybersecurity', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU11', 'Akshay Acharya', 'Cybersecurity', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified'),
('DTX-2026-SU12', 'Ashitha Maben', 'Cybersecurity', 'Srinivas University Institute of Engineering & Technology (SUIET)', '2026-06-01', '2026-06-30', '2026-06-30', 'Verified');
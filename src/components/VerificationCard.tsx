import { motion } from "framer-motion";
import { BadgeCheck, Calendar, GraduationCap, IdCard, Layers, ShieldCheck, User } from "lucide-react";
import type { Certificate } from "@/lib/certificate";
import { formatDate, formatDuration } from "@/lib/certificate";

const Row = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-3 border-b border-border/60 last:border-0">
    <Icon className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm md:text-base font-medium text-foreground break-words">{value}</div>
    </div>
  </div>
);

const VerificationCard = ({ cert }: { cert: Certificate }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-card rounded-3xl border border-border shadow-[var(--shadow-card)] overflow-hidden"
  >
    <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-5 flex items-center gap-3">
      <div className="h-11 w-11 rounded-full bg-emerald-500 text-white flex items-center justify-center">
        <BadgeCheck className="h-6 w-6" />
      </div>
      <div>
        <div className="text-emerald-700 text-sm font-semibold tracking-wide">CERTIFICATE VERIFIED</div>
        <div className="text-emerald-900/70 text-xs">Authentic credential issued by DeploriX Technologies</div>
      </div>
    </div>
    <div className="px-6 py-5">
      <Row icon={User} label="Student Name" value={cert.student_name} />
      <Row icon={IdCard} label="Certificate ID" value={cert.certificate_id} />
      <Row icon={Layers} label="Domain" value={cert.domain} />
      <Row icon={GraduationCap} label="College Name" value={cert.college_name} />
      <Row
        icon={Calendar}
        label="Internship Duration"
        value={formatDuration(cert.internship_start_date, cert.internship_end_date)}
      />
      <Row icon={Calendar} label="Issue Date" value={formatDate(cert.issue_date)} />
      <Row icon={ShieldCheck} label="Certificate Status" value={cert.certificate_status} />
    </div>
  </motion.div>
);

export default VerificationCard;

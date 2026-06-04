import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { submitLead, captureEmail } from 'zite-endpoints-sdk';

const BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/ea9522b929284ffd98a4a4fe683c082b@ig.ca?anonymous&ep=plink';

const DISCLOSURE_URL =
  'https://www.investorsgroup.com/en/legal/disclosures';

const WEBPAGE_URL =
  'https://www.ig.ca/en/advisor/curtis_rebeck';

 const TRADEMARK_URL =
  'https://www.investorsgroup.com/en/legal/disclosures'; 

const btnPrimary =
  "w-full bg-[#0085CA] hover:bg-[#0073b1] text-white py-4 rounded-xl font-semibold shadow-lg transition-all hover:scale-[1.02]";

const cardEnhance =
  "bg-foreground/5 border border-foreground/10 rounded-xl shadow-md";

const reviews = [
  { name: "Bennett H.", text: "I've had a great experience working with Curtis Rebeck at IG Wealth. He's knowledgeable, easy to talk to, and takes the time to understand your goals before making recommendations. Everything is explained clearly, and he stays in touch regularly." },
  { name: "Tyler V.", text: "Highly recommend if you're looking for a financial advisor in Winnipeg. Curtis was very professional, responsive, and helped put together a clear long-term financial plan." },
  { name: "Brayden K.", text: "Had a great experience working with Curtis. He explained things clearly and helped me build my long-term financial plan." },
  { name: "Liron T.", text: "Curtis is very knowledgeable about investments, insurance and mortgages. I was super impressed after our consultation. He's also willing to pick up the phone and give you advice anytime you need, and for those reasons I highly recommend him for any of your financial needs!" },
  { name: "Ashton H.", text: "Great communication, showed me everything with detail before proceeding with investments. Took the time out of the day to make sure everything was going good and answering all questions I had." },
  { name: "Michael P.", text: "Curtis has been great to work with. He is very knowledgeable, organized, and easy to reach. I've had a great experience and would definitely recommend him." },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
const [form, setForm] = useState({
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
});
const [consented, setConsented] = useState(false);
const [formError, setFormError] = useState('');
const [score] = useState(() => Math.floor(Math.random() * 15) + 60);
const [answers, setAnswers] = useState({
  annualIncome: '',
  investedSoFar: '',
  challengingArea: '',
  improvePlanTimeline: '',
  livesInCanada: '',
});
const [submitting, setSubmitting] = useState(false);

const handleContinue = async () => {
  if (!form.firstname || !form.lastname || !form.phone || !form.email) {
    setFormError('Please complete all fields before continuing.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setFormError('Please enter a valid email address.');
    return;
  }

  if (!consented) {
    setFormError('Please provide consent to continue.');
    return;
  }

  setFormError('');
  setSubmitting(true);
  try {
    await submitLead({
      firstName: form.firstname,
      lastName: form.lastname,
      email: form.email,
      phone: form.phone,
      ...answers,
    });
  } catch (e) {
    // Still show results even if submission fails
    console.error('Failed to submit lead:', e);
  }
  setSubmitting(false);
  setStep(7);
};

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 2) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showFooter = step === 0 || step === 7;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#0b1d2f] via-[#0f2a45] to-[#132f4c]">
      <div className="w-full max-w-xl text-center">

        {step > 0 && step < 6 && (
          <div className="w-full bg-foreground/10 h-2 rounded-full mb-6">
            <div
              className="bg-foreground h-2 rounded-full transition-all"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">

{step === 0 && (
  <Step key="s0">

    {/* ✅ HERO GLOW */}
    <div className="relative">
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[150%] h-[360px] bg-[#0085CA]/25 blur-3xl rounded-full opacity-40" />
      </div>

      <div className="relative z-10">

{/* ✅ HERO PANEL */}
<div className="bg-gradient-to-b from-[#0b1d2f] to-[#071521] rounded-3xl p-10 mb-12 border border-white/10 shadow-2xl text-center">

  {/* ✅ BADGE */}
  <div className="inline-block bg-[#0085CA]/20 text-[#4fc3ff] px-4 py-1 rounded-full text-xs font-medium mb-5">
    Trusted by 350+ professionals, business owners & families
  </div>

  {/* ✅ HEADLINE */}
  <h1 className="text-[49px] font-semibold tracking-tight leading-[1.1] mb-4">
    How Much Could You Be Losing Each Year?
  </h1>

  {/* ✅ HOOK */}
  <p className="text-[#4fc3ff] font-medium text-lg mb-8 max-w-[700px] mx-auto leading-snug">
    Hidden inefficiencies in your strategy could be costing you thousands every year.
  </p>

  {/* ✅ CENTERED BENEFITS (CRITICAL CHANGE) */}
  <div className="flex flex-col items-center gap-3 mb-8">

    {[
      "Uncover missed tax-saving opportunities",
      "Ensure your investments are structured properly",
      "Get a clear, optimized financial strategy"
    ].map((item) => (
      <div key={item} className="flex items-center gap-3">

        <div className="w-5 h-5 rounded-full bg-[#0085CA] flex items-center justify-center text-white text-xs">
          ✓
        </div>

        <span className="text-[16px] text-white/90">
          {item}
        </span>

      </div>
    ))}

  </div>

  {/* ✅ TENSION */}
  <p className="text-sm text-amber-400">
    Most people only identify these gaps after they’ve already lost money.
  </p>

</div>
      </div>
    </div>

    {/* ✅ CTA ZONE (STRONGER DECISION MOMENT) */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center my-10">

      {/* ✅ CTA */}
      <button
        onClick={() => setStep(1)}
        className="w-[85%] bg-[#0085CA] text-white py-6 rounded-xl font-semibold text-[18px]
        shadow-[0_25px_50px_rgba(0,133,202,0.6)]
        hover:scale-[1.06]
        transition-all duration-300"
      >
        Unlock My Wealth Opportunities
      </button>

      {/* ✅ MICROCOPY */}
      <p className="text-sm text-muted-foreground mt-3">
        Takes 2 minutes to get started • No commitment required
      </p>

    </div>

{/* ✅ CONTACT (CENTERED CARD, IMAGE LEFT) */}
<div className="max-w-[700px] mx-auto flex items-center justify-center gap-5 bg-white/5 border border-white/10 rounded-xl p-6">

  <img
    src="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/urPEstKdyvJmFYefFqaXGz/pasted-image-1780269414006-cdogar7g.png"
  className="w-28 h-28 min-w-[96px] min-h-[96px] shrink-0 rounded-full object-cover ring-2 ring-white/10"
  alt="Profile"
/>


  <div className="space-y-1 text-left">
    <p className="text-base font-semibold">Curtis Rebeck</p>
    <p className="text-sm text-white/70">
      Consultant
    </p>
    <p className="text-sm text-white/60">
      204-981-5109
    </p>
    <p className="text-sm text-white/60">
      curtis.rebeck@ig.ca
    </p>
    <p className="text-xs text-white/40 mt-1">
      IG Wealth Management Inc. 
      </p>
     <p className="text-xs text-white/40 mt-1">
    Mutual Fund Division
    </p>
  </div>

</div>

    {/* ✅ DIVIDER */}
    <div className="h-[1px] w-full mb-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    {/* ✅ REVIEWS HEADER */}
    <p className="text-base text-[#4fc3ff] font-medium mb-4 text-left">
      Trusted by professionals, business owners, and families across Winnipeg
    </p>

    {/* ✅ REVIEWS */}
    <div className="space-y-5 mb-12">
      {[0, 1].map((offset) => {
        const r = reviews[(reviewIndex + offset) % reviews.length];

        return (
          <div
            key={`${reviewIndex}-${offset}`}
            className={`rounded-xl p-6 text-left transition-all
              ${offset === 0
                ? "bg-white/10 border border-white/20 scale-[1.03] shadow-xl"
                : "bg-white/5 border border-white/10 opacity-80"
              }`}
          >
            <div className="text-yellow-400 text-sm mb-2">★★★★★</div>

            <p className="text-[15px] italic max-w-[85%]">
              {r.text}
            </p>

            <p className="text-xs mt-3 text-muted-foreground">{r.name}</p>
          </div>
        );
      })}
    </div>

    {/* ✅ LOWER TRANSITION */}
    <p className="text-base text-muted-foreground text-left mb-4">
      Not ready yet? Start with these free resources:
    </p>

    {/* ✅ LOWER SECTION */}
    <div className="bg-gradient-to-b from-[#071521] to-[#0f2a45] border border-white/10 rounded-2xl p-6 shadow-xl">

      <div className="space-y-4">
        <LeadMagnet
          formId="resource-1"
          title="Retirement Income Planning Guide"
          desc="How to structure your income, reduce taxes, and ensure your savings last."
          thumbnail="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/jNMjhCNiiEvpbYCjzTRTbN/pasted-image-1779983347023-gy8pbi8p.png"
          downloadUrl="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/eb2M7KZigoPKiKZwk2WHH3/pasted-image-1779983755908-7hxciiwp.pdf"
        />

        <LeadMagnet
          formId="resource-2"
          title="Complete Financial Organizer"
          desc="A step-by-step system to organize your finances, assets, and important documents."
          thumbnail="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/aWeWiPVosSZ7g4zHsMBvUH/pasted-image-1779983347093-w0kuje13.png"
          downloadUrl="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/fUCi5YE2VTAGkF5Zy1SHuf/pasted-image-1779983437811-4dey703w.pdf"
        />
      </div>

    </div>

    {/* ✅ EMAIL */}
    <p className="text-[17px] text-white text-left font-medium mb-3 mt-8">
      Subscribe to our email list to stay informed
    </p>

    <EmailBox />

  </Step>
)}

{/* QUESTIONS */}

{step === 1 && (
  <Question
    key="s1"
    setStep={setStep}
    next={2}
    title="What is your annual household income?"
    options={["< $100k", "$100k - $150k", "$150k - $250k", "$250k+"]}
    onSelect={(v: string) => setAnswers(a => ({ ...a, annualIncome: v }))}
  />
)}

{step === 2 && (
  <Question
    key="s2"
    setStep={setStep}
    next={3}
    title="How much have you invested so far?"
    options={["< $100k", "$100k - $250k", "$250k - $500k", "$500k+"]}
    onSelect={(v: string) => setAnswers(a => ({ ...a, investedSoFar: v }))}
  />
)}

{step === 3 && (
  <Question
    key="s3"
    setStep={setStep}
    next={4}
    title="Which area feels most challenging right now?"
    options={[
      "Tax efficiency",
      "Long-term growth planning",
      "Confidence in my overall approach",
      "Coordinating multiple moving parts",
      "Not sure - I just want a second opinion",
    ]}
    onSelect={(v: string) => setAnswers(a => ({ ...a, challengingArea: v }))}
  />
)}

{step === 4 && (
  <Question
    key="s4"
    setStep={setStep}
    next={5}
    title="When are you looking to improve your plan?"
    options={[
      "Immediately",
      "Within the next 3–6 months",
      "Just exploring for now",
    ]}
    onSelect={(v: string) => setAnswers(a => ({ ...a, improvePlanTimeline: v }))}
  />
)}

{step === 5 && (
  <Question
    key="s5"
    setStep={setStep}
    next={6}
    title="Do you currently live in Canada?"
    options={["Yes", "No"]}
    onSelect={(v: string) => setAnswers(a => ({ ...a, livesInCanada: v }))}
  />
)}
{/* ✅ CONTACT FORM STEP */}
{step === 6 && (
  <Step key="s6">

    {/* ✅ HEADER BLOCK */}
    <div className="mb-10 text-center">
      <h2 className="text-[42px] font-semibold leading-tight mb-3">
        Unlock Your Personalized Strategy Results
      </h2>

      <p className="text-[15px] text-muted-foreground max-w-[420px] mx-auto">
        Enter your details to access your personalized financial strategy overview.
      </p>
    </div>

    {/* ✅ FORM AREA */}
    <div className="w-full max-w-[460px] mx-auto">

      {/* ✅ INPUT STACK */}
      <div className="space-y-3">

        {[
          { key: "firstname", placeholder: "First name", auto: "given-name" },
          { key: "lastname", placeholder: "Last name", auto: "family-name" },
          { key: "phone", placeholder: "Phone", auto: "tel" },
          { key: "email", placeholder: "Email", auto: "email" },
        ].map((field) => (
          <input
            key={field.key}
            autoComplete={field.auto}
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            className="
              w-full
              h-[52px]
              px-4
              rounded-lg

              bg-white
              text-[#0b1d2f]
              placeholder:text-gray-400

              border border-transparent
              shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]

              focus:outline-none
              focus:ring-2 focus:ring-[#0085CA]/30
              focus:border-[#0085CA]

              transition-all
            "
          />
        ))}

      </div>

      {/* ✅ CTA BREAK */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button
          onClick={handleContinue}
          disabled={submitting}
          className="
            w-full bg-white text-[#0b1d2f] py-5 rounded-xl font-semibold text-[16px]
            shadow-[0_15px_35px_rgba(0,0,0,0.35)]
            transition-all duration-200
            hover:bg-[#0085CA] hover:text-white hover:scale-[1.05]
            active:scale-[0.98]
            disabled:opacity-70 disabled:cursor-not-allowed
          "
        >
          {submitting ? 'Submitting...' : 'See My Personalized Strategy'}
        </button>
      </div>

    </div>

    {/* ✅ CONSENT */}
    <div className="mt-6 max-w-[450px] mx-auto text-left">
      <ConsentWithState
        checked={consented}
        onChange={(v) => {
          setConsented(v);
          setFormError('');
        }}
      />
    </div>

    {formError && <p className="text-xs text-red-400 mt-2 text-center">{formError}</p>}

  </Step>
)}

{step === 7 && (
  <Step key="s7">

    {/* ✅ RESULT HEADER */}
<div className="text-center mb-6">

  <h2 className="text-[28px] font-semibold text-white leading-tight">
    You’re likely leaving money on the table
  </h2>

  <p className="text-[18px] text-white/60 mt-2 max-w-[410px] mx-auto">
    Here’s where your strategy may be falling short:
  </p>

</div>

 <div className="max-w-[360px] mx-auto mb-8 space-y-3">

  {[
    "Paying more tax than necessary",
    "Investments not structured efficiently",
    "Gaps in long-term strategy"
  ].map((item) => (
    <div
      key={item}
      className="bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 flex items-center justify-center text-center text-[14px] text-white/90"
    >
      {item}
    </div>
  ))}

</div>

    {/* ✅ LOCKED SECTION (KEEP — IT WORKS) */}
    <div className="max-w-[420px] mx-auto mb-10">

      <div className="bg-white/5 border border-dashed border-white/20 rounded-xl p-6 text-center">

        <p className="text-sm text-white/60 mb-3">
          Here’s a preview of your personalized breakdown:
        </p>

        <ul className="text-sm text-white/70 space-y-2 blur-sm">
          <li>Where improvements may be possible</li>
          <li>Strategies that could enhance efficiency</li>
          <li>Ways to strengthen your long-term plan</li>
        </ul>

        <p className="text-sm text-amber-400 mt-4">
          We’ll walk you through your full breakdown on your strategy call so you can see exactly where to improve.
        </p>

      </div>

    </div>

    {/* ✅ CTA */}
    <div className="text-center mb-8">

      <a
        href="https://outlook.office.com/bookwithme/user/ea9522b929284ffd98a4a4fe683c082b@ig.ca/meetingtype/mCoYrUaph0OCrItKT38JYA2?anonymous&ismsaljsauthenabled&ep=mcard"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block
          w-[90%]
          max-w-[420px]

          bg-[#0085CA]
          text-white
          py-6
          rounded-xl
          text-[18px]
          font-semibold

          shadow-[0_25px_60px_rgba(0,133,202,0.55)]

          hover:bg-[#2ea8eb]
          hover:scale-[1.03]

          transition-all duration-300
        "
      >
        Book My Free Strategy Call
      </a>

      <p className="text-xs text-white/60 mt-3">
        Get a personalized plan based on your answers on a quick 10-minute call
      </p>

    </div>

    {/* ✅ CONTACT (FIXED — PROFESSIONAL, NOT HEAVY) */}
    <div className="max-w-[420px] mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">

      <img
        src="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/urPEstKdyvJmFYefFqaXGz/pasted-image-1780269414006-cdogar7g.png"
        className="w-12 h-12 rounded-full object-cover"
        alt="Profile"
      />

      <div>
        <p className="text-sm font-medium">Curtis Rebeck</p>
        <p className="text-xs text-white/70">
          Consultant
        </p>
        <p className="text-xs text-white/60">
          204-981-5109 • curtis.rebeck@ig.ca
        </p>
        <p className="text-[10px] text-white/40 mt-1">
          IG Wealth Management Inc. Mutual Fund Division
        </p>
      </div>

    </div>

  </Step>
)}

        </AnimatePresence>

        {showFooter && (
  <div className="mt-10 pt-6 border-t border-foreground/10 text-center space-y-3">

    {/* ✅ IG LOGO */}
    <div className="flex justify-center">
      <img
        src="https://images.fillout.com/orgid-709482/flowpublicid-k8tpxt55fg/widgetid-default/ekDhcW7SYb3YERBhfQ5rWH/pasted-image-1779986100595-zxvk1cpc.png"
        alt="IG Wealth Management"
        className="h-8 object-contain"
      />
    </div>

    {/* ✅ FULL DISCLAIMER */}
    <p className="text-[10px] text-muted-foreground leading-snug max-w-[90%] mx-auto">
      This Site is provided for general informational purposes only and does not constitute personalized or specific advice on financial planning, investment, insurance, financial, legal, accounting, tax or similar matters.
    </p>
    
    {/* ✅ COMPANY LINE */}
    <p className="text-[11px] text-muted-foreground">
      IG Wealth Management Inc. Mutual Fund Division
    </p>

<div className="flex justify-center gap-3">
  <a href={DISCLOSURE_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground underline">
    Disclosures
  </a>

  <a href={TRADEMARK_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground underline">
    Trademark
  </a>

  <a href={WEBPAGE_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground underline">
    Webpage
  </a>
</div>

          </div>
        )}

      </div>
    </div>
  );
}

/* COMPONENTS */

function Step({ children }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}

function Question({ title, options, next, setStep, onSelect }: any) {
  return (
    <Step>
      {/* ✅ QUESTION */}
      <h2 className="text-[28px] font-semibold mb-3 text-white">
        {title}
      </h2>

      {/* ✅ SUBTEXT */}
      <p className="text-sm text-muted-foreground mb-8">
        Choose the option that best matches your situation
      </p>

      {/* ✅ OPTIONS */}
      <div className="space-y-4">
        {options.map((option: string) => (
          <button
            key={option}
            onClick={() => { onSelect?.(option); setStep(next); }}
            className="
  w-full
  bg-white
  text-[#0b1d2f]
  border border-white/20

  py-4
  rounded-xl
  text-[16px]
  font-medium

  shadow-sm

  transition-all duration-200
  hover:bg-[#0085CA]
  hover:text-white
  hover:border-[#0085CA]
  hover:shadow-[0_10px_25px_rgba(0,133,202,0.4)]
  hover:scale-[1.02]

  active:scale-[0.98]
            "
          >
            {option}
          </button>
        ))}
      </div>
    </Step>
  );
}

const CONSENT_TEXT = `By providing my telephone number and/or email address above, I CONSENT to IG Wealth Management using this information to contact me for marketing purposes. I can withdraw my consent at any time by following the unsubscribe instructions in any marketing emails I receive from IG Wealth Management. We are committed to keeping personal information confidential. The information collected above may be used by IG Wealth Management and shared with its affiliates to inform you on investment opportunities, provide additional financial information from time to time, and for other internal purposes.`;

/* CONSENT (uncontrolled - for EmailBox) */
function Consent() {
  return (
    <div className="mt-3 pt-3 border-t border-foreground/10 w-full text-left">
      <label className="flex items-start gap-2 w-full cursor-pointer">
        <input type="checkbox" className="mt-[3px] shrink-0" />
        <span className="text-[10px] leading-snug text-muted-foreground">{CONSENT_TEXT}</span>
      </label>
    </div>
  );
}

/* CONSENT (controlled - for LeadMagnets) */
function ConsentWithState({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="mt-3 pt-3 border-t border-foreground/10 w-full text-left">
      <label className="flex items-start gap-2 w-full cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-[3px] shrink-0" />
        <span className="text-[10px] leading-snug text-muted-foreground">{CONSENT_TEXT}</span>
      </label>
    </div>
  );
}

function LeadMagnet({ title, desc, thumbnail, downloadUrl, formId }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consented) {
      setError('Please provide your consent to continue.');
      return;
    }
    setError('');
    try {
      await captureEmail({ name: name.trim(), email, source: 'Resource Download', resourceName: title });
    } catch (e) {
      console.error('Failed to capture email:', e);
    }
    window.open(downloadUrl, '_blank');
  };

  return (
    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="bg-foreground/5 border border-foreground/10 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <img src={thumbnail} alt={title} className="w-[90px] h-[120px] rounded-md object-cover shrink-0" />
        <div className="flex-1 text-left">
          <p className="font-semibold text-[15px]">{title}</p>
          <p className="text-sm text-muted-foreground mb-3">{desc}</p>
          <div className="space-y-2">
            <input
              name={`${formId}_xname`}
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400"
              placeholder="Name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
            />
            <div className="flex gap-2">
              <input
                name={`${formId}_xemail`}
                autoComplete="new-password"
                className="flex-1 px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400"
                placeholder="Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
              />
              <button
                type="button"
                onClick={handleDownload}
                className="bg-[#0085CA] hover:bg-[#0073b1] text-white px-3 py-2 rounded-lg text-sm"
              >
                Download
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
      </div>

<ConsentWithState
  checked={consented}
  onChange={(v) => setConsented(v)}
/>

    </form>
  );
}


function EmailBox() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [error, setError] = useState('');
const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (!consented) {
      setError('Please provide consent to subscribe.');
      return;
    }

    setError('');
    try {
      await captureEmail({ name: name.trim(), email, source: 'Newsletter Subscription' });
    } catch (e) {
      console.error('Failed to capture email:', e);
    }
    setSuccess(true);
    setName('');
    setEmail('');
    setConsented(false);
  };

  return (
    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }} className="bg-foreground/5 border border-foreground/10 rounded-xl p-5">
      
      <p className="font-semibold text-left mb-1">
        Get insights to optimize your strategy
      </p>

      <p className="text-sm text-muted-foreground mb-3 text-left">
        Subscribe to our email list to gain valuable insights and stay up to date on markets.
      </p>

      <div className="space-y-2">
        <input
          name="nl_xname"
          autoComplete="new-password"
          className="w-full px-3 py-2 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        <div className="flex gap-2">
          <input
            name="nl_xemail"
            autoComplete="new-password"
            className="flex-1 px-3 py-2 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />

          <button
            type="button"
            onClick={handleSubscribe}
            className="bg-[#0085CA] hover:bg-[#0073b1] text-white px-3 py-2 rounded-lg text-sm"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* ✅ ERROR MESSAGE */}
      {error && (
        <p className="text-xs text-red-400 mt-2 text-left">{error}</p>
      )}

      {/* ✅ CONSENT (REQUIRED) */}
      <ConsentWithState
        checked={consented}
        onChange={(v) => {
          setConsented(v);
          setError('');
        }}
      />

      {success && (
        <p className="text-sm text-green-400 mt-3 text-left">
          ✅ You're subscribed! Check your inbox for updates.
        </p>
      )}
    </form>
  );
}

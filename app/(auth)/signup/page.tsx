'use client';

import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  School,
  Users,
  CreditCard,
  Loader2,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';

const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

/**
 * Supported academic levels for registration.
 */
const LEVELS = ['Nursery', 'Primary', 'Junior Secondary', 'Senior Secondary'];

/**
 * Supported student enrollment count ranges.
 */
const STUDENT_RANGES = ['1-100', '101-300', '301-600', '601-1000', '1000+'];

/**
 * Available subscription plans for the school portal.
 */
const PLANS = [
  {
    name: 'Starter',
    price: '₦40,000',
    desc: 'Up to 200 students',
    period: '/term',
  },
  {
    name: 'Growth',
    price: '₦75,000',
    desc: 'Up to 800 students',
    period: '/term',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Unlimited students',
    period: '',
  },
];

/**
 * Steps sequence definition for the registration onboarding wizard.
 */
const STEPS = [
  { id: 1, label: 'School Info', short: 'info', icon: School },
  { id: 2, label: 'Admin Contact', short: 'contact', icon: Users },
  { id: 3, label: 'Choose Plan', short: 'plan', icon: CreditCard },
];

/**
 * Animation presets for slide transition states.
 */
const slide: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

/**
 * Shape of the registration form data structure.
 */
interface FormState {
  school_name: string;
  address: string;
  state: string;
  level: string[];
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  student_count: string;
  plan: string;
}

/**
 * Strongly typed inline component for rendering form text inputs outside the main form component.
 */
const Field = ({
  label,
  //   name,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
}) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-50">
      {label}
    </label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-12 rounded-2xl bg-white border text-black placeholder:text-slate-500 text-sm focus:bg-white transition-all ${
        error
          ? 'border-red-400/70 bg-red-500/10'
          : 'border-white/15 focus:border-green-400/60'
      }`}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

/**
 * SchoolSignup Component.
 *
 * Provides a dynamic, multi-step onboarding wizard for new schools signing up
 * to the Rektora portal. Features validation check hooks and strong TypeScript typings.
 */
export default function SchoolSignup() {
  // Current active wizard tab index (1-based)
  const [step, setStep] = useState<number>(1);

  // Submitting state for API endpoints
  const [loading, setLoading] = useState<boolean>(false);

  // Completion state flag
  const [done, setDone] = useState<boolean>(false);

  // Form fields state with explicit FormState generic to prevent level being inferred as never[]
  const [form, setForm] = useState<FormState>({
    school_name: '',
    address: '',
    state: '',
    level: [],
    admin_name: '',
    admin_email: '',
    admin_phone: '',
    student_count: '',
    plan: '',
  });

  // Step validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Updates a single property in the form state safely.
   *
   * @param key The specific form key to update
   * @param val The type-safe value matching the form state key property
   */
  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  /**
   * Toggles the selection of a specific academic level in the form state.
   *
   * @param levelName The string representing the academic level (e.g., "Nursery")
   */
  const toggleLevel = (levelName: string) => {
    set(
      'level',
      form.level.includes(levelName)
        ? form.level.filter((x) => x !== levelName)
        : [...form.level, levelName],
    );
  };

  /**
   * Validates form fields for the current wizard step and updates the validation errors state.
   *
   * @returns A boolean indicating whether the current wizard step form data is valid.
   */
  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (step === 1) {
      if (!form.school_name.trim()) e.school_name = 'Required';
      if (!form.address.trim()) e.address = 'Required';
      if (!form.state.trim()) e.state = 'Required';
      if (form.level.length === 0) e.level = 'Select at least one level';
    }

    if (step === 2) {
      if (!form.admin_name.trim()) e.admin_name = 'Required';
      if (!form.admin_email.trim() || !form.admin_email.includes('@'))
        e.admin_email = 'Valid email required';
      if (!form.admin_phone.trim()) e.admin_phone = 'Required';
    }

    if (step === 3) {
      if (!form.student_count) e.student_count = 'Required';
      if (!form.plan) e.plan = 'Select a plan';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch('/api/auth/signup-school', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.type === 'existing_application') {
          setErrors({ general: data.message });
          toast.error(data.message, { position: 'top-center' });
        }
        throw new Error(data.message || 'Signup failed');
      }

      setDone(true);
    } catch (error: unknown) {
      console.error('Signup error:', error);
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  // ----SUCCESS------
  if (done) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/nigerian_school_class.png')" }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#0a1628]/95 via-[#0d2260]/90 to-[#063d28]/92" />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10 text-center max-w-sm"
        >
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/40">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-white mb-3">
            You&apos;re in!
          </h2>
          <p className="text-slate-100 text-sm leading-relaxed mb-8">
            Your school application is under review. We&apos;ll activate your
            account within 24 hours and notify{' '}
            <span className="text-green-400 font-semibold">
              {form.admin_email}
            </span>
          </p>
          <Link href="/">
            <Button className="rounded-2xl bg-white text-[#0d2260] hover:bg-slate-100 font-bold px-8 h-12 text-sm shadow-xl cursor-pointer">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Multi-step signup form UI shell */}
      {/*Background*/}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/nigerian_school_class.png')" }}
      />
      {/* Dark gradient overlay - heavier at right where form lives */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a1628]/60 via-[#0d2260]/78 to-[#0a1628]/96" />

      {/* Subtle color splashes */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-br from-[#0a1628]/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-600/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-40 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl" />

      {/* ---Layout--- */}
      <div className="relative z-10 w-full min-h-screen flex">
        {/* LEFT: Branding panel */}
        <div className="hidden lg:flex flex-col justify-between flex-1 p-12 xl:p-16 max-w-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/rektora_icon_only_white.png"
              alt="Rektora"
              width={40}
              height={40}
              className="w-10 h-10 lg:w-15 lg:h-15"
            />
            <span className="font-heading font-extrabold text-2xl text-white group-hover:text-green-400 transition-colors">
              Rektora
            </span>
          </Link>

          {/* Big headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-4">
                School Management Platform
              </p>
              <h1 className="font-heading font-extrabold  text-5xl xl:text-6xl text-white leading-[1.1] mb-6">
                Give your
                <br />
                school a <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-emerald-300 to-teal-400">
                    digital edge.
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-green-400 to-teal-400 rounded-full opacity-50" />
                </span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-xs">
                Join hundreds of Nigerian schools that have replaced notebooks
                and WhatsApp with Rektora
              </p>
            </motion.div>
          </div>

          {/* Bottom badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 max-w-xs">
              <div className="flex -space-x-2">
                {['CO', 'EN', 'FB', 'AO'].map((init, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0d2260] flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: ['#1a3a8f', '#0d5c3a', '#7c3aed', '#c2410c'][
                        i
                      ],
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-xs">
                  Trusted by school admins
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Form panel */}
        <div className="w-full lg:w-120 xl:w-130 shrink-0 flex flex-col justify-center p-6 lg:p-10 xl:p-12">
          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
            <Image
              src="/icon_only_white.png"
              alt="Rektora"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-heading font-extrabold text-xl text-white">
              Rektora
            </span>
          </Link>

          {/* Form heading */}
          <div className="mb-8">
            <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-1">
              Step {step} of {STEPS.length}
            </p>
            <h2 className="font-heading font-semibold text-2xl xl:text-3xl text-white">
              {STEPS[step - 1].label}
            </h2>
          </div>

          {/* Progress track */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col items-center gap-1"
                  style={{ width: '33%' }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > s.id ? 'bg-green-500 text-white' : step === s.id ? 'bg-white text-[#0d2260] shadow-lg shadow-white/30' : 'bg-white/10 text-white/30'}`}
                  >
                    {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${step === s.id ? 'text-white' : 'text-white/30'}`}
                  >
                    {s.short}
                  </span>
                </div>
              ))}
            </div>
            {/* Bar */}
            <div className="relative h-1 bg-white/10 rounded-full mt-2 mx-3">
              <motion.div
                className="absolute inset-y-0 left-0 bg-linear-to-br from-green-400 to-emerald-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  variants={slide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <Field
                    label="School Name"
                    name="school_name"
                    placeholder="e.g. Greenfield Academy"
                    value={form.school_name}
                    error={errors.school_name}
                    onChange={(val) => set('school_name', val)}
                  />
                  <Field
                    label="Address"
                    name="address"
                    placeholder="School street address"
                    value={form.address}
                    error={errors.address}
                    onChange={(val) => set('address', val)}
                  />
                  {/* <Field
                    label="State"
                    name="state"
                    placeholder="e.g. Lagos, Abuja, Kano…"
                    value={form.state}
                    error={errors.state}
                    onChange={(val) => set('state', val)}
                  /> */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-50">
                      State
                    </label>
                    <select
                      value={form.state}
                      onChange={(e) => set('state', e.target.value)}
                      className={`h-12 w-full rounded-2xl px-3 text-sm border bg-transparent text-white transition-all appearance-none cursor-pointer ${errors.state ? 'border-red-400/70 bg-red-500/10' : 'border-white/75 focus:border-green-400/60'} focus:outline-none focus:ring-0`}
                      style={{ backgroundColor: '#0d1b2e' }}
                    >
                      <option
                        value=""
                        disabled
                        style={{ backgroundColor: '#0d1b2e' }}
                      >
                        Select a state...
                      </option>
                      {NIGERIAN_STATES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          style={{ backgroundColor: '#0d1b2e' }}
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-400 text-xs">{errors.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-50">
                      School Level(s)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEVELS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => toggleLevel(l)}
                          className={`relative py-3 px-4 rounded-2xl text-sm font-semibold border transition-all duration-200 flex items-center gap-2 cursor-pointer text-white/75 ${
                            form.level.includes(l)
                              ? 'bg-green-500/20 border-green-400/60 text-green-300 shadow-lg shadow-green-500/10'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                              form.level.includes(l)
                                ? 'border-green-400 bg-green-400'
                                : 'border-slate-500'
                            }`}
                          >
                            {form.level.includes(l) && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          {l}
                        </button>
                      ))}
                    </div>
                    {errors.level && (
                      <p className="text-xs text-red-400">{errors.level}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  variants={slide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <Field
                    label="Full Name"
                    name="admin_name"
                    placeholder="Your full name"
                    value={form.admin_name}
                    error={errors.admin_name}
                    onChange={(val) => set('admin_name', val)}
                  />
                  <Field
                    label="Email Address"
                    name="admin_email"
                    type="email"
                    placeholder="admin@yourschool.com"
                    value={form.admin_email}
                    error={errors.admin_email}
                    onChange={(val) => set('admin_email', val)}
                  />
                  <Field
                    label="Phone Number"
                    name="admin_phone"
                    placeholder="+234 800 000 0000"
                    value={form.admin_phone}
                    error={errors.admin_phone}
                    onChange={(val) => set('admin_phone', val)}
                  />
                  <div className="rounded-2xl bg-blue-500/10 border border-blue-400/20 px-4 py-3 text-xs text-blue-300 leading-relaxed">
                    💡 This email will be used to activate your Rektora account
                    and receive login credentials.
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  variants={slide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-50">
                      Number of Students
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {STUDENT_RANGES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => set('student_count', r)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            form.student_count === r
                              ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/25'
                              : 'bg-white/5 border-white/10 text-slate-50 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    {errors.student_count && (
                      <p className="text-xs text-red-400">
                        {errors.student_count}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-50">
                      Subscription Plan
                    </label>
                    {PLANS.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => set('plan', p.name)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-200 text-left group cursor-pointer ${
                          form.plan === p.name
                            ? 'bg-green-500/15 border-green-400/60 shadow-lg shadow-green-500/10'
                            : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                              form.plan === p.name
                                ? 'border-green-400 bg-green-400'
                                : 'border-slate-500'
                            }`}
                          >
                            {form.plan === p.name && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold text-sm ${form.plan === p.name ? 'text-white' : 'text-slate-300'}`}
                              >
                                {p.name}
                              </span>
                              {p.popular && (
                                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5">
                              {p.desc}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-heading font-extrabold text-sm ${form.plan === p.name ? 'text-green-400' : 'text-slate-400'}`}
                        >
                          {p.price}
                          <span className="text-xs font-normal opacity-70">
                            {p.period}
                          </span>
                        </span>
                      </button>
                    ))}
                    {errors.plan && (
                      <p className="text-xs text-red-400">{errors.plan}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 text-slate-50 hover:text-white transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link
                href="/"
                className="text-slate-50 hover:text-slate-300 text-sm transition-colors"
              >
                ← Home
              </Link>
            )}

            {step < 3 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 bg-linear-to-br from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-green-500/30 transition-all hover:shadow-green-500/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 bg-linear-to-br from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-green-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-green-500/50 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit Application <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-center text-xs text-slate-50 mt-6">
            Already registered?{' '}
            <Link
              href="/signin"
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

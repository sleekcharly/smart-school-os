"use client";

import { CheckCircle2, ArrowRight, ArrowLeft, School, Users, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Supported academic levels for registration.
 */
const LEVELS = ["Nursery", "Primary", "Junior Secondary", "Senior Secondary"];

/**
 * Supported student enrollment count ranges.
 */
const STUDENT_RANGES = ["1-100", "101-300", "301-600", "601-1000", "1000+"];

/**
 * Available subscription plans for the school portal.
 */
const PLANS = [
    { name: "Starter", price: "₦20,000", desc: "Up to 200 students", period: "/term" },
    { name: "Growth", price: "₦40,000", desc: "Up to 800 students", period: "/term", popular: true },
    { name: "Enterprise", price: "Custom", desc: "Unlimited students", period: "" },
];

/**
 * Steps sequence definition for the registration onboarding wizard.
 */
const STEPS = [
    { id: 1, label: "School Info", short: 'info', icon: School },
    { id: 2, label: "Admin Contact", short: 'contact', icon: Users },
    { id: 3, label: "Choose Plan", short: 'plan', icon: CreditCard },
];

/**
 * Animation presets for slide transition states.
 */
const slide = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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
 * SchoolSignup Component.
 * 
 * Provides a dynamic, multi-step onboarding wizard for new schools signing up
 * to the Eduvia portal. Features validation check hooks and strong TypeScript typings.
 */
export default function SchoolSignup() {
    // Current active wizard tab index (1-based)
    const [step, setStep] = useState<number>(1);

    // Submitting state for API endpoints
    const [loading, setLoading] = useState<boolean>(false);

    // Completion state flag
    const [done, setDone] = useState<boolean>(true);

    // Form fields state with explicit FormState generic to prevent level being inferred as never[]
    const [form, setForm] = useState<FormState>({
        school_name: "",
        address: "",
        state: "",
        level: [],
        admin_name: "",
        admin_email: "",
        admin_phone: "",
        student_count: "",
        plan: "",
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
            "level",
            form.level.includes(levelName)
                ? form.level.filter((x) => x !== levelName)
                : [...form.level, levelName]
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
            if (!form.school_name.trim()) e.school_name = "Required";
            if (!form.address.trim()) e.address = "Required";
            if (!form.state.trim()) e.state = "Required";
            if (form.level.length === 0) e.level = "Selecte at least one level";
        }

        if (step === 2) {
            if (!form.admin_name.trim()) e.admin_name = "Required"
            if (!form.admin_email.trim() || !form.admin_email.includes("@")) e.admin_email = "Valid email required";
            if (!form.admin_phone.trim()) e.admin_phone = "Required";
        }

        if (step === 3) {
            if (!form.student_count) e.student_count = "Required";
            if (!form.plan) e.plan = "Select a plan";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    const next = () => { if (validate()) setStep(s => s + 1) }
    const back = () => setStep(s => s - 1)

    const submit = async () => {
        if (!validate()) return;
        setLoading(true);

        setLoading(false);
        setDone(true)
    }

    /**
     * Strongly typed inline component for rendering form text inputs.
     */
    const Field = ({
        label,
        name,
        type = "text",
        placeholder,
    }: {
        label: string;
        name: Exclude<keyof FormState, "level">;
        type?: string;
        placeholder?: string;
    }) => (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
            <Input
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={(e) => set(name, e.target.value)}
                className={`h-12 rounded-2xl bg-white/8 border text-white placeholder:text-slate-500 text-sm focus:bg-white/12 transition-all ${errors[name] ? "border-red-400/70 bg-red-500/10" : "border-white/15 focus:border-green-400/60"}`}
            />
            {errors[name] && <p className="text-xs text-red-400">{errors[name]}</p>}
        </div>
    );


    // ----SUCCESS------
    if (done) {
        return (
            <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/nigerian_school_class.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0d2260]/90 to-[#063d28]/92" />
                <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative z-10 text-center max-w-sm">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/40">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="font-heading font-extrabold text-3xl text-white mb-3">You&apos;re in!</h2>
                    <p className="text-slate-100 text-sm leading-relaxed mb-8">
                        Your school application is under review. We'll activate your account within 24 hours and notify{" "}
                        <span className="text-green-400 font-semibold">{form.admin_email}</span>
                    </p>
                    <Link href="/">
                        <Button className="rounded-2xl bg-white text-[#0d2260] hover:bg-slate-100 font-bold px-8 h-12 text-sm shadow-xl cursor-pointer">
                            Back to Home
                        </Button></Link>
                </motion.div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Multi-step signup form UI shell */}
        </main>
    );
}
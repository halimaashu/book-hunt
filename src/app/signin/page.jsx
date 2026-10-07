"use client";

import { authClient } from "@/lib/auth-client";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiGoogleFill } from "react-icons/ri";
import { FaBookOpen, FaStar } from "react-icons/fa";
import {
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiAlertCircle,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";

const perks = [
  "Thousands of original books in every genre",
  "Secure Stripe payment and tracked delivery",
  "Free account, ready in under a minute",
];

const rules = [
  { label: "8+ characters", test: (v) => v.length >= 8 },
  { label: "1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v) => /[0-9]/.test(v) },
];

export default function SignUpPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoOk, setPhotoOk] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password strength: 0 to 4
  const passed = rules.filter((r) => r.test(password)).length;
  const score = password ? passed + (/[^A-Za-z0-9]/.test(password) ? 1 : 0) : 0;
  const strength = [
    { text: "", bar: "bg-slate-200" },
    { text: "Weak", bar: "bg-red-500" },
    { text: "Fair", bar: "bg-orange-500" },
    { text: "Good", bar: "bg-yellow-500" },
    { text: "Strong", bar: "bg-green-500" },
  ][Math.min(score, 4)];

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, name, image } = Object.fromEntries(formData.entries());

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/login",
      });

      if (error) {
        setError(error.message || "Could not create your account. Please try again.");
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 lg:flex-row lg:bg-white">
      {/* Image panel: top banner on mobile, left side on desktop */}
      <aside className="relative h-44 w-full overflow-hidden sm:h-56 lg:h-auto lg:min-h-screen lg:w-1/2">
        <Image
          src={"/book-hunt-signup-bg.webp"}
          alt="Books on display"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-green-900/60" />

        <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8 lg:p-12">
          <Link href="/" className="flex w-fit items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-red-600 sm:h-10 sm:w-10">
              <FaBookOpen />
            </span>
            <span className="text-xl font-extrabold sm:text-2xl">
              Book<span className="ml-0.5 rounded-md bg-white px-1.5 text-red-600">Hunt</span>
            </span>
          </Link>

          {/* Mobile tagline */}
          <p className="text-lg font-bold lg:hidden">Join thousands of readers</p>

          {/* Desktop content */}
          <div className="hidden lg:block">
            <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
              Your next favorite book is one account away.
            </h2>
            <ul className="mt-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm font-medium">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-green-300" />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-10 w-fit rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-md">
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-2 max-w-xs text-sm font-medium">
                &quot;Original books, fast delivery, and super easy checkout.&quot;
              </p>
              <p className="mt-1 text-xs text-white/70">A happy BooksHunt reader</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Form */}
      <section className="relative z-10 -mt-6 flex w-full flex-1 items-center justify-center rounded-t-3xl bg-slate-50 px-5 py-8 sm:px-8 lg:mt-0 lg:w-1/2 lg:rounded-none lg:bg-white lg:py-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Join BooksHunt and start reading today.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />
              Account created! Taking you to the login page...
            </div>
          )}

          <Form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="name"
              validate={(value) =>
                value.trim().length < 3 ? "Name must be at least 3 characters" : null
              }
            >
              <Label>Full name</Label>
              <Input placeholder="Enter your name" autoComplete="name" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "Please enter a valid email address"
                  : null
              }
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" autoComplete="email" />
              <FieldError />
            </TextField>

            {/* Photo URL (optional) with live preview */}
            <TextField
              name="image"
              value={photo}
              onChange={(v) => {
                setPhoto(v);
                setPhotoOk(true);
              }}
              validate={(value) =>
                value && !/^https?:\/\/.+/i.test(value)
                  ? "Enter a valid link starting with http"
                  : null
              }
            >
              <Label>Photo URL (optional)</Label>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-bold text-slate-500">
                  {photo && photoOk ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setPhotoOk(false)}
                    />
                  ) : (
                    <FiUserPlus />
                  )}
                </span>
                <Input
                  placeholder="https://your-photo-link.jpg"
                  className="w-full"
                />
              </div>
              <FieldError />
            </TextField>

            {/* Password with strength meter */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              validate={(value) => {
                if (value.length < 8) return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter";
                if (!/[0-9]/.test(value)) return "Add at least one number";
                return null;
              }}
            >
              <Label>Password</Label>
              <div className="relative">
                <Input
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-lg text-slate-400 transition hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Strength bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-colors duration-300 ${
                        score >= i ? strength.bar : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="w-12 text-xs font-semibold text-slate-500">
                  {strength.text}
                </span>
              </div>

              {/* Live checklist */}
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {rules.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li
                      key={r.label}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        ok ? "text-green-600" : "text-slate-400"
                      }`}
                    >
                      <FiCheck className={ok ? "opacity-100" : "opacity-40"} />
                      {r.label}
                    </li>
                  );
                })}
              </ul>
              <FieldError />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading || googleLoading || success}
              className="mt-2 w-full rounded-xl bg-[#e7000b] py-6 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <FiUserPlus />
                  Create account
                </>
              )}
            </Button>
          </Form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              or
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Button
            onClick={handleGoogleSignIn}
            isDisabled={loading || googleLoading}
            variant="outline"
            className="w-full rounded-xl border border-slate-200 bg-white py-6 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RiGoogleFill className="text-lg text-red-500" />
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-red-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { RiGoogleFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLogIn, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const perks = [
  "Track every order from checkout to delivery",
  "Save your delivery details for faster checkout",
  "Leave reviews and help other readers",
];

export default function LoginPages() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: remember,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Incorrect email or password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
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
    <main className="flex min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      {/* Left: brand panel (desktop only). Already dark, only slightly deeper in dark mode */}
      <aside className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-slate-900 p-12 text-white dark:from-green-700 dark:via-green-900 dark:to-zinc-950 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-red-500/30 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-600">
            <FaBookOpen />
          </span>
          <span className="text-2xl font-extrabold">
            Book<span className="ml-0.5 rounded-md bg-white px-1.5 text-red-600">Hunt</span>
          </span>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
            Welcome back, reader.
          </h2>
          <p className="mt-4 max-w-md text-green-50/90">
            Log in to pick up where you left off and find your next original read.
          </p>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm font-medium">
                <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-green-300" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-green-100/70">
          © {new Date().getFullYear()} BooksHunt
        </p>
      </aside>

      {/* Right: form */}
      <section className="flex w-full items-center justify-center bg-slate-50 px-5 py-10 transition-colors duration-300 dark:bg-zinc-950 sm:px-8 lg:w-1/2 lg:bg-white dark:lg:bg-zinc-950">
        {/* Card: on desktop it blends into the section, so the background is transparent there */}
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-zinc-900 dark:shadow-black/40 sm:p-10 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent">
          {/* Mobile logo */}
          <Link href="/" className="mb-6 flex items-center gap-2 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white">
              <FaBookOpen />
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              Book<span className="text-red-600 dark:text-red-400">Hunt</span>
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Enter your details to continue.
          </p>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
              {error}
            </div>
          )}

          <Form className="mt-6 flex flex-col gap-5" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" autoComplete="email" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
            >
              <Label>Password</Label>
              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-lg text-slate-400 transition hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:text-slate-500 dark:hover:text-slate-200"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <FieldError />
            </TextField>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-green-600 dark:border-slate-600"
              />
              Remember me
            </label>

            <Button
              type="submit"
              isDisabled={loading || googleLoading}
              className="w-full rounded-xl bg-[#e7000b] py-6 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 dark:shadow-red-900/40"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <FiLogIn />
                  Log in
                </>
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              or
            </span>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <Button
            onClick={handleGoogleSignin}
            isDisabled={loading || googleLoading}
            variant="outline"
            className="w-full rounded-xl border border-slate-200 bg-white py-6 text-base font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-zinc-800 dark:text-slate-200 dark:hover:bg-zinc-700"
          >
            <RiGoogleFill className="text-lg text-red-500" />
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Do not have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-red-600 hover:underline dark:text-red-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
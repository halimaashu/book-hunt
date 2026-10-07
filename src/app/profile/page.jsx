"use client";

import { EditFrom } from "@/components/shared/EditFrom";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  FiMail,
  FiShield,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiGrid,
  FiBookOpen,
  FiEdit3,
  FiLogIn,
} from "react-icons/fi";

export default function ProfilePage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  // Loading skeleton
  if (isPending) {
    return (
      <main className="min-h-[70vh] bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-40 rounded-3xl bg-slate-200 sm:h-52" />
          <div className="-mt-14 flex flex-col items-center gap-3">
            <div className="h-28 w-28 rounded-full border-4 border-white bg-slate-300" />
            <div className="h-6 w-48 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-10">
        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl shadow-slate-200/60">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
            <FiLogIn />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            You are not logged in
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to see and edit your profile.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-[#e7000b] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  const isAdmin = user.role === "admin";
  const dashboardHref = isAdmin ? "/dashboard/admin" : "/dashboard";
  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const details = [
    { icon: FiMail, label: "Email", value: user.email },
    {
      icon: FiShield,
      label: "Account type",
      value: isAdmin ? "Admin" : "Reader",
    },
    { icon: FiCalendar, label: "Member since", value: joined },
    {
      icon: user.emailVerified ? FiCheckCircle : FiAlertCircle,
      label: "Email status",
      value: user.emailVerified ? "Verified" : "Not verified",
      tone: user.emailVerified ? "text-green-600" : "text-amber-600",
    },
  ];

  return (
    <main className="bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Profile header card */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
          {/* Cover */}
          <div className="relative h-36 bg-gradient-to-r from-green-600 via-green-700 to-slate-900 sm:h-48">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-red-500/30 blur-3xl" />
          </div>

          <div className="px-5 pb-8 sm:px-10">
            {/* Avatar overlapping the cover */}
            <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16 sm:flex-row sm:items-end sm:gap-6 sm:text-left">
              <Avatar className="h-28 w-28 shrink-0 border-4 border-white text-3xl shadow-lg sm:h-36 sm:w-36">
                <Avatar.Image alt={user.name} src={user.image} />
                <Avatar.Fallback>{user.name?.[0]?.toUpperCase()}</Avatar.Fallback>
              </Avatar>

              <div className="mt-4 min-w-0 flex-1 sm:mb-2">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h1 className="truncate text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    <span className="text-red-600">Hi,</span> {user.name}
                  </h1>
                  {isAdmin && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                      Admin
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_3fr]">
          {/* Left column: details + quick links */}
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold text-slate-900">Account details</h2>
              <ul className="mt-5 space-y-4">
                {details.map(({ icon: Icon, label, value, tone }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-600">
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">{label}</p>
                      <p
                        className={`break-words text-sm font-semibold ${
                          tone || "text-slate-900"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <Link
                href={dashboardHref}
                className="group rounded-3xl bg-green-600 p-5 text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:bg-green-700"
              >
                <FiGrid className="text-2xl" />
                <p className="mt-4 text-sm font-bold">Dashboard</p>
                <p className="text-xs text-green-100">
                  {isAdmin ? "Manage the store" : "Your orders"}
                </p>
              </Link>
              <Link
                href="/allBooks"
                className="group rounded-3xl bg-[#e7000b] p-5 text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700"
              >
                <FiBookOpen className="text-2xl" />
                <p className="mt-4 text-sm font-bold">Browse books</p>
                <p className="text-xs text-red-100">Find your next read</p>
              </Link>
            </section>
          </div>

          {/* Right column: edit form */}
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-lg text-red-600">
                <FiEdit3 />
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Edit profile</h2>
                <p className="text-sm text-slate-500">
                  Update your name and photo.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <EditFrom />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
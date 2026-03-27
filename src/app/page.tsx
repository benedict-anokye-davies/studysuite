'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Target,
  Bell,
  BarChart3,
  ArrowRight,
  Bookmark,
  Search,
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Personalised Feed',
    description:
      'Opportunities matched to your degree, year group, and career interests. No noise, just what matters.',
  },
  {
    icon: Bookmark,
    title: 'Application Tracker',
    description:
      'Track every application from saved to offer. Kanban board, deadlines, and notes in one place.',
  },
  {
    icon: Bell,
    title: 'Deadline Alerts',
    description:
      'Never miss a closing date. Smart alerts for opportunities you care about, when they matter.',
  },
  {
    icon: BarChart3,
    title: 'Smart Discovery',
    description:
      'Explore spring weeks, internships, grad schemes, and more from 500+ employers across every industry.',
  },
];

const universities = [
  'Oxford',
  'Cambridge',
  'Imperial',
  'UCL',
  'LSE',
  'Warwick',
  'Edinburgh',
  'Bristol',
  'Manchester',
  'Nottingham',
  'KCL',
  'Bath',
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <GraduationCap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">StudySuite</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 pt-14">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[500px] w-[800px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute top-1/3 right-1/4">
          <div className="h-[300px] w-[300px] rounded-full bg-violet-500/[0.04] blur-[80px]" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Tag */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-zinc-400">
              Built for UK university students
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            Find your next{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              opportunity
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base text-zinc-500 sm:text-lg"
          >
            Spring weeks, internships, grad schemes, and more. Personalised to
            your degree, year, and career interests.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              Get started free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.04] hover:text-zinc-100"
            >
              <Search className="h-4 w-4" />
              Browse opportunities
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-8 sm:gap-12"
          >
            {[
              { label: 'Opportunities', value: '2,500+' },
              { label: 'Employers', value: '500+' },
              { label: 'Students', value: '10,000+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-zinc-100 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative border-t border-white/[0.04] py-24">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need to land the role
            </h2>
            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              Stop scrolling through spreadsheets and dead links. One platform,
              every opportunity.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 transition-all hover:border-indigo-500/20 hover:bg-white/[0.03]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                  <feature.icon className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-200">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-white/[0.04] py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Trusted by students at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {universities.map((uni) => (
                <span
                  key={uni}
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-400"
                >
                  {uni}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.04] py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your career starts here
            </h2>
            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              Set up in 90 seconds. Find opportunities that actually match you.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-zinc-500">
              StudySuite
            </span>
          </div>
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} StudySuite. Built for students, by
            students.
          </p>
        </div>
      </footer>
    </div>
  );
}

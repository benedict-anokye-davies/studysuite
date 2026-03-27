import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-zinc-100">
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.04] bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              StudySuite
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-14">
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-sm text-zinc-500">
            For UK university students
          </p>

          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Track applications for jobs, internships, and spring weeks
          </h1>

          <p className="mt-4 max-w-md text-base text-zinc-500">
            One place to find, save, and track opportunities across UK
            employers. Deadlines, applications, progress — all organised.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/feed"
              className="group flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
            >
              Open dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/explore"
              className="rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm text-zinc-400 transition-colors hover:border-white/[0.12] hover:text-zinc-300"
            >
              Browse opportunities
            </Link>
          </div>

          {/* Preview */}
          <div className="mt-16 w-full max-w-3xl rounded-xl border border-white/[0.06] bg-[#111118] p-1">
            <div className="rounded-lg bg-[#0E0E14] p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs text-zinc-600">
                  studysuite / feed
                </span>
              </div>
              <div className="space-y-2">
                {[
                  {
                    company: 'Goldman Sachs',
                    role: 'Spring Week 2027',
                    deadline: '5 days',
                    type: 'Spring Week',
                  },
                  {
                    company: 'Google',
                    role: 'STEP Internship 2027',
                    deadline: '3 weeks',
                    type: 'Internship',
                  },
                  {
                    company: 'Jane Street',
                    role: 'SWE Internship 2027',
                    deadline: '12 days',
                    type: 'Internship',
                  },
                ].map((item) => (
                  <div
                    key={item.company}
                    className="flex items-center justify-between rounded-lg border border-white/[0.04] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-md bg-zinc-800" />
                      <div>
                        <p className="text-sm text-zinc-300">
                          <span className="text-zinc-500">
                            {item.company}
                          </span>{' '}
                          {item.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-500">
                        {item.type}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {item.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="border-t border-white/[0.04] py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            What StudySuite does
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: 'Opportunity feed',
                desc: 'Spring weeks, internships, grad schemes, placements. Filtered to what you actually qualify for.',
              },
              {
                title: 'Application tracker',
                desc: 'Kanban board from saved to offer. Know where every application stands.',
              },
              {
                title: 'Deadline alerts',
                desc: 'See what is closing soon. Never miss a deadline because it was buried in a spreadsheet.',
              },
              {
                title: 'Company profiles',
                desc: 'Salary info, application tips, open roles. All in one place per employer.',
              },
            ].map((f) => (
              <div key={f.title}>
                <h3 className="text-sm font-medium text-zinc-200">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.04] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-lg font-medium text-zinc-200">
            Stop losing track of applications.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            StudySuite is free and open source.
          </p>
          <Link
            href="/feed"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
          >
            Open dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <span className="text-xs text-zinc-600">StudySuite</span>
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

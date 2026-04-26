export const metadata = {
  title: "Privacy Policy | A-A-Wrongbot",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-12 text-slate-900">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-slate-600">Last updated: April 22, 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What this app does</h2>
        <p>
          A-A-Wrongbot helps users rewrite and reframe communication drafts. The iOS app is a
          WebView wrapper around the hosted web app.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data we process</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Draft text and prompt context submitted by a user.</li>
          <li>Basic technical metadata used for reliability and abuse prevention.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How data is used</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To generate reframed output requested by the user.</li>
          <li>To monitor system stability, prevent abuse, and improve service quality.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Third-party processing</h2>
        <p>
          Prompt data is sent to Groq to generate responses. Review Groq&apos;s policy for additional
          details about their handling practices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data retention</h2>
        <p>
          We retain only the minimum data needed for operations, rate limiting, security, and
          troubleshooting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          For privacy requests, contact the app owner at your published support channel before
          release.
        </p>
      </section>
    </main>
  );
}

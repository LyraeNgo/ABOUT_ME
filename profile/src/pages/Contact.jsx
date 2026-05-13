const Contact = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-3 max-w-2xl text-zinc-700 dark:text-zinc-300">
        Bạn có thể liên hệ theo style “POST /messages”. Mình sẽ phản hồi sớm nhất có thể.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold">Message payload</div>
          <pre className="mt-4 overflow-auto rounded-xl border border-black/10 bg-white/60 p-4 font-mono text-xs text-zinc-800 dark:border-white/10 dark:bg-black/30 dark:text-zinc-200">{`POST /v1/messages
Content-Type: application/json

{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hi Tam, let's talk!"
}`}</pre>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/5">
          <div className="text-sm font-semibold">Links</div>
          <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">email</span>
              <span className="text-zinc-500 dark:text-zinc-400">you@domain.com</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">github</span>
              <span className="text-zinc-500 dark:text-zinc-400">github.com/your-handle</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-black/20">
              <span className="font-mono">linkedin</span>
              <span className="text-zinc-500 dark:text-zinc-400">
                linkedin.com/in/your-handle
              </span>
            </div>
          </div>
          <div className="mt-4 text-xs text-zinc-500">
            Bạn muốn mình thay bằng link thật của bạn thì gửi mình các URL.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

export default function LoginForm() {
  return (
    <form>
      <div className="mb-12 space-y-2.5">
        <h1 className="heading-h1">Welcome back</h1>
        <p className="regular-text">Please enter your credentials to sign in</p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-lg font-medium mb-2.5" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="flex h-12 w-full rounded-md border border-dark-700 bg-dark-500 px-3 py-2 text-sm ring-offset-yellow-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="andrijadj@gmail.com"
            id="email"
          />
        </div>
        <div>
          <label
            className="block text-lg font-medium mb-2.5"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="flex h-12 w-full rounded-md border border-dark-700 bg-dark-500 px-3 py-2 text-sm ring-offset-yellow-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-700 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your password"
            id="password"
          />
        </div>
      </div>
      <button className="mt-10 bg-yellow-500 w-full h-12 hover:bg-yellow-500/90 inline-flex items-center justify-center whitespace-nowrap rounded-lg font-bold ring-offset-yellow-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Log in
      </button>
    </form>
  );
}

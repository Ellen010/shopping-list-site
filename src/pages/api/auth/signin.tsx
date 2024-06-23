import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username } = e.target.elements;
    signIn('credentials', { name: username.value });
  };

  return (
    <div className="bg-picLogin h-screen flex items-center justify-center bg-cover">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Type Anna or Marc"
              className="mt-1 p-2 block w-full border rounded-md"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

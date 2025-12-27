import { useState } from "react";
import useAuth from "@/utils/useAuth";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        name,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount:
          "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration:
          "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Bricolage+Grotesque:wght@600;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-geist { font-family: 'Geist', sans-serif; }
        .font-bricolage { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .gradient-text {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-bricolage font-extrabold text-3xl lg:text-4xl gradient-text mb-4">
                Create Account
              </h1>
              <p className="text-[#5C6F92] dark:text-white/60 text-lg">
                Start your fitness journey today
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54] dark:text-white/90">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 h-12 border border-[#EEF2FA] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-[#1B2E54] dark:text-white/90 placeholder:text-[#5C6F92] dark:placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54] dark:text-white/90">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 h-12 border border-[#EEF2FA] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-[#1B2E54] dark:text-white/90 placeholder:text-[#5C6F92] dark:placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#1B2E54] dark:text-white/90">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 h-12 border border-[#EEF2FA] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] text-[#1B2E54] dark:text-white/90 placeholder:text-[#5C6F92] dark:placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 gradient-bg text-white rounded-lg font-medium hover:opacity-90 hover:scale-[1.02] active:opacity-80 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#5C6F92] dark:text-white/60">
                Already have an account?{" "}
                <a
                  href={`/account/signin${typeof window !== "undefined" ? window.location.search : ""}`}
                  className="text-[#1A5DFF] dark:text-[#6BA3FF] font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Image/Branding */}
        <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
              <div className="w-10 h-10 bg-white/40 rounded-lg"></div>
            </div>
            <h2 className="font-bricolage font-extrabold text-3xl mb-4">
              Start Your Journey
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Join thousands of users who have transformed their fitness with
              our comprehensive tracking and goal-setting platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

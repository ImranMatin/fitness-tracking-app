import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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

      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-bricolage font-extrabold text-3xl lg:text-4xl gradient-text mb-4">
              Sign Out
            </h1>
            <p className="text-[#5C6F92] dark:text-white/60 text-lg">
              Thanks for using our fitness tracker!
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] border border-[#EEF2FA] dark:border-[#2A2A2A] rounded-[20px] p-6 text-center">
            <p className="text-[#5C6F92] dark:text-white/60 mb-6">
              Are you sure you want to sign out?
            </p>

            <button
              onClick={handleSignOut}
              className="w-full h-12 gradient-bg text-white rounded-lg font-medium hover:opacity-90 hover:scale-[1.02] active:opacity-80 active:scale-[0.98] transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

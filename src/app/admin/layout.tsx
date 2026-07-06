import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {}, // اینجا نیاز نیست
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // اگر لاگین نبود → به لاگین بفرست
  if (!session) {
    redirect('/login');
  }

  // چک کردن ادمین بودن
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('email', session.user?.email)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    redirect('/login?error=not_admin');
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <header className="glass border-b border-white/60 sticky top-0 z-50">
          <div className="container flex items-center justify-between h-20">
            <h1 className="text-3xl font-bold gradient-text">پنل مدیریت</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500">ادمین</div>
            </div>
          </div>
        </header>
        <div className="container py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
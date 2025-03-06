import Dashboard from "@/components/dashboard/dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Params = Promise<{ locale: string }>;

export default async function DashboardPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { locale } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(`/${locale}/login`);
  }

  return <Dashboard />;
}

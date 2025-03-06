"use client";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Hello there! We're excited to have you here. This is your personal
            dashboard where you can manage all your account settings and
            preferences.
          </p>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
            <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Getting Started
            </h2>
            <p className="text-purple-600 dark:text-purple-400">
              To get started, explore the navigation icons on the left. You can
              access your settings or log out when needed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="rounded-lg border p-6 bg-background">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <p className="text-sm text-muted-foreground">
                Update your personal information and manage your account
                settings.
              </p>
            </div>

            <div className="rounded-lg border p-6 bg-background">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                If you have any questions or need assistance, our support team
                is here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

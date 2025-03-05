"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Github, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpAction } from "@/src/app/actions";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" };

    if (password.length < 6) {
      return { strength: 1, text: "Weak" };
    } else if (password.length < 10) {
      return { strength: 2, text: "Medium" };
    } else {
      return { strength: 3, text: "Strong" };
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <section className="w-full flex-1 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-purple-500 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground mt-2">
              Enter your information to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6 mb-6"
            >
              <Github className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs">Password strength:</div>
                    <div
                      className="text-xs font-medium"
                      style={{
                        color:
                          passwordStrength.strength === 1
                            ? "var(--destructive)"
                            : passwordStrength.strength === 2
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    >
                      {passwordStrength.text}
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(passwordStrength.strength / 3) * 100}%`,
                        backgroundColor:
                          passwordStrength.strength === 1
                            ? "var(--destructive)"
                            : passwordStrength.strength === 2
                              ? "#f59e0b"
                              : "#10b981",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-tight">
                I agree to the{" "}
                <Link href="#" className="text-purple-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-purple-500 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 mt-6"
              disabled={isLoading || !agreeTerms}
              formAction={signUpAction}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-purple-500 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-purple-50 dark:bg-purple-950/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-300/10 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center p-12"
        >
          <div className="relative w-full max-w-lg">
            <Image
              src="https://picsum.photos/2000/3000"
              alt="Signup illustration"
              fill
              className="rounded-2xl shadow-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-6 -right-6 rounded-lg bg-background p-4 shadow-lg border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free 14-day trial</p>
                  <p className="text-xs text-muted-foreground">
                    No credit card required
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

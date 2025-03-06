"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/src/app/actions";
import NavigationLink from "./ui/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="w-full flex-1 flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <NavigationLink
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-purple-500 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </NavigationLink>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <NavigationLink
                  href="/forgot-password"
                  className="text-xs text-purple-500 hover:underline"
                >
                  Forgot password?
                </NavigationLink>
              </div>
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
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6"
              disabled={isLoading}
              formAction={signInAction}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <NavigationLink
                href="/signup"
                className="text-purple-500 hover:underline"
              >
                Sign up
              </NavigationLink>
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
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src="https://picsum.photos/2000/3000"
              alt="Login illustration"
              fill
              className="rounded-2xl shadow-2xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 rounded-lg bg-background p-4 shadow-lg border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <div className="size-5 rounded-full bg-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure login</p>
                  <p className="text-xs text-muted-foreground">
                    End-to-end encryption
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

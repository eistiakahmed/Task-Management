"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ListTodo, Zap, Shield, ArrowRight, Sparkles, Target, Clock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-md"
              />
              <CheckCircle2 className="w-8 h-8 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Task Manager
            </span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost">Sign in</Button>
              </motion.div>
            </Link>
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="shadow-lg shadow-primary/25">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="relative container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-6"
          >
            <motion.div variants={item} className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Boost Your Productivity</span>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-6xl md:text-7xl font-bold tracking-tight"
            >
              Manage Your Tasks
              <motion.span 
                className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Effortlessly
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={item}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              A modern, intuitive task management system that helps you stay organized
              and productive. Track, manage, and complete your tasks with ease.
            </motion.p>

            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="text-base px-8 h-12 shadow-xl shadow-primary/25 group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="text-base px-8 h-12 border-2">
                    View Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Task Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative max-w-3xl mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-8 w-64 h-32 bg-card border border-border/50 rounded-xl shadow-2xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded border-2 border-primary" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-foreground/20 rounded w-3/4" />
                    <div className="h-2 bg-foreground/10 rounded w-full" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 top-20 w-64 h-32 bg-card border border-border/50 rounded-xl shadow-2xl p-4 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded border-2 border-green-500 bg-green-500/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-foreground/20 rounded w-2/3" />
                    <div className="h-2 bg-foreground/10 rounded w-5/6" />
                  </div>
                </div>
              </motion.div>

              <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-foreground/20 rounded w-32" />
                    <div className="h-4 bg-foreground/10 rounded w-20" />
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg"
                      >
                        <div className="w-4 h-4 rounded border-2 border-primary/50" />
                        <div className="flex-1 h-3 bg-foreground/20 rounded" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-32"
        >
          {[
            {
              icon: ListTodo,
              title: "Easy Task Management",
              description: "Create, edit, and organize your tasks with an intuitive interface designed for productivity",
              color: "text-blue-500"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Built with modern technology for optimal performance and instant response times",
              color: "text-yellow-500"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and secure with industry-standard protection measures",
              color: "text-green-500"
            },
            {
              icon: Target,
              title: "Goal Tracking",
              description: "Set due dates and track your progress towards completing important tasks",
              color: "text-purple-500"
            },
            {
              icon: Clock,
              title: "Time Management",
              description: "Organize tasks by priority and never miss a deadline with smart reminders",
              color: "text-orange-500"
            },
            {
              icon: Sparkles,
              title: "Beautiful Design",
              description: "Enjoy a clean, modern interface with dark mode support and smooth animations",
              color: "text-pink-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative text-center p-8 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all h-full backdrop-blur-sm">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6 ${feature.color}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-32 text-center"
        >
          <div className="relative max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
            />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their tasks more efficiently
              </p>
              <Link href="/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="text-lg px-10 h-14 shadow-2xl shadow-primary/30">
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative border-t border-border/50 mt-32 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Task Manager. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

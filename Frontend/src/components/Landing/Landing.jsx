// src/components/Landing/Landing.js
import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  BellAlertIcon,
  ChartBarIcon,
  LockClosedIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Landing = () => {
  const features = [
    {
      icon: <ClipboardDocumentCheckIcon className="h-8 w-8" />,
      title: "Task Management",
      description:
        "Create, assign, and track tasks with ease. Organize your workflow efficiently.",
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Team Collaboration",
      description:
        "Assign tasks to team members and collaborate seamlessly in real-time.",
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Progress Tracking",
      description:
        "Monitor task status from pending to completion with visual indicators.",
    },
    {
      icon: <BellAlertIcon className="h-8 w-8" />,
      title: "Smart Notifications",
      description:
        "Stay updated with instant notifications on task assignments and updates.",
    },
    {
      icon: <LockClosedIcon className="h-8 w-8" />,
      title: "Secure & Private",
      description:
        "Your data is protected with industry-standard security measures.",
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Intuitive Interface",
      description:
        "Clean and modern design that makes task management a breeze.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account in seconds",
    },
    {
      number: "2",
      title: "Create Tasks",
      description: "Add tasks with titles and descriptions",
    },
    {
      number: "3",
      title: "Assign Team",
      description: "Search and assign tasks to team members",
    },
    {
      number: "4",
      title: "Track Progress",
      description: "Monitor task status in real-time",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">
                TaskForge
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Forge Your Path to
              <span className="text-primary-600"> Productivity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              TaskForge is the modern task management solution that helps teams
              collaborate, track progress, and achieve goals together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center group"
              >
                Start Free Today
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium hover:border-primary-600 hover:text-primary-600 transition-colors"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    My Tasks
                  </h3>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Design new landing page
                    </span>
                    <span className="ml-auto text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Review pull requests</span>
                    <span className="ml-auto text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      In Progress
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Deploy to production</span>
                    <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TaskForge provides all the tools you need to manage tasks
              efficiently and collaborate with your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How TaskForge Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and transform how your team manages tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who are already using TaskForge to boost
            their productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
            >
              Login to Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Built with passion and{" "}
              <span className="text-primary-400">React</span>
            </p>
            <p className="text-white font-medium mt-2">
              © {new Date().getFullYear()} TaskForge by Pushan Sinha
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Empowering teams to achieve more, one task at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

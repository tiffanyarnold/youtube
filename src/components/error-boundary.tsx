"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h2 className="text-xl font-medium text-[#0F0F0F] mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-[#606060] mb-6 max-w-md">
            An unexpected error occurred. Please try again or go back to the
            home page.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 bg-[#0F0F0F] text-white text-sm font-medium rounded-full hover:bg-[#272727] transition-colors active:scale-[0.98]"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-6 py-2.5 bg-[#F2F2F2] text-[#0F0F0F] text-sm font-medium rounded-full hover:bg-[#E5E5E5] transition-colors active:scale-[0.98]"
            >
              Go home
            </a>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-8 w-full max-w-lg text-left">
              <summary className="text-xs text-[#606060] cursor-pointer hover:text-[#0F0F0F]">
                Error details
              </summary>
              <pre className="mt-2 p-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg text-xs text-[#606060] overflow-auto max-h-40">
                {this.state.error.message}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

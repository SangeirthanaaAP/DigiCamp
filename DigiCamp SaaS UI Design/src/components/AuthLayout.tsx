import { ReactNode } from 'react';
import { Logo } from './Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen gradient-purple-pink-blue flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <Logo size="lg" className="justify-center lg:justify-start" />
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Plan, Execute, and Optimize your Campaigns with AI
            </h1>
            <p className="text-lg text-white/80 max-w-lg mx-auto lg:mx-0">
              The most powerful digital marketing campaign manager designed for modern teams.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              AI-Powered Content
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              Multi-Platform
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              Advanced Analytics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              Team Collaboration
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="glass rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
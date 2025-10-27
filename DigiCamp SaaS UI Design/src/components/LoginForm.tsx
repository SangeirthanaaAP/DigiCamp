import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginFormProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-white/70">Sign in to your DigiCamp account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded border-white/20" />
            <label htmlFor="remember" className="text-white/70">Remember me</label>
          </div>
          <button type="button" className="text-[#FF6A00] hover:text-[#ff8533] transition-colors">
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FF6A00] hover:bg-[#ff8533] text-white font-medium py-3 rounded-lg transition-colors"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm text-white/70">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-[#FF6A00] hover:text-[#ff8533] transition-colors font-medium"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
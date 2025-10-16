import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SignupFormProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Create your account</h2>
        <p className="text-white/70">Start your digital marketing journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

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
          <Label htmlFor="username" className="text-white">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#FF6A00] focus:ring-[#FF6A00] rounded-lg"
            required
          />
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <input type="checkbox" id="terms" className="rounded border-white/20" required />
          <label htmlFor="terms" className="text-white/70">
            I agree to the <span className="text-[#FF6A00]">Terms of Service</span> and <span className="text-[#FF6A00]">Privacy Policy</span>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FF6A00] hover:bg-[#ff8533] text-white font-medium py-3 rounded-lg transition-colors"
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-white/70">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[#FF6A00] hover:text-[#ff8533] transition-colors font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
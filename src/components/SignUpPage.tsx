import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUser } from '../context/UserContext';

export function SignUpPage({ onBack, onSuccess }: { onBack: () => void; onSuccess?: () => void }) {
  const { setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = {
      id: `local-${Date.now()}`,
      name: name || (email.split('@')[0] || 'User'),
      location: '',
      bio: '',
      avatarUrl: null,
      memberSince: new Date().toLocaleDateString(),
      rating: 0,
      verified: false,
      totalTools: 0,
      totalRentals: 0,
    };
    setUser(u as any);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl mb-4">Create account</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit">Create account</Button>
            <Button variant="ghost" onClick={onBack}>Back</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

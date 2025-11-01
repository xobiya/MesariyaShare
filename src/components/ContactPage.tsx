import React from 'react';

interface ContactPageProps {
  onBack?: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-semibold mb-4">Contact</h1>
      <p className="text-gray-700 max-w-2xl mb-4">
        For inquiries about this demo, reach out at <a href="mailto:hello@mesariyashare.example" className="text-blue-600 hover:underline">hello@mesariyashare.example</a>.
      </p>
    </div>
  );
}

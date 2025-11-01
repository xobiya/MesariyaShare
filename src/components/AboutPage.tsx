import React from 'react';

interface AboutPageProps {
  onBack?: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-semibold mb-4">About mesariyashare</h1>
      <p className="text-gray-700 max-w-2xl">
        mesariyashare is a community marketplace for borrowing and lending tools. This demo showcases
        a design system and UI patterns for listing, searching, and requesting rentals.
      </p>
    </div>
  );
}

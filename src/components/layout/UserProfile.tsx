import React from 'react';

interface UserProfileProps {
  initials: string;
  name: string;
  email: string;
}

export default function UserProfile({ initials, name, email }: UserProfileProps) {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div>
          <div className="font-medium text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
    </div>
  );
}
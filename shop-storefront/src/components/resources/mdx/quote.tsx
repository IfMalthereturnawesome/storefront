'use client';
import {useEffect, useState} from 'react';

export default function Quote({children}: {children: React.ReactNode}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="relative mb-4 mt-4 border-l-4 border-blue-500 pl-6">
      <p className="text-lg font-semibold italic text-gray-600 dark:text-gray-400">
        <span className="text-3xl italic text-gray-600 dark:text-gray-200">
          &quot;
        </span>
        <span>{children}</span>
        <span className="text-3xl italic text-gray-600 dark:text-gray-200 ">
          &quot;
        </span>
      </p>
    </div>
  );
}

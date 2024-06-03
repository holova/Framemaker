'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const newTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <Button
      size="lg"
      isIconOnly
      variant="light"
      aria-label={`Switch to ${newTheme} theme`}
      className="rounded-full"
      onPress={() => setTheme(newTheme)}
      title="Light"
    >
      {newTheme === 'dark' && (
        <MoonIcon className="size-6" />
      )}
      {newTheme === 'light' && (
        <SunIcon className="size-6" />
      )}
    </Button>
  );
}

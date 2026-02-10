import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    colors: {
      background: '#f8f9fa',
      surface: '#ffffff',
      primary: '#4f46e5',
      primaryHover: '#4338ca',
      secondary: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      shadow: 'rgba(0, 0, 0, 0.1)',
      cardBg: '#ffffff',
      inputBg: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      background: '#111827',
      surface: '#1f2937',
      primary: '#6366f1',
      primaryHover: '#818cf8',
      secondary: '#10b981',
      danger: '#f87171',
      warning: '#fbbf24',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      shadow: 'rgba(0, 0, 0, 0.3)',
      cardBg: '#1f2937',
      inputBg: '#374151',
      overlay: 'rgba(0, 0, 0, 0.7)'
    }
  }
};

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light');
  const [colors, setColors] = useState(themes.light.colors);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeName(savedTheme);
    setColors(themes[savedTheme].colors);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    setColors(themes[newTheme].colors);
    localStorage.setItem('theme', newTheme);
  };

  const value = {
    themeName,
    colors,
    toggleTheme,
    isDark: themeName === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

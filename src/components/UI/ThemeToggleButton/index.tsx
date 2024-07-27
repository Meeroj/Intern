import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { DarkMode, LightMode } from '@mui/icons-material';

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!theme) setTheme('light');
  }, [theme, setTheme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded border border-amber-500"
    >
       {theme === 'light' ? <DarkMode/> : <LightMode/>} 
    </button>
  );
};

export default ThemeToggleButton;

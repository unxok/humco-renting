"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type ThemeSwitcherProps = {
  theme: "dark" | "light";
};

export const ThemeSwitcher = ({ theme }: ThemeSwitcherProps) => {
  const [_theme, setTheme] = useState(theme);
  const { toast } = useToast();

  const toogleTheme = () => {
    const root = document.getElementsByTagName("body")[0];
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = `theme=${"dark"}`;
    } else {
      setTheme("light");
      document.cookie = `theme=${"light"}`;
    }
  };

  return (
    <button
      onClick={() => {
        toogleTheme();
        toast({
          title: "Theme Switched",
          description: "You succesfully switched the theme!",
        });
      }}
    >
      {_theme == "dark" ? (
        <SunIcon className="h-10 w-10 text-yellow-500" />
      ) : (
        <MoonIcon className="h-10 w-10" />
      )}
    </button>
  );
};

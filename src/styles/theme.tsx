import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider } from "styled-components";
const light = {
  background: "#FAFAFA",
  card: "#F3F2F2",
  input: "#EDEDED",
  button: "#E6E5E5",
  hover: "#D7D5D5",
  title: "#272221",
  text: "#574F4D",
  muted: "#706967",
  border: "#E6E5E5",
  purple: "#8047F8",
  purpleDark: "#4B2995",
  purpleLight: "#EBE5F9",
  yellow: "#DBAC2C",
  yellowDark: "#94600F",
  yellowLight: "#F1E9C9",
  error: "#B3261E",
  white: "#FFFFFF",
};
const dark: typeof light = {
  ...light,
  background: "#191715",
  card: "#252220",
  input: "#302C29",
  button: "#3C3632",
  hover: "#4E4641",
  title: "#F7F2EF",
  text: "#E2D9D3",
  muted: "#BFB3AA",
  border: "#4B423C",
  purple: "#B28BFF",
  purpleDark: "#D1B8FF",
  purpleLight: "#36264F",
  yellow: "#DBAC2C",
  yellowDark: "#E8BC53",
  yellowLight: "#44371F",
  error: "#FFAAA1",
};
export type AppTheme = typeof light;
declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
const ThemeContext = createContext<{
  mode: "light" | "dark";
  toggle: () => void;
} | null>(null);
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("coffee-delivery:theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* Use system preference when storage is unavailable. */
    }
    return matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem("coffee-delivery:theme", mode);
    } catch {
      /* The current session still supports toggling. */
    }
  }, [mode]);
  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () =>
          setMode((previous) => (previous === "light" ? "dark" : "light")),
      }}
    >
      <ThemeProvider theme={mode === "light" ? light : dark}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
export function useAppTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider ausente");
  return value;
}

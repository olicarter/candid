import { Inter, Rokkitt, Rowdies } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const rokkitt = Rokkitt({ subsets: ["latin"] });
export const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-rowdies",
});

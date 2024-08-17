import Image from "next/image";
import { LandingPage } from "@/components/component/landing-page";
import GenerateFlashcard from "@/components/component/generate-flashcard";
import { ClerkProvider } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
        <GenerateFlashcard />
    </ClerkProvider>
  );
}

import Image from "next/image";
import { LandingPage } from "@/components/component/landing-page";
import { ClerkProvider } from "@clerk/nextjs";


export default function Home() {
    return (
        <ClerkProvider>
            <LandingPage />
        </ClerkProvider>
    );
}

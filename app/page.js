import Image from "next/image";
import { LandingPage } from "@/components/component/landing-page";
import GenerateFlashcard from "@/components/component/generate-flashcard";
import { ClerkProvider } from "@clerk/nextjs";


if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== 'undefined') {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
            let resolve, reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return { promise, resolve, reject }
        }
    } else {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        global.Promise.withResolvers = function () {
            let resolve, reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return { promise, resolve, reject }
        }
    }
}



export default function Home() {
    return (
        <ClerkProvider>
            <GenerateFlashcard />
        </ClerkProvider>
    );
}

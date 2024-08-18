import { MyDecks } from "@/components/component/my-deck";
import { ClerkProvider } from "@clerk/nextjs";


export default function MyDecksPage() {
    return (
        <ClerkProvider>
            <MyDecks />
        </ClerkProvider>
    )
}

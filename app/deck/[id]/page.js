import { IndividualDeck } from "@/components/component/individual-deck";
import { ClerkProvider } from "@clerk/nextjs";

export default function DeckPage({ params }) {
    const { id } = params;

    return (
        <ClerkProvider>
            <IndividualDeck deckId={id} />
        </ClerkProvider>
    )
}

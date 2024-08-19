"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore"
import { useUser, UserButton } from "@clerk/nextjs";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Avatar } from "../ui/avatar";

export function IndividualDeck(props) {
    const [deck, setDeck] = useState(null);
    const deckId = props.deckId;
    const { user } = useUser();

    const [flippedCards, setFlippedCards] = useState({});

    const handleCardClick = (index) => {
        setFlippedCards(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    useEffect(() => {
        const fetchDeck = async () => {
            if (!deckId) return;
            try {
                const docRef = doc(db, 'users', user.id, 'decks', deckId); // Replace 'user_id_placeholder' with actual user ID
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDeck(docSnap.data());
                } else {
                    console.error('No such document!');
                }
            } catch (err) {
                console.error('Error fetching deck: ', err);
            }
        };

        if (user) {

            fetchDeck();
        }

    }, [user, deckId])

    return (
        <div className="flex flex-col h-full min-h-screen">
            <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Link href="/my-decks">
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{deck && deck.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Avatar>
                        <UserButton />
                    </Avatar>
                    <div className="text-sm">
                        <div className="font-medium">{user && user.fullName}</div>
                        <div className="text-white">{user && user.emailAddresses[0].emailAddress}</div>
                    </div>
                </div>
            </header>
            <div
                className="flex-1 bg-muted/40 p-6 md:p-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto">
                {deck && deck.flashcards.map((flashcard, index) => (
                    <Card
                        key={index}
                        className={`flip-card w-64 h-64 ${flippedCards[index] ? 'flipped' : ''}`} // Fixed size for the cards
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front flex items-center justify-center">
                                {/* Front of the card (question) */}
                                <div>{flashcard.question}</div>
                            </div>
                            <div className="flip-card-back flex items-center justify-center">
                                {/* Back of the card (answer) */}
                                <div>{flashcard.answer}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )

}

function ArrowLeftIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>)
    );
}


function FilePenIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>)
    );
}

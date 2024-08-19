"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { db } from "@/app/firebase";
import { doc, getDoc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { useUser, UserButton } from "@clerk/nextjs";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Avatar } from "../ui/avatar";
import { PlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export function IndividualDeck(props) {
    const [deck, setDeck] = useState(null);
    const deckId = props.deckId;
    const { user } = useUser();
    const { toast } = useToast();

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
                    toast({
                        description: "No flashcards in this deck."
                    })
                }
            } catch (err) {
                toast({
                    description: "An unknown error occured",
                    variant: "destructive"
                })
            }
        };

        if (user) {

            fetchDeck();
        }

    }, [user, deckId])

    const newFlashcard = async ({ question, answer }) => {
        try {
            // Reference to the specific deck in Firestore
            const deckRef = doc(db, 'users', user.id, 'decks', deckId);

            // Add the new flashcard to the deck's flashcards array
            const newFlashcard = { question, answer };
            await updateDoc(deckRef, {
                flashcards: arrayUnion(newFlashcard),
                num_of_flashcards: deck.flashcards.length + 1
            });

            // Update the deck state to include the new flashcard
            setDeck(prevDeck => ({
                ...prevDeck,
                flashcards: [...prevDeck.flashcards, newFlashcard]
            }));

            toast({
                description: "Flashcard created successfully."
            })
        } catch (err) {
            console.error('Error adding flashcard: ', err);
            toast({
                description: "An unknown error occured",
                variant: "destructive"
            })
        }
    };

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

                <Dialog>
                    <DialogTrigger className="w-64 h-64">

                        <Card className="flex flex-col justify-center items-center w-64 h-64">
                            <PlusIcon className="w-24 h-24 text-muted-foreground" />
                            <div className="text-muted-foreground">Create New Flashcard</div>
                        </Card>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New flashcard</DialogTitle>
                            <DialogDescription>
                                Make a new flashcard and save it to your deck. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const newFlashcardData = {
                                    question: formData.get("question"),
                                    answer: formData.get("answer"),
                                };
                                newFlashcard(newFlashcardData);
                            }}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col">
                                    <Label htmlFor="question" className="text-left pb-2">
                                        Question
                                    </Label>
                                    <Textarea
                                        id="question"
                                        name="question"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label htmlFor="answer" className="text-left pb-2">
                                        Answer
                                    </Label>
                                    <Textarea
                                        id="answer"
                                        name="answer"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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

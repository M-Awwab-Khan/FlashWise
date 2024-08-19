"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "@/app/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

export function MyDecks() {

    const [decks, setDecks] = useState([]);
    const { user } = useUser();
    const router = useRouter()


    useEffect(() => {
        const fetchDecks = async () => {
            try {
                // Reference to the 'decks' collection for the specific user
                const decksCollectionRef = collection(db, 'users', user.id, 'decks');

                // Fetch the decks
                const q = query(decksCollectionRef);
                const querySnapshot = await getDocs(q);

                // Extract deck data
                const decksData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setDecks(decksData);
            } catch (err) {
                console.error('Error fetching decks: ', err);

            }
        };
        if (user) {
            fetchDecks();
        }
    }, [user]);


    const [sortedDecks, setSortedDecks] = useState(decks);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const sortDecks = () => {
            let sorted = [...decks];
            if (sortOption === 'newest') {
                sorted.sort((a, b) => b.created_at.seconds - a.created_at.seconds);
            } else if (sortOption === 'oldest') {
                sorted.sort((a, b) => a.created_at.seconds - b.created_at.seconds);
            } else if (sortOption === 'title') {
                sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'flashcards') {
                sorted.sort((a, b) => b.num_of_flashcards - a.num_of_flashcards);
            }
            setSortedDecks(sorted);
        };

        sortDecks();
    }, [sortOption, decks]);

    const showFlashcardsPage = (id) => {
        router.push(`/deck/${id}`)
    }


    return (
        (
            <div className="w-full min-h-screen bg-background text-foreground">
                <header className="bg-card py-4 px-6 shadow">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Link href='/generate'>
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    <span className="sr-only">Back</span>
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-bold">My Decks</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <UserButton />
                            </Avatar>
                            <div className="text-sm">
                                <div className="font-medium">{user && user.fullName}</div>
                                <div className="text-muted-foreground">{user && user.emailAddresses[0].emailAddress}</div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="container mx-auto py-8 px-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative w-full max-w-md">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search decks..."
                                    className="pl-10 pr-4 py-2 rounded-md bg-card border-input focus:border-primary focus:ring-primary"
                                />
                            </div>
                            <Select onValueChange={(value) => setSortOption(value)}>
                                <SelectTrigger className="px-4 py-2 rounded-md bg-card border-input focus:border-primary focus:ring-primary">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="flashcards">Flashcards</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>Create New Deck</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-48">
                        {sortedDecks.map(deck => (
                            <Card key={deck.id} className="flex flex-col h-auto max-w-md">
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-lg font-medium">{deck.name}</div>
                                        <div className="flex-row flex text-sm text-muted-foreground">
                                            <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                            {new Date(deck.created_at.seconds * 1000).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex-row flex text-sm text-muted-foreground mb-4">
                                        <ClipboardListIcon className="w-4 h-4 mr-1" />
                                        {deck.num_of_flashcards} flashcards
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <Button variant="ghost" size="sm" onClick={() => { showFlashcardsPage(deck.id) }}>
                                            <EyeIcon className="w-4 h-4 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <PencilIcon className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <TrashIcon className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </main>
            </div>
        )
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


function CalendarDaysIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    )
}


function ClipboardListIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
        </svg>
    )
}


function EyeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function PencilIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}

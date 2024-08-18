"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import {useState, useEffect} from "react"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "@/app/firebase"


export function MyDecks() {

    const [decks, setDecks] = useState([]);
    const {isSignedIn, user} = useUser();

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

        fetchDecks();
      }, [user]);


  return (
    (<div className="flex flex-col h-full">
      <header
        className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Decks</h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-lg font-medium">John Doe</span>
        </div>
      </header>
      <div className="flex-1 p-20 grid gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Search decks..." className="w-full" />
          </div>
          <Select defaultValue="created-at-desc">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created-at-desc">Created at (newest)</SelectItem>
              <SelectItem value="created-at-asc">Created at (oldest)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="cards-desc">Cards (most)</SelectItem>
              <SelectItem value="cards-asc">Cards (least)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


        {decks.map(deck => (
          <Card key={deck.id} className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{deck.name}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <FilePenIcon className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="outline" size="icon">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-muted-foreground text-sm">
              <div>{deck.num_of_flashcards} flashcards</div>
              <div>Created on {new Date(deck.created_at.seconds * 1000).toLocaleDateString()}</div>
            </div>
            <Button variant="outline">View Deck</Button>
          </Card>
        ))}
        </div>
      </div>
    </div>)
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


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}

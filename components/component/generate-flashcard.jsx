"use client";
import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import {
  useUser,
  SignInButton,
  UserButton,
  SignUpButton,
  SignedOut,
  SignedIn
} from "@clerk/nextjs";
import markdownit from "markdown-it";
import { pdfjs } from "react-pdf";
import { useForm } from "react-hook-form";
import { FileCard } from "./file-card";
import { FileInput } from "./file-input";
import { experimental_useObject as useObject } from "ai/react";
import { Flashcard } from "./flashcard";
import { flashcardSchema } from "@/app/api/generate-flashcards/schema";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { db } from "@/app/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import {v4 as uuidv4} from "uuid"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Download, Sparkles } from "lucide-react";

export default function GenerateFlashcard() {
    const { toast } = useToast();
    const { isSignedIn, isLoaded, user } = useUser();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [numFlashcards, setNumFlashcards] = useState(5); // Default value of 5
  const form = useForm();
  const [flashcards, setFlashcards] = useState([]);
  const [deckname, setDeckname] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { object, submit } = useObject({
    api: "/api/generate-flashcards",
    schema: flashcardSchema,
    onFinish: (result) => {
      setFlashcards(result.object.flashcards);
      setDeckname(result.object.deck_name);
      setIsSaved(false);
    },
  });

  const handleFileRemove = async (event) => {
    setFile(null); // Clear the file
  };

  const handleFileChange = async (file) => {
    setFile(file);
    setInputText("");
  };

  const handleGenerate = async () => {
    if (!isSignedIn) {
        toast({
            description: "Please log in to generate flashcards.",
            variant: "destructive",
          });
          return
    }
    if (file) {
      const fileType = file.name.split(".").pop().toLowerCase();

      try {
        let content = "";

        if (fileType === "txt" || fileType === "md") {
          // Handle txt and md files
          const text = await file.text();
          if (fileType === "md") {
            const md = new markdownit();
            content = md.render(text);
          } else {
            content = text;
          }
        } else if (fileType === "pdf") {
          // Handle pdf files
          const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file))
            .promise;
          let textContent = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const text = await page.getTextContent();
            textContent += text.items.map((item) => item.str).join(" ");
          }
          content = textContent;
        }

        setFileContent(content);
        const contentWithFlashcards = `${numFlashcards} ${content}`;
        submit(contentWithFlashcards);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    } else if (inputText) {
      const contentWithFlashcards = `${numFlashcards} ${inputText}`;
      submit(contentWithFlashcards);
    }
  };

  const updateFlashcard = (index, updatedFlashcard) => {
    setFlashcards((prevState) => {
      const newFlashcards = [...prevState];
      newFlashcards[index] = updatedFlashcard;
      return newFlashcards;
    });
  };

  const deleteFlashcard = (index, event) => {
    if (event) {
      event.stopPropagation();
    }

    let deletedFlashcard;
    setFlashcards((prevState) => {
      const newFlashcards = [...prevState];
      if (index >= 0 && index < newFlashcards.length) {
        deletedFlashcard = newFlashcards.splice(index, 1)[0];
      }
      return newFlashcards;
    });

    if (deletedFlashcard) {
      toast({
        description: "Flashcard deleted",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Undo"
            onClick={() => undoDelete(deletedFlashcard, index)}
          >
            Undo
          </ToastAction>
        ),
      });
    } else {
      toast({
        description: "Failed to delete flashcard",
        variant: "destructive",
      });
    }
  };

  const undoDelete = (flashcard, index) => {
    setFlashcards((prevState) => {
      const newFlashcards = [...prevState];
      newFlashcards.splice(index, 0, flashcard);
      return newFlashcards;
    });
  };

  const saveFlashcards = async () => {
    if (!isSignedIn) {
        toast({
            description: "Please log in to generate flashcards.",
            variant: "destructive",
          });
          return
    }
    if (isSaved) {
        toast({
            description: "Flashcards already saved."
        })
        return;
    }
    const userId = user.id;
    const deckId = uuidv4()
    try {
        // Create a reference to the user's document
        const deckDocRef = doc(collection(db, "users", userId, "decks"), deckId);

        // Save the flashcards under the user's deck
        await setDoc(deckDocRef, {
            deck_name: deckname, // Make sure `deckname` is defined in your component
            flashcards: flashcards // The array of flashcard objects
        });

        toast({
            description: "Your flashcards have been saved successfully.",
        })
        setIsSaved(true);
      } catch (error) {
        toast({
            description: "Unknown error occured",
            variant: "destructive"
        })
      }
  }

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center" prefetch={false}>
          <CloudLightningIcon className="h-6 w-6" />
          <span className="font-bold text-lg ml-2">Flashwise</span>
        </Link>

        <div className="flex w-full justify-center">
          <NavigationMenu className="lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  Features
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  How It Works
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  Pricing
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  My Decks
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center space-x-4">
         <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default" className="w-full min-[400px]:w-auto">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" className="w-full min-[400px]:w-auto">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main className="container mx-auto my-12 px-4 md:px-6">
        <div className="space-y-6 text-center">
          <h1 className="mt-20 mb-20 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Turn Lecture Slides into Flashcards
          </h1>
          <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
            <div className="w-full">
              {file ? (
                <FileCard file={file} handleFileRemove={handleFileRemove} />
              ) : (
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your lecture notes here..."
                  className="h-32 resize-none w-full"
                />
              )}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleGenerate)}
                className="grid w-full items-start gap-6"
              >
                <div>
                  {file || inputText ? (
                    <div className="mt-5 flex flex-row justify-between">
                      <Select
                        id="number-of-cards"
                        defaultValue="5"
                        onValueChange={(value) =>
                          setNumFlashcards(Number(value))
                        }
                      >
                        <SelectTrigger className="w-[230px]">
                          <SelectValue placeholder="Select number of cards" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Number of Cards</SelectLabel>
                            {[5, 10, 15, 20, 25, 30].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button
                        type="submit"
                        disabled={inputText.trim() === "" && !file}
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Generate
                        Flashcards
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="document"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileInput handleFileChange={handleFileChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="mx-auto max-w-lg mt-20 grid grid-cols-1 gap-4 w-full">
            {deckname}
          {flashcards.map((flashcard, index) => (
            <Flashcard
              key={index}
              flashcard={flashcard}
              index={index}
              updateFlashcard={updateFlashcard}
              deleteFlashcard={deleteFlashcard}
            />
          ))}
          {flashcards.length > 0 && !isSaved &&
          <Button type="submit" onClick={saveFlashcards}>
            <Download className="mr-2 h-4 w-4" /> Save All
          </Button>
          }
        </div>
      </main>
    </>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function CloudLightningIcon(props) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

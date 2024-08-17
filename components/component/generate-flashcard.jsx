"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent } from "../ui/card"
import { Select } from "../ui/select"
import { useUser, SignInButton, UserButton, ClerkProvider } from "@clerk/nextjs";
import markdownit from "markdown-it"
import { pdfjs } from 'react-pdf';
import { useForm } from "react-hook-form"
import { FileCard } from "./file-card"
import { FileInput } from "./file-input"
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// import { Flashcard } from "./flashcard"
// import { FlashcardDialog } from "./flashcard-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Sparkles } from "lucide-react"

export default function GenerateFlashcard() {
    const { isSignedIn } = useUser();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [fileContent, setFileContent] = useState('');

    const form = useForm();

    const handleFileRemove = async (event) => {
        setFile(null);  // Clear the file
    };


    const handleFileChange = async (file) => {
        setFile(file);
    };

      const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
      };

      const handleDragLeave = () => {
        setDragActive(false);
      };

      const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
          setFile(droppedFile);
        }
      };

      const handleGenerate = async () => {
        if (file){
            const fileType = file.name.split('.').pop().toLowerCase();

            try {
                let content = '';

                if (fileType === 'txt' || fileType === 'md') {
                  // Handle txt and md files
                  const text = await file.text();
                  if (fileType === 'md') {
                    const md = new markdownit();
                    content = md.render(text);
                  } else {
                    content = text;
                  }
                } else if (fileType === 'pdf') {
                  // Handle pdf files
                  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
                  let textContent = '';
                  for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const text = await page.getTextContent();
                    textContent += text.items.map((item) => item.str).join(' ');
                  }
                  content = textContent;
                }

                setFileContent(content);
                console.log(content); // Print content to the console to verify

              } catch (error) {
                console.error('Error reading file:', error);
              }
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
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline">Log In</Button>
                </SignInButton>
                <Button variant="default">Sign Up</Button>
              </>
            )}
          </div>
        </header>

        <main className="container mx-auto my-12 px-4 md:px-6">
        <div className="space-y-6 text-center">
          <h1 className="mt-20 mb-20 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Turn Lecture Slides into Flashcards
          </h1>
          <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <div className="w-full">
                <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your lecture notes here..."
                className="h-32 resize-none w-full"
                />
            </div>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleGenerate)} className="grid w-full items-start gap-6">
                        {file ? (
                            isLoading === false ? (
                                <>
                                    <FileCard file={file} handleFileRemove={handleFileRemove} />
                                    < Button type="submit" disabled={file === null}>
                                        <Sparkles className="mr-2 h-4 w-4" />Generate flashcards
                                    </Button>
                                </>
                            ) : (
                                <div className="mb-6">
                                    <FileCard file={file} />
                                </div>
                            )
                        ) : (
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
                        )}

                    </form>
                </Form>
            </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">Flashcard 1</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">Flashcard 2</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">Flashcard 3</span>
            </CardContent>
          </Card>
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
    )
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
    )
  }

  function CloudLightningIcon(props) {
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
        <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
        <path d="m13 12-3 5h4l-3 5" />
      </svg>)
    );
  }

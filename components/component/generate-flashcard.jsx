"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Card, CardContent } from "../ui/card"
import { Select } from "../ui/select"
import { useUser, SignInButton, UserButton, ClerkProvider } from "@clerk/nextjs";

export default function GenerateFlashcard() {
    const { isSignedIn } = useUser();
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("");


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
      }

      const handleGenerate = () => {}

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
            <div className="w-full">
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                <div className="flex items-center justify-center w-full h-32 rounded-md border-2 border-dashed border-muted-foreground transition-colors hover:border-primary hover:bg-muted/50 cursor-pointer">
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-1">
                    <UploadIcon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Upload a file</span>
                    <span className="text-xs text-muted-foreground">or drag and drop it here</span>
                    </label>
                </div>
                </div>
            </div>
            </div>

          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleGenerate}>Generate Flashcards</Button>

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


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignUp,
    SignUpButton,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

export function LandingPage() {
  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center" prefetch={false}>
          <CloudLightningIcon className="h-6 w-6 text-primary-foreground" />
          <span className="text-primary-foreground font-bold text-lg ml-2">Flashwise</span>
        </Link>
        <nav className="hidden lg:flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"
            prefetch={false}>
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"
            prefetch={false}>
            How It Works
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"
            prefetch={false}>
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"
            prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full min-[400px]:w-auto">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                href="#"
                className="flex items-center justify-between text-lg font-medium hover:underline"
                prefetch={false}>
                Features
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between text-lg font-medium hover:underline"
                prefetch={false}>
                How It Works
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between text-lg font-medium hover:underline"
                prefetch={false}>
                Pricing
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex items-center justify-between text-lg font-medium hover:underline"
                prefetch={false}>
                Contact
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button className="w-full">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="bg-primary py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12 mx-auto">
            <div className="space-y-4">
              <h1
                className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl xl:text-6xl">
                Effortless Flashcard Creation
              </h1>
              <p className="text-primary-foreground md:text-xl">
                AI Flashcards is a powerful SaaS tool that automatically generates flashcards from your slides or
                documents, making studying and review a breeze.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="outline" className="w-full min-[400px]:w-auto">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                width="500"
                height="400"
                alt="Flashcard Mockup"
                className="w-full max-w-md rounded-xl shadow-xl"
                style={{ aspectRatio: "500/400", objectFit: "cover" }} />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-3 mx-auto">
            <div className="flex flex-col items-center text-center space-y-2">
              <CloudLightningIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Automatic Flashcard Generation</h3>
              <p className="text-muted-foreground">
                Our AI-powered technology automatically generates flashcards from your slides or documents, saving you
                time and effort.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RepeatIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Two-Sided Review</h3>
              <p className="text-muted-foreground">
                Flashcards are designed for both front-to-back and back-to-front review, reinforcing your understanding.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <FolderIcon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Personalized Collections</h3>
              <p className="text-muted-foreground">
                Organize your flashcards into personalized collections, making it easy to focus on specific topics or
                subjects.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12 mx-auto">
            <div className="space-y-4">
              <h2 className="mb-10 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How AI Flashcards Works</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-primary rounded-full p-2 flex items-center justify-center">
                    <UploadIcon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Upload Your Content</h3>
                    <p className="text-muted-foreground">
                      Start by uploading your slides, documents, or other study materials to the AI Flashcards platform.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-primary rounded-full p-2 flex items-center justify-center">
                    <BoltIcon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">AI Generates Flashcards</h3>
                    <p className="text-muted-foreground">
                      Our advanced AI technology analyzes your content and automatically generates high-quality
                      flashcards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-primary rounded-full p-2 flex items-center justify-center">
                    <BookmarkIcon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Review and Study</h3>
                    <p className="text-muted-foreground">
                      Access your personalized flashcard collections and start reviewing and studying for your exams or
                      presentations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/placeholder.svg"
                width="500"
                height="400"
                alt="How It Works"
                className="w-full max-w-md rounded-xl shadow-xl"
                style={{ aspectRatio: "500/400", objectFit: "cover" }} />
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <h2 className="mb-10 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">Pricing</h2>
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-3 lg:gap-12 mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                <BoltIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-muted-foreground">
                Get started with our free plan, which includes basic flashcard generation and review features.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-sm text-muted-foreground">per month</span>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                <RepeatIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Standard</h3>
              <p className="text-muted-foreground">
                Our standard plan includes advanced features like custom collections and detailed analytics.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-sm text-muted-foreground">per month</span>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                <FolderIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-muted-foreground">
                Our premium plan unlocks unlimited flashcard generation, team collaboration, and priority support.
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-sm text-muted-foreground">per month</span>
              </div>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-primary py-12 md:py-24 lg:py-32">
          <div
            className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4 mx-auto">
            <h2
              className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Start Creating Flashcards Today
            </h2>
            <p className="max-w-[700px] text-primary-foreground md:text-xl">
              Sign up for a free trial and experience the power of AI-generated flashcards for your studying and
              presentation needs.
            </p>
            <Button variant="outline" className="hidden lg:inline-flex w-full min-[400px]:w-auto">
                Start Free Trial
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full mx-auto">
        <div
          className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <Link href="#" prefetch={false}>
              Features
            </Link>
            <Link href="#" prefetch={false}>
              Pricing
            </Link>
            <Link href="#" prefetch={false}>
              Integrations
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
          </div>
        </div>
      </footer>
    </div>)
  );
}

function BoltIcon(props) {
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
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>)
  );
}


function BookmarkIcon(props) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>)
  );
}


function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}


function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>)
  );
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


function FolderIcon(props) {
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
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>)
  );
}


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}


function RepeatIcon(props) {
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
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>)
  );
}


function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>)
  );
}


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}

import Footer from "./(home)/Footer"
import Header from "./(home)/Header"
import Tabs from "./(home)/Tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mini E-Commerce Platform
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Submit your products and browse your collection in one place.
          </p>
        </div>
        <Tabs />
      </main>
      <Footer />
    </div>
  )
}

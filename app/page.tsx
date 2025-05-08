import Footer from "./(home)/Footer"
import Header from "./(home)/Header"
import Tabs from "./(home)/Tabs"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs />
      </main>
      <Footer/>
    </div>
  )
}

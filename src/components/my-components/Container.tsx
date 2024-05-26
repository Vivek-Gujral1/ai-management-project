import Navbar from "@/components/my-components/Navbar";
export default function Container({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="h-screen w-screen bg-white ">
      <nav>
      <Navbar />
      </nav>
     <main className=" p-10">
     {children}
     </main>
      </section>
  }
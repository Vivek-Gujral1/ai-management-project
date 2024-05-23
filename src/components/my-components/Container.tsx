export default function Container({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="h-screen w-screen bg-[#121212]">{children}</section>
  }
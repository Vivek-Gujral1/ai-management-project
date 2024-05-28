import MessageLayout from "./MessageLayout"
export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className=" h-full w-full">
       <MessageLayout />
      <div className=" h-full w-full mt-5">
      {children}
      </div>
        </section>
  }
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex  items-center gap-16 p-6">
      <div
        className={
          "w-full max-w-6xl h-full max-h-full items-center  " +
          "text-xl flex flex-col gap-4 justify-center  " +
          "text-white border-white/10 bg-transparent  bg-cover bg-center " +
          "p-8  rounded-lg bg-yellow-green-100 " +
          "relative "
        }
      >
        <Image src="/images/logo.png" alt="Task Flow" width={100} height={100} className="mt" />
        <div className="flex flex-col max-w-xl  gap-4  font-medium text-dark-gray">
          {/* <p>
            A place to keep your work in{" "}
            <span className="font-bold bg-dark-gray text-yellow-green-100">flow.</span>
          </p> */}
          <p className="text-4xl gap-4 justify-center font-bold  ">
            A place to keep your work in flow.
          </p>
          <p>Multiple sessions, but just one workspace.</p>
        </div>

        {/* <div className="w-full h-full  h-10 overflow-hidden relative">
          <img src="/images/auth-bg.png" alt="Task Flow" className="w-full h-full object-cover" />
        </div> */}
      </div>
      {/* Intro and image container */}
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

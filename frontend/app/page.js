import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-white mt-5">
      <div className="bg-orange-100 flex justify-center items-center w-2/3 p-6 rounded-lg shadow-lg">
        <div className="mr-6">
          <h1 className="text-5xl font-bold text-orange-800 mb-4 w-fit">
            Bankia
          </h1>
          <h2 className="text-2xl text-orange-800 font-semibold">
            Ditt trygga val för ekonomisk framgång
          </h2>
        </div>
        <div className="w-[300px] h-[300px] flex justify-center items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1681910269181-50721e88e32c?q=80&w=1720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%"
            alt="happy family outside a beautiful home"
            className="w-[300px] h-[300px] rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-center item-center my-4 space-x-2">
        <Link href="/create">
          <button className="bg-orange-200 font-bold m-2 p-2 rounded-full w-40 hover:shadow-orange-900">
            Bli kund
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-orange-800 text-white font-bold m-2 p-2 rounded-full w-40">
            Logga in
          </button>
        </Link>
      </div>
    </div>
  );
}

import Header from "./Header";

export default function Loading() {
    return <main className="flex flex-col h-screen">
        <Header>
            <h1 className={`text-center text-[2.5rem] sm:text-[3rem] bg-transparent px-3 mb-0 py-0
outline-none placeholder:text-gray-600`}>Loading...</h1>
            <p className="w-full text-sm text-gray-600">2 minutes :D</p>
        </Header>
    </main>;
}
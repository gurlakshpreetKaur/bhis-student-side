export default function NotFound() {
    return <main className="flex flex-col h-screen">
        <header className="bg-gradient-to-l from-gray-500 to-gray-600 py-5 px-2 text-center flex flex-col">
            <h1 className={`text-center text-[2.5rem] sm:text-[3rem] bg-transparent px-3 mb-0 py-0
outline-none placeholder:text-gray-600`}>404</h1>
            <p className="w-full text-sm text-gray-200 flex-grow">This test does not exist!</p>
        </header>

        <section className="flex items-center justify-center flex-grow">
            <p className="text-center px-4 sm:px-14">Kindly recheck your link and ensure you have entered it correctly. If the link still does not open, then contact your teacher.</p>
        </section>
    </main >;
}
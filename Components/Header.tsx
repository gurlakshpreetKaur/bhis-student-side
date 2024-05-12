export default function Header({ children, title }: { children: JSX.Element | JSX.Element[], title?: string | JSX.Element }) {
    return <header className="bg-gradient-to-l from-purple-300 to-purple-200 py-5 px-2 text-center">

        {typeof title !== "undefined" ? <h1 className={`text-center text-[2.5rem] sm:text-[3rem] bg-transparent px-3 mb-0 py-0
         outline-none placeholder:text-gray-600`}>{title}</h1> : <></>}

        <br />

        {children}

    </header>
}
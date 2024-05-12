import Header from "./Header";

export default function SubmissionsHaveClosed({ grade, section, heading }: { grade: number, section: string, heading: string }) {
    return <main className="flex flex-col h-screen">
        <Header title={`${heading} (Grade ${grade} ${section})`}>
            <p className="w-full text-sm text-gray-600">Submissions closed</p>
        </Header>

        <section className="flex items-center justify-center flex-grow">
            <p>Submissions have closed, try next time!</p>
        </section>
    </main>;
}
import Test from "@/Pagess/Test";

export default function Home({ params }: { params: { id: string } }) {
    return <Test params={params} />;
}
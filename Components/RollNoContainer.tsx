import { Dispatch, SetStateAction } from "react";
import DropDown from "./RollNoDropDown";
import Header from "./Header";

interface RollNoContainerParams {
    heading: string;
    grade: string | number;
    section: string;
    date: string;
    rollNoOptions: string[];
    currentlySelectedRollNo: string;
    setRollNo: Dispatch<SetStateAction<string>>;
}

export default function RollNoContainer({ heading, grade, section, date, rollNoOptions, currentlySelectedRollNo, setRollNo }
    : RollNoContainerParams) {
    return <main className="flex flex-col h-screen">
        <Header title={`${heading} (Grade ${grade} ${section})`}>
            <p className="w-full text-sm text-gray-600">{date}</p>
            <div className="mt-6">
                <DropDown rollNoOptions={rollNoOptions} currentlySelected={currentlySelectedRollNo} changeSelection={setRollNo} />
            </div>
        </Header>

        <section className="flex items-center justify-center flex-grow">
            <p className="px-5 text-center">You have made your submission successfully! Thank you for submitting :)</p>
        </section>
    </main>;
}
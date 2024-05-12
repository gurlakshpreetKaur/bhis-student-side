import { Dispatch, SetStateAction } from "react";

interface DropDownParams {
    rollNoOptions: string[],
    currentlySelected: string,
    changeSelection: Dispatch<SetStateAction<string>>,
}

export default function DropDown({ rollNoOptions, currentlySelected, changeSelection }: DropDownParams) {
    return <select onChange={(e) => changeSelection(e.target.value)} value={currentlySelected}
        className={`ml-2 px-2 py-2 rounded-lg min-w-[100px] ${currentlySelected === "---" ? "bg-gray-100" : "bg-white bg-opacity-80"}`}>
        <option value={"---"} className="font-sans" disabled={currentlySelected !== "---"}>---Select Roll No. ---</option>
        {rollNoOptions.map((i, j) => <option value={i} key={j} className="font-sans">{i}</option>)}
    </select>;
}
import { Dispatch, SetStateAction } from "react";

interface DropDownParams {
    options: string[],
    currentlySelected: string,
    changeSelection: Dispatch<SetStateAction<string>>,
    placeholder: string
}

export default function DropDown({ options, currentlySelected, changeSelection, placeholder }: DropDownParams) {
    return <select onChange={(e) => changeSelection(e.target.value)} value={currentlySelected}
        className={`border border-black mx-1 my-1 px-2 py-2 rounded-lg min-w-[100px] ${currentlySelected === "---" ? "bg-gray-100" : "bg-white bg-opacity-80"}`}>
        <option value={"---"} className="font-sans" disabled={currentlySelected !== "---"}>--- {placeholder} ---</option>
        {options.map((i, j) => <option value={i} key={j} className="font-sans">{i}</option>)}
    </select>;
}
import Image from "next/image";

type OptionProps = {
    name: string;
    value: string;
    text: string;
    updateAnswer: () => void;
};

function Option({ name, value, text, updateAnswer }: OptionProps) {
    return (
        <span className="flex flex-row">
            <input type="radio" name={name} className="mr-2" value={value} onClick={updateAnswer} />
            <p className={`block mb-1 w-full md:w-full flex-grow bg-opacity-60 rounded-full px-4 py-1 outline-none
             ${false ? "bg-black text-white" : "bg-white text-black"} text-left`}>{text}</p>
        </span>
    );
}

type QuestionProps = {
    question: string;
    options: { [key: string]: string };
    questionNumber: number;
    image?: string;
    youtubeVideo?: string;
    setAnswer: (qNo: number, ans: ('i' | 'ii' | 'iii' | 'iv')) => void;
};

// Subcomponent for displaying the question and options
export default function Question({ question, options, questionNumber, setAnswer, image, youtubeVideo }: QuestionProps) {
    return (<div className="mb-6 max-w-[500px] w-full min-w-[250px] mx-auto rounded-xl bg-gradient-to-l from-purple-100 to-purple-200 py-4 px-5 text-center">
        <div className="w-full flex flex-row">
            <h2 className={`w-full bg-opacity-100 rounded-full px-4 py-1 outline-none text-left flex-grow`}>Q{questionNumber}. {question}</h2>
        </div>

        {typeof image !== "undefined" && <div className="min-[400px]:p-4">
            <Image className="w-full h-auto rounded-lg" src={image} alt="Loading" />
        </div>}

        {typeof youtubeVideo !== "undefined" && <div className="min-[400px]:p-4 text-center">
            <iframe src={`${youtubeVideo}`} className="max-w-full h-auto mx-auto"
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>}

        <div className="mt-4 mb-2">
            {/* Render options */}
            <Option name={`${questionNumber}-${question}`} value="i" text={`i. ${options["i"]}`} updateAnswer={() => setAnswer(questionNumber - 1, "i")} />
            <Option name={`${questionNumber}-${question}`} value="ii" text={`ii. ${options["ii"]}`} updateAnswer={() => setAnswer(questionNumber - 1, "ii")} />
            <Option name={`${questionNumber}-${question}`} value="iii" text={`iii. ${options["iii"]}`} updateAnswer={() => setAnswer(questionNumber - 1, "iii")} />
            <Option name={`${questionNumber}-${question}`} value="iv" text={`iv. ${options["iv"]}`} updateAnswer={() => setAnswer(questionNumber - 1, "iv")} />
        </div>
    </div>
    );
}
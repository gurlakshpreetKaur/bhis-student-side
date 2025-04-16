"use client"

import db from "@/types/firebase"
import { LeaderBoardEntryDB, Test, TestQuestion, TestWithID } from "@/types/types";
import { format } from "date-fns/format";
import { getDoc, doc, updateDoc, arrayUnion, setDoc, increment } from "firebase/firestore"
import { useEffect, useState } from "react";
import { gradeWiseStudentsList } from "@/types/studentsList";
import { getPassword } from "@/types/password";
import DropDown from "@/Components/RollNoDropDown";
import Question from "@/Components/QuestionForTest";
import Loading from "@/Components/Loading";
import NotFound from "@/Components/NotFound";
import Header from "@/Components/Header";
import SubmissionsHaveClosed from "@/Components/SubmissionsHaveClosed";
import RollNoContainer from "@/Components/RollNoContainer";

function getGradeFromId(id: string) {
    return Number(id.charAt(6));;
}

export default function Page({ params }: { params: { id: string } }) {
    const [testdata, setTestdata] = useState<TestWithID | null>(null);
    const [answersSelected, setAnswersSelected] = useState<(TestQuestion["answer"] | "")[]>([]);
    const [rollNo, setRollNo] = useState<string>('---');
    const [submissionMade, setSubmissionMade] = useState(false);
    const [studentsList, setStudentsList] = useState<string[]>([]);
    const [passwordEntered, setPasswordEntered] = useState("");
    const [correctPassword, setCorrectPassword] = useState("");
    const [submissionMadeList, setSubmissionMadeList] = useState<string[] | null>(null);

    const haveAllQuestionsBeenAnswered = (answers: string[]) => {
        if (!testdata) return;

        const questions = testdata.questions;
        if (questions.length !== answers.length) return false;
        if (answers.includes("")) return false;

        return true;
    }


    const setAnswer = (qNo: number, ans: TestQuestion["answer"]) => {
        setAnswersSelected(prev => {
            const prevCopy = [...prev];
            prevCopy[qNo] = ans;
            return prevCopy
        });
    }

    useEffect(() => {
        if (rollNo === "---") return;
        if (submissionMadeList === null) return;
        setSubmissionMade(submissionMadeList.includes(rollNo));
        getPassword(rollNo).then((password) => setCorrectPassword(password));
    }, [rollNo, submissionMadeList]);

    // console.log("Correct password for roll no", rollNo, "is", correctPassword);

    useEffect(() => {
        getDoc(doc(db[getGradeFromId(params.id)], "test", params.id)).then(async (test) => {
            const data = { ...test.data(), id: test.id } as (Test & { id: string });
            setTestdata(data);
            setSubmissionMadeList(data.responses.map(i => i.rollNumber));
            setStudentsList(gradeWiseStudentsList[Number(data.class) - 1][data.section] as string[]);
        })
    }, [params.id]);


    const handleSubmition = async () => {
        if (!testdata) return;

        let marks = 0;

        for (let i = 0; i < answersSelected.length; i++) {
            if (answersSelected[i] === testdata.questions[i].answer) marks++;
        }

        const studentDocName = rollNo;


        //step 1: add response to the form
        await updateDoc(doc(db[getGradeFromId(params.id)], "test", params.id), {
            responses: arrayUnion({
                rollNumber: studentDocName,
                score: marks * 5,
                studentResponseLink: `/test/${params.id}/scores/${studentDocName}`,
            })
        });

        //step 2: add response to the students data
        await setDoc(doc(db[getGradeFromId(params.id)], "student", studentDocName),
            {
                responses: arrayUnion({
                    heading: testdata.heading,
                    testId: params.id,
                    answers: answersSelected,
                    time: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
                    score: marks * 5
                }),
                totalScore: increment(marks * 5),
                class: testdata.class,
                section: testdata.section
            }, { merge: true });

        //Step 3: add response to leaderboard data
        let docData = (await getDoc(doc(db[0], "leaderboard", `grade_${getGradeFromId(params.id)}`))).data();

        if (typeof docData === "undefined") {
            docData = ({ students: [] });
        }

        let docLead = docData.stufdents as LeaderBoardEntryDB["marks"];

        if (typeof docLead === "undefined") {
            docLead = [];
        }

        const alreadyExistingScore = docLead.filter((i) => i.rollNumber === rollNo);

        const score = alreadyExistingScore.reduce((acc, prev) => acc + prev.score, 0);

        const toSetArray = docLead.filter((i) => i.rollNumber !== rollNo);

        localStorage.setItem(`totalScore-${rollNo}`, String(score + (marks * 5)));

        await setDoc(doc(db[0], "leaderboard", `grade_${getGradeFromId(params.id)}`), {
            students: [...toSetArray, {
                rollNumber: studentDocName,
                score: score + (marks * 5),
            }]
        }, { merge: true });

        alert("Submitted successfully!");
        setSubmissionMadeList(prev => prev !== null ? [...prev, rollNo] : [rollNo]);
        setSubmissionMade(true);
    }

    const rollNoSelect = new Array(studentsList.length).fill(0).map((i, j) => `BHIS_${testdata?.class}_${testdata?.section}_${j + 1}`);

    if (testdata === null) return <Loading />;

    if (typeof testdata.questions === "undefined") return <NotFound />;

    if (testdata.active === false) <SubmissionsHaveClosed grade={testdata.class} section={testdata.section} heading={testdata.section} />;

    if (submissionMade) {
        return <RollNoContainer
            heading={testdata.heading}
            grade={testdata.class}
            section={testdata.section}
            rollNoOptions={rollNoSelect}
            currentlySelectedRollNo={rollNo}
            setRollNo={setRollNo}
            date={testdata.dateFormatted} />
    }

    return <main>
        <Header title={`${testdata.heading} (Grade ${testdata.class})`}>
            <p className="w-full text-sm text-gray-600">Test created on: {testdata.dateFormatted}</p>
            <div className="mt-6">
                <DropDown rollNoOptions={rollNoSelect} currentlySelected={rollNo} changeSelection={setRollNo} />
                <input type="text" className="bg-white rounded-full py-1 px-4 mt-3 block mx-auto outline-none"
                    value={passwordEntered}
                    onChange={(e) => setPasswordEntered(e.target.value)}
                    placeholder="Enter your password..." />
                <p className="mt-2 px-2">
                    {passwordEntered.length > 0 ? (correctPassword !== passwordEntered && "Incorrect Password")
                        : "Enter password and roll no. to access test"}</p>
            </div>
        </Header>

        {correctPassword === passwordEntered && correctPassword.length > 0 &&
            <section className="py-10 px-2 text-center">
                {testdata.questions.map((i, j) => <Question {...i} key={j} setAnswer={setAnswer} />)}
                <button className={`bg-purple-400 text-white rounded-lg py-2 px-4 mx-auto`}
                    disabled={rollNo === "---" || !haveAllQuestionsBeenAnswered(answersSelected)}
                    onClick={(e) => {
                        e.currentTarget.disabled = true;
                        handleSubmition()
                    }}>Submit!</button>
            </section>}
    </main>;
}
"use client"

import db from "@/types/firebase";
import { LeaderBoardEntryDB, Student, StudentWithID, sections } from "@/types/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { gradeWiseStudentsList } from "@/types/studentsList";
import DropDown from "@/Components/GeneralDropDown";

interface TableRowProps {
    rowBg?: string;
    rowBorderColorClass?: string;
    rowTextColor?: string;
    rowRecord: {
        rank: string;
        name: string;
        totalScore: number;
    }
}

function TableRow({ rowBg = "bg-white", rowBorderColorClass = "border-gray-800", rowTextColor = "text-black", rowRecord }: TableRowProps) {
    return <tr className={rowBg}>
        <td className={`border ${rowBorderColorClass} px-4 py-2 sm:hidden ${rowTextColor}`}>
            {rowRecord.rank} {rowRecord.name}</td>
        <td className={`border border-gray-800 px-4 py-2 max-sm:hidden text-center ${rowTextColor}`}>{rowRecord.rank}</td>
        <td className={`border border-gray-800 px-4 py-2 max-sm:hidden text-center ${rowTextColor}`}>{rowRecord.name}</td>
        <td className={`border border-gray-800 px-4 py-2 text-center ${rowTextColor}`}>{rowRecord.totalScore}🌟</td>
    </tr>
}

function LeaderboardTable({ data, grade, section }: { data: LeaderboardEntry[], grade: string, section: string }) {
    return (data.length > 0 && <div className="pb-5">
        <h3 className="text-2xl text-center mb-2">Grade {grade} ({section})</h3>
        <table className="border-collapse w-full rounded-xl max-w-[600px] mx-auto">
            <thead>
                <tr className="bg-black">
                    <th className="border border-gray-400 px-4 py-2 max-sm:hidden w-[70px] text-center text-white">Rank</th>
                    <th className="border border-gray-400 px-4 py-2 text-white">Name</th>
                    <th className="border border-gray-400 px-4 py-2 w-[100px] text-center text-white">Points</th>
                </tr>
            </thead>

            <tbody>
                <TableRow rowBg={"bg-yellow-400"} rowBorderColorClass={"border-yellow-800"} rowTextColor={"text-yellow-800"}
                    rowRecord={{ ...data[0], rank: "1" }} />

                {data.length >= 2 &&
                    <TableRow rowBg={"bg-gray-300"} rowBorderColorClass={"border-gray-800"} rowTextColor={"text-gray-600"}
                        rowRecord={{ ...data[1], rank: "2" }} />}

                {data.length >= 3 &&
                    <TableRow rowBg={"bg-yellow-700"} rowBorderColorClass={"border-gray-800"} rowTextColor={"text-yellow-500"}
                        rowRecord={{ ...data[2], rank: "3" }} />}

                {data.map((entry, index) => ((index >= 3) &&
                    <TableRow rowRecord={{ ...entry, rank: String(index + 1) }} key={index} />
                ))}
            </tbody>
        </table>
    </div>);
}

type LeaderboardEntry = {
    name: string,
    totalScore: number;
    id: string;
};

function getSectionFromRollNo(rollNo: string) {
    const importantDigit = rollNo.charAt(7);

    if (importantDigit === 'I') return "Iris";
    if (importantDigit === 'P') return "Peony";
    return "Bluebell";
}

export default function Home() {
    const [relData, setRelData] = useState<StudentWithID[] | null>(null);

    const [gradeToView, setGradeToView] = useState<number>(1);

    useEffect(() => {
        getDoc(doc(db[0], "leaderboard", `grade_${gradeToView}`)).then((doc) => {
            if (!doc.exists()) {
                setRelData([]);
                return;
            };

            console.log(doc, doc.data());

            const studentsData = doc.data() as LeaderBoardEntryDB;

            const studentsDataEntries = studentsData.marks;

            const studentsDataFormatted: StudentWithID[] = studentsDataEntries.map(i =>
            ({
                id: i.rollNumber,
                rollNumber: i.rollNumber,
                class: `${gradeToView}`,
                totalScore: i.score,
                section: getSectionFromRollNo(i.rollNumber),
                responses: []
            }))

            console.log(studentsDataFormatted);

            setRelData(studentsDataFormatted);
        });
    }, [gradeToView]);

    const getDataOfClassAndSection = (grade: string, section: string) => {
        if (!relData) return null;

        //get students
        const students = gradeWiseStudentsList[Number(grade) - 1][section];

        //infer rollNo and covert into map array
        const rollNoAndName = students.map((student, j) => ({ name: student, rollNo: `BHIS_${grade}_${section}_${j + 1}` }));

        //using relData which has been fetched (and has data of all classes), we filter out the specific class and section
        //which we want and sort it (students data) in descending order by total score of student
        const dataOfClassAndSection = relData.filter(doc => {
            return (Number(doc.class) === Number(grade) && (section === doc.section))
        }).sort((a, b) => b.totalScore - a.totalScore);

        //creates an object with key as rollNo and the value as name using the array which we made prior to this
        const rollNoObject: { [key: string]: string } = rollNoAndName.reduce((acc, { name, rollNo }) => {
            acc[rollNo] = name;
            return acc;
        }, {} as { [key: string]: string });

        //crreate an array with name, totalScore, and id
        const finalData: LeaderboardEntry[] = dataOfClassAndSection.map(i => {
            return ({
                name: rollNoObject[i.id],
                totalScore: i.totalScore,
                id: i.id
            })
        });

        return finalData;
    }

    return (<main className="min-h-screen">
        <section className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-l from-purple-300 to-purple-200">
            <h1 className="text-3xl mb-3 text-center">Learning While Having Fun!</h1>
            <p className="text-center max-sm:text-sm">At Billabong High International School, Rewa</p>
        </section>

        <section className="py-16 px-10">
            <h2 className="text-3xl mb-3 text-center text-purple-400">Class-Wise Leaderboards</h2>

            <div className="py-3 text-center">
                Select the class:
                <DropDown options={["1", "2", "3", "4", "5", "6", "7"]}
                    currentlySelected={String(gradeToView)}
                    changeSelection={(val) => { setGradeToView(Number(val)); }}
                    placeholder={"Select Class"} />
            </div>

            <div className="py-12">
                {relData !== null && relData.length === 0 && <div className="text-center py-5 px-4">
                    <p className="text-center">No submissions have been received from this class yes!</p>
                </div>}
                {relData !== null && relData.length > 0 && sections[gradeToView - 1].map((section, index) => {
                    const D = getDataOfClassAndSection(String(gradeToView), section);
                    if (D === null) return <></>;
                    return <LeaderboardTable
                        data={D}
                        grade={String(gradeToView)}
                        section={section} key={`${index}_${gradeToView}_${section}`} />
                })}
            </div>
        </section>
    </main>
    );
}
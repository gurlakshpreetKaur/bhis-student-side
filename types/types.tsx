type Grades = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const sections = [
    ["Iris", "Peony"],
    ["Iris", "Peony", "Bluebell"],
    ["Iris", "Peony", "Bluebell"],
    ["Iris", "Peony", "Bluebell"],
    ["Iris", "Peony"],
    ["Iris", "Peony"],
    ["Iris", "Peony"]
];

export { sections };

interface Student {
    rollNumber: string,
    class: string,
    section: string,
    totalScore: number
    responses: ({ heading: string, testId: string, answers: ('i' | 'ii' | 'iii' | 'iv' | "")[], time: string, score: number })[]
}

interface StudentWithID extends Student {
    id: string;
}

interface TestQuestion {
    question: string,
    image?: string,
    youtubeVideo?: string,
    options: {
        "i": string,
        "ii": string,
        "iii": string,
        "iv": string
    },
    answer: "i" | "ii" | "iii" | "iv",
    questionNumber: number
}

interface StudentTestOverView {
    rollNumber: string,
    score: number,
    studentResponseLink: string,
}

interface Test {
    heading: string,
    class: Grades,
    section: string,
    dateCreated: number,
    dateFormatted: string,
    questions: TestQuestion[],
    responses: StudentTestOverView[]
    active: boolean
}

interface TestWithID extends Test {
    id: string;
}

export type { Grades, Student, TestQuestion, Test, StudentTestOverView, TestWithID, StudentWithID };

interface LeaderBoardEntryDB {
    grade: number;
    marks: LeaderboardEntryUnit[]
}

interface LeaderboardEntryUnit {
    rollNumber: string,
    score: number
}

export type { LeaderBoardEntryDB };
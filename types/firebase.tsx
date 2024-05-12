import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfigMain = {
    apiKey: "AIzaSyDfUsuctd_DIKnBc7OyjAxDVw9U1AKUESI",
    authDomain: "bhis-a7104.firebaseapp.com",
    projectId: "bhis-a7104",
    storageBucket: "bhis-a7104.appspot.com",
    messagingSenderId: "722573019707",
    appId: "1:722573019707:web:bdc1adb8d0b10b92e2aa1e",
    measurementId: "G-NGHGJ6GTCL"
};

const mainApp = initializeApp(firebaseConfigMain);
const mainDB = getFirestore(mainApp);

const auth = getAuth(mainApp);



/////////////////////////////////// GRADE 1
const firebaseConfig1 = {
    apiKey: "AIzaSyAZ6q2GUjlc6jLMMb6eU7KGVPxGmoGiVMQ",
    authDomain: "bhis-1.firebaseapp.com",
    projectId: "bhis-1",
    storageBucket: "bhis-1.appspot.com",
    messagingSenderId: "124577743800",
    appId: "1:124577743800:web:730ae3a5a520e056d1454d"
};


// Initialize Firebase
const app1 = initializeApp(firebaseConfig1, "grade1");
const DB1 = getFirestore(app1);




/////////////////////////////////// GRADE 2
const firebaseConfig2 = {
    apiKey: "AIzaSyC3wN0NqxyC7EeIslip047F_r_dPhusapY",
    authDomain: "bhis-2.firebaseapp.com",
    projectId: "bhis-2",
    storageBucket: "bhis-2.appspot.com",
    messagingSenderId: "119002464252",
    appId: "1:119002464252:web:8c46811a37bd4708613c79"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig2, "grade2");
const DB2 = getFirestore(app2);



//////////////////////////////////// GRADE 3
const firebaseConfig3 = {
    apiKey: "AIzaSyDD7Xwd2INcKsudJIFRS9l1cF_yO8EX0fo",
    authDomain: "bhis-3.firebaseapp.com",
    projectId: "bhis-3",
    storageBucket: "bhis-3.appspot.com",
    messagingSenderId: "932396111502",
    appId: "1:932396111502:web:202ce5aee42b5d88a2dbdf"
};


// Initialize Firebase
const app3 = initializeApp(firebaseConfig3, "grade3");
const DB3 = getFirestore(app3);


//////////////////////////////////// GRADE 4
const firebaseConfig4 = {
    apiKey: "AIzaSyCXGxfLKyqGoYwtW1dTp3EKt_8jEiVhMcw",
    authDomain: "bhis-4.firebaseapp.com",
    projectId: "bhis-4",
    storageBucket: "bhis-4.appspot.com",
    messagingSenderId: "620679381038",
    appId: "1:620679381038:web:65652bad54a13187a29fbf"
};


// Initialize Firebase
const app4 = initializeApp(firebaseConfig4, "grade4");
const DB4 = getFirestore(app4);



//////////////////////////////////// GRADE 5
const firebaseConfig5 = {
    apiKey: "AIzaSyBAqnU7MdMGXlf2aPMMzxsQBbddwRjrCxM",
    authDomain: "bhis-5.firebaseapp.com",
    projectId: "bhis-5",
    storageBucket: "bhis-5.appspot.com",
    messagingSenderId: "842324297158",
    appId: "1:842324297158:web:4d782fd8d1000157b45ec7"
};


// Initialize Firebase
const app5 = initializeApp(firebaseConfig5, "grade5");
const DB5 = getFirestore(app5);



//////////////////////////////////// GRADE 6
const firebaseConfig6 = {
    apiKey: "AIzaSyDwppH3HqlJWEgIXnGjg4_KsIkEL1KR-tY",
    authDomain: "bhis-6.firebaseapp.com",
    projectId: "bhis-6",
    storageBucket: "bhis-6.appspot.com",
    messagingSenderId: "136968219534",
    appId: "1:136968219534:web:f7dff7e3a26037bb0492df"
};


// Initialize Firebase
const app6 = initializeApp(firebaseConfig6, "grade6");
const DB6 = getFirestore(app6);



//////////////////////////////////// GRADE 7
const firebaseConfig7 = {
    apiKey: "AIzaSyDHGUjTzFgM1u8rIlWKfulTwQxNuUk6Bf0",
    authDomain: "bhis-7.firebaseapp.com",
    projectId: "bhis-7",
    storageBucket: "bhis-7.appspot.com",
    messagingSenderId: "658334780967",
    appId: "1:658334780967:web:4fd48d3e6b617556c6c802"
};


// Initialize Firebase
const app7 = initializeApp(firebaseConfig7, "grade7");
const DB7 = getFirestore(app7);


export default [mainDB, DB1, DB2, DB3, DB4, DB5, DB6, DB7];
export { auth };
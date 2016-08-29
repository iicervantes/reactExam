import React from 'react';
import ReactDOM from 'react-dom';
import Exam from './exam.jsx';

var test = {
    topic: "C#",
    questions: [
        {
            id: "1",
            ques:"Who is your favorite Revature employee?",
            ans:"LeVeta",
            weight: 3,
            options:[
                {text:"LeVeta"},
                {text:"Fred"},
                {text:"Joe"},
                {text:"David"}
            ]
        },
        {
            id: "2",
            ques:"Can you force garbage collection in C#?",
            ans:"Kinda",
            weight: 2,
            options:[
                {text:"Not technically"},
                {text:"Kinda"},
                {text:"Yes"},
                {text:"Well, in Java you can't."}
            ]
        },
        {
            id: "3",
            ques: "Why is Texas better than all the states?",
            ans: "Because it's Texas",
            weight: 1,
            options: [
                {text: "Because it's Texas"},
                {text: "Virginia is for lovers"},
                {text: "I rather be in Wisconsin"},
                {text: "Canada is the place to go!"}
            ]
        }
    ]
};

var testDB = {
    topic: "Database",
    questions: [
        {
            id: "1",
            ques:"What is sql injection?",
            ans:"Hackers doing stuff",
            weight: 5,
            options:[
                {text:"Hackers doing stuff"},
                {text:"Inserting data in sql"},
                {text:"Auto data manipulation from database"},
                {text:"I don't know sql"}
            ]
        },
        {
            id: "2",
            ques:"Difference between truncate and delete?",
            ans:"You can't rollback with truncate.",
            weight: 5,
            options:[
                {text:"The same"},
                {text:"Truncate sounds cool"},
                {text:"I like truncate"},
                {text:"You can't rollback with truncate."}
            ]
        },
        {
            id: "5",
            ques: "What is normalization?",
            ans: "Reduce duplicate data",
            weight: 1,
            options: [
                {text: "The process of becoming normal"},
                {text: "Reduce duplicate data"},
                {text: "3.5 is the best"},
                {text: "Matrix process to civilize the world."}
            ]
        }
    ]
};

ReactDOM.render(<Exam input={test}/>, document.getElementById('exam'));


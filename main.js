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

ReactDOM.render(<Exam details={test}/>, document.getElementById('exam'));


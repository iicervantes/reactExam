import React from 'react';
import { Button, Modal } from 'react-bootstrap';

var Exam = React.createClass({
    /*properties
     * details= Holding entire test
     */
    getInitialState: function() {
        return {totalscore : 0, testSubmitted: false};
    },
    handleChange: function(result) {
        this.setState({totalscore: result.totalscore, testSubmitted: true});
    },

    render: function(){
        var totalPoints = 0;
        this.props.details.questions.map(question => totalPoints += question.weight);

        return(
            <div>
                <h1>Exam for {this.props.details.topic}</h1>
                <hr/>

                <table className="table-bordered">
                    <tbody>
                    <tr>
                        <td className="col-md-9">
                            <QuestionList questions={this.props.details.questions} onSubmitted={this.handleChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <Modal show={this.state.testSubmitted}>
                    <Modal.Header  closeButton>
                        <Modal.Title>Score Summary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Report score={this.state.totalscore} testSubmitted={this.state.testSubmitted}
                                percentage={Math.round(this.state.totalscore*100/totalPoints)} tpoints={totalPoints}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});

var QuestionList = React.createClass({
    /*properties
     /questions = list of questions
     /onSubmitted = bool if test has been submitted
     */
    getInitialState: function() {
        return {totalscore : 0};
    },
    handleChange: function(score) {
        this.setState({totalscore: this.state.totalscore + score});
    },
    handleSubmitted: function(event) {
        var result = {totalscore: this.state.totalscore};
        this.props.onSubmitted( result );
        clearInterval(this.interval);
    },


    render: function(){
        var questionAnswers = this.props.questions.map(function(question,i){
            return(
                <tr key={i}><td className="ques">
                    <Question number={question.id} question={question.ques} options={question.options}
                              answer={question.ans} weight={question.weight}
                              onAnswered={this.handleChange}/></td></tr>
            );
        }, this);
        return(
            <div>
                <table className="table">
                    <tbody>{questionAnswers}</tbody></table>
                <div><input type="button" className="btn btn-success btn-lg center-block"
                            value="Submit" onClick={this.handleSubmitted}/></div>
            </div>

        );
    }
});

var Question = React.createClass({
    /*properties
     /question = question
     /number = number of question in list
     /options = array of answers for the question
     /answer = correct answer
     /weight = weight of questions
     /onAnswered = event in QuestionListClass that passes in score
     */

    getInitialState: function() {
        return {
            correctAnswerRecorded: false,
            negativeAnswerRecorded: false,
            tempAnswer:""
        };
    },
    handleChange: function(event) {
        let score = 0;
        this.state.tempAnswer = event.target.value;

        //check if selected answer is correct
        if( event.target.value == this.props.answer) {
            //first response
            if( this.state.correctAnswerRecorded === false ) {
                //keep score the same
                score = this.props.weight;
            }

            this.state.correctAnswerRecorded = true;
            this.state.negativeAnswerRecorded = false;
        } else {
            //deviate from correct
            if( this.state.correctAnswerRecorded === true ) {
                score = -this.props.weight;
            }
            this.state.negativeAnswerRecorded = true;
            this.state.correctAnswerRecorded = false;
        }
        //pass in score to scoreboard exam
        this.props.onAnswered(score);
    },
    render: function(){
        //set input element name
        var qname = "option" + this.props.number;
        //return radio buttons with answers
        var qoptions = this.props.options.map(function(option,i){
            return (

                //display answers of question
                <div key={i}><input type="radio" name={qname}  value={option.text} onChange={this.handleChange}/>&nbsp;{option.text}</div>
            );
        }, this);
        return(
            <div className="list-group-item">
                {/*display questions*/}
                <div><strong>Question {this.props.number}</strong>: {this.props.question}</div>
                {/*display answers*/}
                <div>{qoptions}</div>
                <br/>
                <p>Answer saved: {this.state.tempAnswer}</p>

            </div>
        );
    }
});

var Report = React.createClass({
    /*properties
     /score = summation of weight
     /testSubmitted = bool if test submitted
     /percentage = score/total points points
     /tpoints = total points possible
     */

    render: function(){
        var status = "Test not submitted!";
        if( this.props.testSubmitted == true ) {
            if( this.props.percentage < 70 ) {
                status = "Sorry, you did not pass the test."
            } else {
                status = "Congratulations!! You passed the test.";
            }
        }
        return(
            <div className="list-group">
                <div className="list-group-item list-group-item-success">Score: <strong>{this.props.score} out of {this.props.tpoints}</strong></div>
                <div className="list-group-item list-group-item-info">Percentage: <strong>{this.props.percentage}&nbsp;%</strong></div>
                <div className="list-group-item list-group-item-danger">Status: <strong>{status}</strong></div>
            </div>
        );
    }
});

export default Exam;

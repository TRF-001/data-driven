import { element } from "prop-types";
import React, { useState } from "react";
import Input from "./Input";
// import Axios from "axios";
// import {withRouter} from 'react-router-dom'
// import { Link } from "react-router-dom";

function Intern_form(){
    
    const [userName, setName]  = useState("");
    const [placeholderStyle, setPlaceholderStyle] = useState({
        position: "absolute",
        left: "12px",
        top: "calc(50% + 10px)",
        transform: "translateY(-50%)",
        transition: "top 1s ease, fontSize 0.3s ease",
    })
    const [placeholder_moved, set_placeholder_moved] = useState(false);

    const [question, set_question] = useState("What's your first name?");

    const [user_response, set_user_response] = useState([]);

    const question_list = [
        "What's your firt name?",
        "What company did you intern for?",
        `How did you establish <br /> a meaningful <h1> communications </h1> with a recruiter from ${user_response.company}?`
    ]

    

    const [step, set_step] = useState(1);

    // const [buttonStyle, setbuttonStyle] = useState({
    //     // opacity: 0,
    //     // // display: "none"
        
    // }
    //   )
    
    const [primary_input_field, set_primary_input_field] = useState([]);
    const [secondary_input_field_and_button, set_secondary_input_field_and_button] = useState({display: "none"});
    // const [primary_input_field_button, set_primary_input_field_button] = useState([]);
    const [selection_field, set_selection_field] = useState({display:"none"});
    const [selection_field_button, set_selection_field_button] = useState({display:"none"});

    function handleChange(event) {

        if (!placeholder_moved) {
            handleStyleChange()
        }

        if (step === 1) {
            console.log(event.target.value);
            setName(event.target.value.trimStart());
            set_user_response(preValue => ({...preValue, name: event.target.value.trimStart()}))
        }

        if (step === 2) {
            set_user_response(preValue => ({...preValue, company: event.target.value.trimStart()}))
        }
        
    }

    function show_other_input_field(e){
        console.log("clicked");
        console.log(step);
        console.log(e.target.value);
        if (step === 3 && (parseInt(e.target.value) === 9)){
            set_selection_field({display:"flex"});
            set_selection_field_button({display:"none"});
            set_secondary_input_field_and_button({display:"flex"});
            console.log("clickedccc");
        }

    }



    function handleStyleChange(event) {




        if (userName === "") {         
        
            set_placeholder_moved(true);

            setPlaceholderStyle(
                {
                    // top: "-10px",
                    fontSize: "24px",
                    color: "#008fff",
                    zIndex:1,
                    animation: "moveUpAndCenter ease-out 0.5s",
                    animationFillMode: "forwards"

                }
            )
            // setbuttonStyle({
            //     opacity: 100,
            //     display: "block"
            // }
            // )
        }

 



        document.getElementById('input_field').focus();
    }

    function isOverflown(element) {
        return element.scrollWidth > window.innerWidth;
      }

    function getNextQuestion(event) {


        // set_user_response(preValue => ({...preValue, name: userName}))
        var relevant_data = user_response.name
        if (step === 2){
            relevant_data = user_response.company
        }

        console.log(relevant_data)

        if (relevant_data && relevant_data.trim()) {

            setPlaceholderStyle(
                {
                    top: "-30px",
                    fontSize: "24px",
                    color: "#008fff",
                    zIndex:1,
                    animation: "moveRight ease-in 0.75s",
                    whiteSpace: "pre"
                }
            )
            // setbuttonStyle({
            //     opacity: 100,
            //     visibility: "visible"
            // }
            // )

            setTimeout(function(){ 


                

                if (step===1) {

                    if (isOverflown){
                        set_question(<span>What company did<br />you intern for?</span>)
                        setPlaceholderStyle(
                            {
                                top: "-30px",
                                fontSize: "24px",
                                color: "#008fff",
                                zIndex:1,
                                left: "50%",
                                transform: "translate(-50%,-50%)" 
                            }
                        )
                    }
                    else {
                        set_question(question_list[step]);
                        setPlaceholderStyle(
                            {
                                top: "-30px",
                                fontSize: "24px",
                                color: "#008fff",
                                zIndex:1,
                                left: "50%",
                                transform: "translate(-50%,-50%)" 
                            }
                        )
                    }
                    set_step(2)
                } else if (step === 2) {
                set_question(<span>How did you establish <br /> meaningful communications <br /> with a recruiter from {user_response.company}? </span>);
                setPlaceholderStyle(
                    {
                        top: "-30px",
                        fontSize: "24px",
                        color: "#008fff",
                        zIndex:1,
                        left: "50%",
                        transform: "translate(-50%,-50%)" 
                    }           
                )
                set_primary_input_field({visibility: "hidden"});
                set_selection_field({display:"flex"});
                set_selection_field_button({display:"flex"});
                // set_primary_input_field_button({visibility: "hidden"});
                set_step(3);
                }
                // else if (step === 3) {
                    
                // }





                // console.log(document.getElementById('question').scrollWidth)

                console.log(isOverflown(document.getElementById('question')))
                console.log(document.getElementById('question').scrollWidth)            
                console.log(window.innerWidth)

                // function isOverflown(element) {
                //     return  element.scrollWidth > element.clientWidth;
                //   }

                
                

            }, 750);



            document.getElementById('input_field').focus();
            document.getElementById('input_field').value = "";
        }
        event.preventDefault();
    }

    return (
        <div >       
                <div className="formDiv">
                    <h1 className="greeting">
                        Hello {userName}
                    </h1>
                    {/* <form onSubmit = {buttonSumittedQ1} style = {q1Style}> */}
                <form onSubmit= {getNextQuestion}>

                <div class="input-group mb-3 custom-field">
                    <input id = "input_field" onChange = {handleChange} type="text" class="form-control" style ={primary_input_field} onClick = {handleStyleChange}  aria-label="Recipient's username" aria-describedby="basic-addon2" required/>
                    <span id ="question" class="placeholder" onClick = {handleStyleChange} style = {placeholderStyle}>{question}</span>
                    <div style={primary_input_field} class="input-group-append">
                        <button type = "submit"  class="btn btn-outline-secondary" >Next</button>
                    </div>
                </div>
                    {/* <Input onChange = {handleChange} onClick = {handleStyleChange} pHolderStyle = {placeholderStyle} holder = "What's your first name?"/>
                    <button class="btn" type = "submit"   ><i class="fas fa-arrow-right"></i> </button> */}
                <div class="input-group selectpicker custom-field">
                    <select onChange={show_other_input_field} style={selection_field} className="custom-select" id="inputGroupSelect04" size="1">
                        <option selected>Select...</option>
                        <option value="1" >I applied online on {user_response.company}'s website.</option>
                        <option value="2">I applied online via my school's internship portal.</option>
                        <option value="3">I attended a student career fair at my school.</option>
                        <option value="4">I attended a virtual event hosted by {user_response.company}.</option>
                        <option value="5">I reached out to a recruiter on LinkedIn.</option>
                        <option value="6">I reached out to a hiring manger on LinkedIn.</option>
                        <option value="7">A full-time employee at {user_response.company} put me in contact with a recruiter.</option>
                        <option value="8">A previous/current intern at {user_response.company} put me in contact with a recruiter.</option>
                        <option value="9">Other!</option>
                    </select>
                    <div class="input-group-append" style={selection_field_button}>
                        <button class="btn btn-outline-secondary" type="button">Next</button>
                    </div>
                </div>
                <div class="input-group mb-3 custom-field" style={secondary_input_field_and_button}>
                    <input id = "input_field_other" onChange = {handleChange} type="text" class="form-control" onClick = {handleStyleChange}  aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder="Other? due tell"/>
                    <div class="input-group-append">
                        <button type = "submit"  class="btn btn-outline-secondary">Next</button>
                    </div>
                </div>
{/*                 
			§ I applied online via <company>'s website and a recruiter contacted me.
			§ I applied online via my school's internship portal and company  recruiter contacted me.
			§ I attended a student career fair at my school and shared my resume with company .
			§ I attended a virtual event hosted by company and shared my resume.
			§ I reached out to a recruiter on LinkedIn and was considered for a role.
			§ A full-time worker company put me in contact with a recruiter.
			§ A previous/current intern at company put me in contact with a recruiter. */}
       
                
                
        
                
                
                </form>
                
                </div>
        </div>
    );
}

export default Intern_form;
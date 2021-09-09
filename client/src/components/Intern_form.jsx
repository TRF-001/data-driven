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
    
    const [regular_input_field, set_regular_input_field] = useState([]);
    // const [regular_input_field_button, set_regular_input_field_button] = useState([]);
    const [other_input_field_group, set_other_input_field_group] = useState({display:"none"});
    const [other_input_field_button, set_other_input_field_button] = useState({display:"none"});

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
            set_other_input_field_group({display:"flex"});
            set_other_input_field_button({display:"none"});
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
                }

                if (step === 2) {
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
                set_regular_input_field({visibility: "hidden"});
                set_regular_input_field_button({visibility: "hidden"});
                set_step(3);
                }

                // set_step(3);

                // set_step(3)
                // }
                // if (step === 3) {
                    
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
                    <input id = "input_field" onChange = {handleChange} type="text" class="form-control" style ={regular_input_field} onClick = {handleStyleChange}  aria-label="Recipient's username" aria-describedby="basic-addon2" required/>
                    <span id ="question" class="placeholder" onClick = {handleStyleChange} style = {placeholderStyle}>{question}</span>
                    <div style={regular_input_field} class="input-group-append">
                        <button type = "submit"  class="btn btn-outline-secondary" >Next</button>
                    </div>
                </div>
                    {/* <Input onChange = {handleChange} onClick = {handleStyleChange} pHolderStyle = {placeholderStyle} holder = "What's your first name?"/>
                    <button class="btn" type = "submit"   ><i class="fas fa-arrow-right"></i> </button> */}
                <div class="input-group custom-field">
                    <select onChange={show_other_input_field} className="custom-select" id="inputGroupSelect04" size="1">
                        <option selected>Select...</option>
                        <option value="1">I applied online on {user_response.company}'s website.</option>
                        <option value="2">I applied online via my school's internship portal.</option>
                        <option value="3">I attended a student career fair at my school and shared my resume with {user_response.company}.</option>
                        <option value="4">I attended a virtual event hosted by {user_response.company} and shared my resume.</option>
                        <option value="5">I reached out to a recruiter on LinkedIn and was considered for a role.</option>
                        <option value="6">I reached out to a hiring manger on LinkedIn and was considered for a role.</option>
                        <option value="7">A full-time worker at {user_response.company} put me in contact with a recruiter.</option>
                        <option value="8">A previous/current intern at {user_response.company} put me in contact with a recruiter.</option>
                        <option value="9">Other!</option>
                    </select>
                    <div class="input-group-append" style={other_input_field}>
                        <button class="btn btn-outline-secondary" type="button">Next</button>
                    </div>
                </div>
                <div class="input-group mb-3 custom-field" style={other_input_field_group}>
                    <input id = "input_field_other" onChange = {handleChange} type="text" class="form-control" style ={other_input_field} onClick = {handleStyleChange}  aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder="I'm curious!"/>
                    <div style={other_input_field_button} class="input-group-append">
                        <button type = "submit"  class="btn btn-outline-secondary" >Next</button>
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
Other: 
                
                
                
                
                MUST FIX THE NAMING OF THE REGULAR AND 'OTHER' INPUT FIELDS. I RECOMMEND STARTING FRESH AND FINDING MORE APPROPRIATE NAMES FOR THE FIELDS.
                
                
                </form>
                
                </div>
        </div>
    );
}

export default Intern_form;
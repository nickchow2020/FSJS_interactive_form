"use strict"
window.onload = ()=>{
    /**
     * Global Variable that needs through the Project*/
    const nameInput = document.getElementById("name"); //target on name input
    const emailInput = document.getElementById("mail");
    const creditCardInput = document.getElementById("cc-num");
    const zipInput = document.getElementById("zip");
    const cvvInput = document.getElementById("cvv")
    const otherTitle = document.getElementById("other-title");// target on other job rule input
    const jobRuleTitle = document.getElementById("title");// target on job rule select elements
    const themeSelect = document.getElementById("design");//target on theme select element
    const themeSelectFirstOption = themeSelect.firstElementChild;
    const colorSelect = document.getElementById("color");//target on theme color option element
    const colorOptions = colorSelect.children;// select all color select element's children
    const firstColorOption = colorSelect.firstElementChild;//select the first option under color select.
    const activitiesField = document.querySelector(".activities");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const paymentCredit = document.getElementById("credit-card");
    const paypal = document.getElementById("paypal");
    const bitcoin = document.getElementById("bitcoin");
    const paymentMethod = document.getElementById("payment");
    const form = document.querySelector("form");
    const colorDropDown = document.getElementById("colors-js-puns");




    /**
     * This is going to make the name input focus when the page is loads */
    nameInput.focus();

    /**
     * Hide the otherTitle input initially.*/
    otherTitle.style.display = "none";

    /**
     * Event handler on job rule,when user click on other option show job rule input*/
    jobRuleTitle.addEventListener("change",(e)=>{
        const option = e.target.value;
        if(option === "other"){
            otherTitle.style.display = "";
        }else{
            otherTitle.style.display = "none";
        }
    })

    /** 
     * Hide all color value in color select element*/
    for(let i =0; i < colorOptions.length;i ++){
        colorOptions[i].style.display = "none";
    }

    /** function that:
     *initial color select element value to "Please select a T-shirt theme"
     *argument "arr" is represent a color select tag at this points */
    function initColorSelectValue(arr){
        const optionInit = document.createElement("option");
        optionInit.textContent = "Please select a T-shirt theme";
        arr.insertBefore(optionInit,firstColorOption);
        optionInit.classList.add("initOption")
        optionInit.setAttribute("selected",true);
    }

    /** function that:
     * add the total cost headline as h3 tags and hide it
     * argument "arr" at this options is represent the activities field*/
    function addTotalCostHeadline (arr){
        const costH3 = document.createElement("h3");
        costH3.style.display = "none";
        costH3.classList.add("totalCost");
        arr.appendChild(costH3);
    }

    /** function that is going to make the conflicting checkbox disabled
     * argument "totalCheckboxes" refer to whole checkboxes in activities field
     * argument "index" refer to the conflicting checkbox index*/
    function disabledConflicting(totalCheckboxes,index){
        totalCheckboxes[index].setAttribute("disabled",true);
        totalCheckboxes[index].parentNode.style.color = "red";
        totalCheckboxes[index].parentNode.style.textDecoration = "line-through";
    }

    /** function that is going to make the conflicting checkbox enable
     * argument "totalCheckboxes" refer to whole checkboxes in activities field
     * argument "index" refer to the conflicting checkbox index*/
    function enableConflicting(totalCheckboxes,index){
        totalCheckboxes[index].removeAttribute("disabled");
        totalCheckboxes[index].parentNode.style.color = "";
        totalCheckboxes[index].parentNode.style.textDecoration = "";
    }

    /** function that is going to get the opposite index and call disabledConflicting function
     * argument "totalCheckboxes" refer to whole checkboxes in activities field
     * argument "targetInput" refer to the target checkbox*/
    function disabledConflictingActivites(totalCheckboxes,targetInput){
        for(let i = 0; i < totalCheckboxes.length; i ++){
            const targetDataAndTime = targetInput.getAttribute("data-day-and-time");
            const inputsDataAndTime = totalCheckboxes[i].getAttribute("data-day-and-time");
            if(targetDataAndTime === inputsDataAndTime){
                const targetName = targetInput.getAttribute("name")
                const matchesName = totalCheckboxes[i].getAttribute("name")
                if(targetName !== matchesName){
                    const index = i;
                    disabledConflicting(totalCheckboxes,index);
                }
            }
        }
    }
    /** function that is going to get the opposite index and call enableConflicting function
     * argument "totalCheckboxes" refer to whole checkboxes in activities field
     * argument "targetInput" refer to the target checkbox*/
    function enableConflictingActivites(totalCheckboxes,targetInput){
        for(let i = 0; i < totalCheckboxes.length; i ++){
            const targetDataAndTime = targetInput.getAttribute("data-day-and-time");
            const inputsDataAndTime = totalCheckboxes[i].getAttribute("data-day-and-time");
            if(targetDataAndTime === inputsDataAndTime){
                const targetName = targetInput.getAttribute("name")
                const matchesName = totalCheckboxes[i].getAttribute("name")
                if(targetName !== matchesName){
                    const index = i;
                    enableConflicting(totalCheckboxes,index);
                }
            }
        }
    }


    /** function that is going to display the vilidation message both true and false
     * argument "targetInput" refer to targeting input
     * argument "targetParent" refer to targeting input's parent
     * argument "previousErrorSpan" refer to error message span.
     * argument "trueOrFalseSpan" refter to true or false message.
     * argument "previousCorrectSpan" refer to correct message span*/

    function validateMessage(targetInput,previousCorrectSpan,targetParent,previousErrorSpan,trueOrFalseSpan,requiredSpan){
        if(previousCorrectSpan){
            targetParent.removeChild(previousCorrectSpan);
        }
        targetInput.insertAdjacentHTML("beforebegin",trueOrFalseSpan);
        if(previousErrorSpan){
            targetParent.removeChild(previousErrorSpan);
        }
        if(requiredSpan){
            targetParent.removeChild(requiredSpan);
            targetInput.style.border = "none";
        }
    }

   /**Funtions:
     * gong to validating all the form input value call function "insertError" and function "validateCheckbox"
     * this function call to making sure if the input is having correct format and value*/
    function validateWholeForm(remainder){
        const correctName = document.querySelector(".error-name");
        const nameParent = document.getElementById("nameWrap");
        if(correctName){
            nameParent.removeChild(correctName);
        }
    insertError(remainder);
    validateCheckbox(activitiesField);
}

/** Function:
 *  going to insert the required error message when the input value is missing
 *  argument "remainder" refer to the input that is remain after select paypal and bitcoin
 *  add required message*/
function insertError(remainder){
    const allTextInput = document.querySelectorAll(".inputText")
    for(let i = 0; i < (allTextInput.length) - remainder; i ++){
        if(allTextInput[i].value === ""){
            const inputParent = allTextInput[i].parentNode;
            const requires = inputParent.querySelector(".required");
            const required = `<span class="required">* required</span>`;
            if(requires){
                inputParent.removeChild(requires);
            }
            allTextInput[i].style.border = "solid red 2px";
            allTextInput[i].insertAdjacentHTML("beforebegin",required);
        }
    }
}
/**Function:
 * check the activities section's checkbox is being check
 * if the check is missing add error message*/
function validateCheckbox(arr){
    window.check = [];
    for(let i = 0; i < checkboxes.length; i ++){
        if(checkboxes[i].checked){
            check.push(checkboxes[i])
        }
    }
    if(check.length === 0){
        arr.classList.add("activities-error")
    }else{
        arr.classList.remove("activities-error")
    }
}

    /**
     * Validating Function for each Input*/
    function validateName(arr){
        const nameRegExp = /^[a-zA-Z]+\s[a-zA-z]+$/;
        return nameRegExp.test(arr);
    }


    function validateEmail(arr){
        const emailRegExp = /^[^@]+@[^@.]+\.[a-zA-Z]+$/;
        return emailRegExp.test(arr);
    }

    function validateCardNumber(arr){
        const numberRegExp = /^\d{13,16}$/;
        return numberRegExp.test(arr);
    }

    function validateZip(arr){
        const numberRegExp = /^\d{5}$/;
        return numberRegExp.test(arr);
    }

    function validateCvv(arr){
        const numberRegExp = /^\d{3}$/;
        return numberRegExp.test(arr);
    }



    initColorSelectValue(colorSelect); // call function initColorSelectValue
    themeSelectFirstOption.style.display = "none";// hide "select theme" on color theme.
    colorDropDown.style.display = "none"; // hide color dropdowm menu

    /**
     * Event handler that is going to handle the T-shirt dropDown menu*/
    themeSelect.addEventListener("change",(e)=>{
        const changeValue = e.target.value;
        colorDropDown.style.display = "block"; // show color dropdown menu;
        if(changeValue === "js puns"){ //when user select color theme "js puns"
         for(let i =0;i < colorOptions.length;i++){
             if(i < 4 && i > 0){// show the first third options
                colorOptions[i].style.display= "";// show index 0-2 options
                colorOptions[0].setAttribute("selected",true);//add attribute "selected" to 0 index option
             }else{
                colorOptions[i].style.display= "none";// hide 3-5 indexes options
             }
         }
        }else if(changeValue === "heart js"){ // when user select color theme "heart js"
            for(let i =0;i < colorOptions.length;i++){
                if(i < 7 && i > 3){//show last three options
                   colorOptions[i].style.display= "";//show 3-5 indexes options
                }else{
                   colorOptions[i].style.display= "none"; // hide 0-2 index options
                }
            }
        }
    })

    addTotalCostHeadline(activitiesField)//called addTotalCostHeadline function

    /**
     * Event handler with Activities features*/
    let totalCost = [ ]; // inital total cost to empty arrsy

    /**listen for changes at activities field */
    activitiesField.addEventListener("change",(e)=>{
        
        const inputTarget = e.target;  // store target checkbox
        if(inputTarget.checked){// if checkbox checked
            const dateCost = inputTarget.getAttribute("data-cost");//get checked input's "data-cost" attribute value
                 totalCost.push(parseInt(dateCost));// convert the value to number and push it to "totalCost" empty array
        }else{
            totalCost.pop(); // when checkbox uncheck,take out the last "data-cost" value.
        }

        window.cost = totalCost.reduce((accumulator,currentValue)=> accumulator + currentValue,0); // add all the value in "totalCost" use reduce method() and set it value to global.

        const displayCost =  activitiesField.querySelector(".totalCost"); // select and store "totalCost" h3 tag
        if(cost !== 0){ // when "cost" more than 0;
            displayCost.style.display = "block"; //show "total" h3 tag
            displayCost.innerHTML = `Total: $${cost}`; // display it's "totalcost" value;
        }else{
            displayCost.style.display = "none"; // if "cost" is 0,hide "totalCost" he tag
        }
        
       if(inputTarget.checked){ //when check on checkboxes
        disabledConflictingActivites(checkboxes,inputTarget)// call disabledConflictingActivites function
        }else{//when uncheck
        enableConflictingActivites(checkboxes,inputTarget);//call enableConflictingActivites funcion
        }

        validateCheckbox(activitiesField); //Call validateCheckbox function
    })

    /**
     * Hide Paypal Payment and Bitcoin Payment
     */
    paypal.style.display = "none";
    bitcoin.style.display = "none";

    /**
     * hide "select payment method"
     */
    const firstOption = paymentMethod.firstElementChild;
    firstOption.style.display = "none";
    
    /** select credit option and set credit card payment is default*/
    const creditOption = firstOption.nextElementSibling;
    creditOption.setAttribute("selected",true);

    /**
     * Eventhandler with payment method;
     * tohide paypal and bitcoin;
     */
    paymentMethod.addEventListener("change",(e)=>{
        const paymentValue = e.target.value;
        if(paymentValue === "credit card"){
            paymentCredit.style.display = "block";
            paypal.style.display = "none";
            bitcoin.style.display = "none";
        }else if(paymentValue === "paypal"){
            paymentCredit.style.display = "none";
            bitcoin.style.display = "none";
            paypal.style.display = "block";
        }else{
            paymentCredit.style.display = "none";
            bitcoin.style.display = "block";
            paypal.style.display = "none";
        }
    })

    /**
     * name Input validation event handler to check the user input
    */
    nameInput.addEventListener("input",(e)=>{
        const inputValue = e.target.value; // target on input value
        const correntInput = `<span class="correct-name true">&#10003;&nbspgood to go</span>`;// correct Message
        const errorInput = `<span class="error-name">&#x2718;&nbspname should contain [first last]</span>`;// error message
        const spanParent = e.target.parentNode; //name input's parent
        const previousCorrectSpan = spanParent.querySelector(".correct-name");//select correct message sapn
        const previousErrorSpan = spanParent.querySelector(".error-name");//select error message span
        const required = spanParent.querySelector(".required")//select required message span
        if(validateName(inputValue)){   // if user input value is true
            validateMessage(nameInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required);// call validateMessage function and input a correct message
        }else{
            validateMessage(nameInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)// call validateMessage function and input a error message
        }
    })

    /**
     * email Input event listener to check the user email input
     */
    emailInput.addEventListener("input",(e)=>{
        const inputValue = e.target.value;// target on input value
        const correntInput = `<span class="correct-email true">&#10003;&nbspgood to go</span>`;// correct Message
        const errorInput = `<span class="error-email">&#x2718;&nbspemail should format as [..@.com or ..@.something]</span>`;// error message
        const spanParent = e.target.parentNode;//email input's parent
        const previousCorrectSpan = spanParent.querySelector(".correct-email");//select correct message sapn
        const previousErrorSpan = spanParent.querySelector(".error-email");//select error message span
        const required = spanParent.querySelector(".required")//select required message span
        if(validateEmail(inputValue)){   // if user input value is true
            validateMessage(emailInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)// call validateMessage function and input a correct message
        }else{
            validateMessage(emailInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)// call validateMessage function and input a error message
        }
    })

    /**
     * creditCard Input event listener to check the user email input
     */
    creditCardInput.addEventListener("input",(e)=>{
        const inputValue = e.target.value;// target on input value
        const correntInput = `<span class="correct-num true">&#10003;&nbspgood to go</span>`;// correct Message
        const errorInput = `<span class="error-num">&#x2718;&nbspshould has 13 or 16 digit number</span>`;// error message
        const spanParent = e.target.parentNode;//creditCard input's parent
        const previousCorrectSpan = spanParent.querySelector(".correct-num");//select correct message sapn
        const previousErrorSpan = spanParent.querySelector(".error-num");//select error message span
        const required = spanParent.querySelector(".required")//select required message span
        if(validateCardNumber(inputValue)){   // if user input value is true 
            validateMessage(creditCardInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)// call validateMessage function and input a correct message
        }else{
            validateMessage(creditCardInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)// call validateMessage function and input a error message
        }
    })
    /**
     * creditCard zipcode Input event listener to check the user email input
     */
    zipInput.addEventListener("input",(e)=>{
        const inputValue = e.target.value;// target on input value
        const correntInput = `<span class="correct-zip true">&#10003;&nbspgood to go</span>`;// correct Message
        const errorInput = `<span class="error-zip">&#x2718;&nbsp5 digit zipcode</span>`;// error message
        const spanParent = e.target.parentNode;//creditCard zipcode input's parent
        const previousCorrectSpan = spanParent.querySelector(".correct-zip");;//select correct message sapn
        const previousErrorSpan = spanParent.querySelector(".error-zip");//select error message span
        const required = spanParent.querySelector(".required")//select required message span
        if(validateZip(inputValue)){   // if user input value is true 
            validateMessage(zipInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)// call validateMessage function and input a correct message
        }else{
            validateMessage(zipInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)// call validateMessage function and input a error message
        }
    })
    /**
     * creditCard cvv Input event listener to check the user email input
     */
    cvvInput.addEventListener("input",(e)=>{
        const inputValue = e.target.value;// target on input value
        const correntInput = `<span class="correct-cvv true">&#10003;&nbspgood to go</span>`;// correct Message
        const errorInput = `<span class="error-cvv">&#x2718;&nbsp3 digit cvv</span>`;// error message
        const spanParent = e.target.parentNode;//creditCard zipcode input's parent
        const previousCorrectSpan = spanParent.querySelector(".correct-cvv");//select correct message sapn
        const previousErrorSpan = spanParent.querySelector(".error-cvv");//select error message span
        const required = spanParent.querySelector(".required")//select required message span
        if(validateCvv(inputValue)){   // if user input value is true 
            validateMessage(cvvInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)// call validateMessage function and input a correct message
        }else{
            validateMessage(cvvInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)// call validateMessage function and input a error message
        }
    })


    /**
     * form submit event's when click submit btn.
     */
    form.addEventListener("submit",(e)=>{
        if(paypal.style.display === "none" && bitcoin.style.display === "none"){
            validateWholeForm(0); // call validateWholeFrom to check each input value;
            const correntInputs = document.querySelectorAll(".true");// collect class true;
            if(correntInputs.length !== 5 || check.length === 0){
                e.preventDefault();// if statement to check if all 5 text input is fill in valid value,if yes submit the form,if not stop the form submmission
            }
        }else if(paymentCredit.style.display === "none"){
            validateWholeForm(3);//if statement to check if all 2 text input(without credit card payment section) is fill in valid value,if yes submit the form,if not stop the form submmission
            const correntInputs = document.querySelectorAll(".true");// collect class true;
            if(correntInputs.length !== 2 || check.length === 0){
                e.preventDefault();
            }
        }else{
            console.log("Say Hi to reviewer")
        }
    })

 



    





































}
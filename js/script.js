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
    const fieldset = document.querySelector("fieldset");




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
     * going to remove the option that display "Please select a T-shirt theme"
     */
    function removeiniOption(){
        const initOption = colorSelect.querySelector(".initOption")
        if(initOption){
            colorSelect.removeChild(initOption);
        }
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



    initColorSelectValue(colorSelect); // call function initColorSelectValue
    themeSelectFirstOption.style.display = "none";// hide "select theme" on color theme.

    /**
     * Event handler that is going to handle the T-shirt dropDown menu*/
    themeSelect.addEventListener("change",(e)=>{
        const changeValue = e.target.value;
        removeiniOption();
        if(changeValue === "js puns"){ //when user select color theme "js puns"
         for(let i =0;i < colorOptions.length;i++){
             if(i < 3){// show the first third options
                colorOptions[3].removeAttribute("selected"); //remove the selected attributes from  user select "heart js"
                colorOptions[i].style.display= "";// show index 0-2 options
                colorOptions[0].setAttribute("selected",true);//add attribute "selected" to 0 index option
             }else{
                colorOptions[i].style.display= "none";// hide 3-5 indexes options
             }
         }
        }else if(changeValue === "heart js"){ // when user select color theme "heart js"
            for(let i =0;i < colorOptions.length;i++){
                if(i < 6 && i > 2){//show last three options
                    colorOptions[0].removeAttribute("selected");//remove the selected attributes from  user select "js puns"
                   colorOptions[i].style.display= "";//show 3-5 indexes options
                   colorOptions[3].setAttribute("selected",true);// add attribute "selected" to 3 index option
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

        validateCheckbox(activitiesField);
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
    /**
     * Eventhandler with payment method;
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
        const numberRegExp = /^\d{16}$/;
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


    nameInput.addEventListener("blur",(e)=>{
        const inputValue = e.target.value;
        const correntInput = `<span class="correct-name">&#10003;&nbspgood to go</span>`;
        const errorInput = `<span class="error-name">&#x2718;&nbspname should contain [first last]</span>`;
        const spanParent = e.target.parentNode;
        const previousCorrectSpan = spanParent.querySelector(".correct-name");
        const previousErrorSpan = spanParent.querySelector(".error-name");
        const required = spanParent.querySelector(".required")
        if(validateName(inputValue)){   
            validateMessage(nameInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required);
        }else{
            validateMessage(nameInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)
        }
    })

    emailInput.addEventListener("blur",(e)=>{
        const inputValue = e.target.value;
        const correntInput = `<span class="correct-email">&#10003;&nbspgood to go</span>`;
        const errorInput = `<span class="error-email">&#x2718;&nbspemail should format as [..@.com or ..@.something]</span>`;
        const spanParent = e.target.parentNode;
        const previousCorrectSpan = spanParent.querySelector(".correct-email");
        const previousErrorSpan = spanParent.querySelector(".error-email");
        const required = spanParent.querySelector(".required")
        if(validateEmail(inputValue)){   
            validateMessage(emailInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)
        }else{
            validateMessage(emailInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)
        }
    })


    creditCardInput.addEventListener("blur",(e)=>{
        const inputValue = e.target.value;
        const correntInput = `<span class="correct-num">&#10003;&nbspgood to go</span>`;
        const errorInput = `<span class="error-num">&#x2718;&nbspshould has 16 digit number</span>`;
        const spanParent = e.target.parentNode;
        const previousCorrectSpan = spanParent.querySelector(".correct-num");
        const previousErrorSpan = spanParent.querySelector(".error-num");
        const required = spanParent.querySelector(".required")
        if(validateCardNumber(inputValue)){   
            validateMessage(creditCardInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)
        }else{
            validateMessage(creditCardInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)
        }
    })

    zipInput.addEventListener("blur",(e)=>{
        const inputValue = e.target.value;
        const correntInput = `<span class="correct-zip">&#10003;&nbspgood to go</span>`;
        const errorInput = `<span class="error-zip">&#x2718;&nbsp5 digit zipcode</span>`;
        const spanParent = e.target.parentNode;
        const previousCorrectSpan = spanParent.querySelector(".correct-zip");
        const previousErrorSpan = spanParent.querySelector(".error-zip");
        const required = spanParent.querySelector(".required")
        if(validateZip(inputValue)){   
            validateMessage(zipInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)
        }else{
            validateMessage(zipInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)
        }
    })

    cvvInput.addEventListener("blur",(e)=>{
        const inputValue = e.target.value;
        const correntInput = `<span class="correct-cvv">&#10003;&nbspgood to go</span>`;
        const errorInput = `<span class="error-cvv">&#x2718;&nbsp3 digit cvv</span>`;
        const spanParent = e.target.parentNode;
        const previousCorrectSpan = spanParent.querySelector(".correct-cvv");
        const previousErrorSpan = spanParent.querySelector(".error-cvv");
        const required = spanParent.querySelector(".required")
        if(validateCvv(inputValue)){   
            validateMessage(cvvInput,previousCorrectSpan,spanParent,previousErrorSpan,correntInput,required)
        }else{
            validateMessage(cvvInput,previousCorrectSpan,spanParent,previousErrorSpan,errorInput,required)
        }
    })


    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        validateWholeForm();
    })


    function validateWholeForm(){
        if(nameInput.value === "" || emailInput === "" || creditCardInput === "" || zipInput === "" || cvvInput === ""){
            const correctName = document.querySelector(".error-name");
            const nameParent = document.getElementById("nameWrap");
            if(correctName){
                nameParent.removeChild(correctName);
            }
            
            insertError(nameInput);
            insertError(emailInput);
            insertError(creditCardInput);
            insertError(zipInput);
            insertError(cvvInput);

            validateCheckbox(activitiesField);
        }
        
    }

    function insertError(arr){
        const inputParent = arr.parentNode;
        const requires = inputParent.querySelector(".required");
        if(requires){
            inputParent.removeChild(requires);
        }
        const required = `<span class="required">* required</span>`;
        arr.style.border = "solid red 2px";
        arr.insertAdjacentHTML("beforebegin",required);
    }

    function validateCheckbox(arr){
        let check = [];
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



    





































}
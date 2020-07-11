"use strict"
window.onload = ()=>{
    /**
     * Global Variable that needs through the Project*/
    const nameInput = document.getElementById("name"); //target on name input
    const otherTitle = document.getElementById("other-title");// target on other job rule input
    const jobRuleTitle = document.getElementById("title");// target on job rule select elements
    const themeSelect = document.getElementById("design");//target on theme select element
    const colorSelect = document.getElementById("color");//target on theme color option element
    const colorOptions = colorSelect.children;// select all color select element's children
    const firstColorOption = colorSelect.firstElementChild;//select the first option under color select.
    const activitiesField = document.querySelector(".activities");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');



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

    /**
     *initial color select element value to "Please select a T-shirt theme"*/
    const optionInit = document.createElement("option");
    optionInit.textContent = "Please select a T-shirt theme";
    optionInit.classList.add("initOption")
    colorSelect.value = "inherit";

    colorSelect.insertBefore(optionInit,firstColorOption);

    /**
     * Event handler that is going to handle the T-shirt dropDown menu*/
    themeSelect.addEventListener("change",(e)=>{
        const changeValue = e.target.value;
        const initOption = colorSelect.querySelector(".initOption")
        if(initOption){
            colorSelect.removeChild(initOption);
        }
        if(changeValue === "js puns"){
         for(let i =0;i < colorOptions.length;i++){
             if(i < 3){
                colorOptions[3].removeAttribute("selected");
                colorOptions[i].style.display= "";
                colorOptions[0].setAttribute("selected",true);
             }else{
                colorOptions[i].style.display= "none";
             }
         }
        }else if(changeValue === "heart js"){
            for(let i =0;i < colorOptions.length;i++){
                if(i < 6 && i > 2){
                    colorOptions[0].removeAttribute("selected");
                   colorOptions[i].style.display= "";
                   colorOptions[3].setAttribute("selected",true);
                }else{
                   colorOptions[i].style.display= "none";
                }
            }
        }else{
            for(let i =0; i < colorOptions.length;i ++){
                colorOptions[i].style.display = "none";
                colorSelect.insertBefore(optionInit,firstColorOption);
            }
        }
    })

    /**
     * Add a total cose element and append it to activities*/
    const costH3 = document.createElement("h3");
    costH3.style.display = "none";
    costH3.classList.add("totalCost");
    activitiesField.appendChild(costH3);


    /**
     * Event handler with Activities features*/
    let totalCost = [ ]; // inital total cost to empty arrsy
    activitiesField.addEventListener("change",(e)=>{
        
        const inputTarget = e.target;
        if(inputTarget.checked){
            const dateCost = inputTarget.getAttribute("data-cost");
                 totalCost.push(parseInt(dateCost));
        }else{
            totalCost.pop();
        }

        const cost = totalCost.reduce((accumulator,currentValue)=> accumulator + currentValue,0);
        const displayCost =  activitiesField.querySelector(".totalCost");
        if(cost !== 0){
            displayCost.style.display = "block";
            displayCost.innerHTML = `Total: $${cost}`;
        }else{
            displayCost.style.display = "none";
        }

        
            if(inputTarget.checked){
                for(let i = 0; i < checkboxes.length; i ++){
                const targetDataAndTime = inputTarget.getAttribute("data-day-and-time");
                const inputsDataAndTime = checkboxes[i].getAttribute("data-day-and-time");
                if(targetDataAndTime === inputsDataAndTime){
                    const targetName = inputTarget.getAttribute("name")
                    const matchesName = checkboxes[i].getAttribute("name")
                    if(targetName !== matchesName){
                        checkboxes[i].setAttribute("disabled",true);
                        checkboxes[i].parentNode.style.color = "red";
                        checkboxes[i].parentNode.style.textDecoration = "line-through";
                    }
                }
              }
            }else{
                for(let i = 0; i < checkboxes.length; i ++){
                    const targetDataAndTime = inputTarget.getAttribute("data-day-and-time");
                    const inputsDataAndTime = checkboxes[i].getAttribute("data-day-and-time");
                    if(targetDataAndTime === inputsDataAndTime){
                        const targetName = inputTarget.getAttribute("name")
                        const matchesName = checkboxes[i].getAttribute("name")
                        if(targetName !== matchesName){
                            checkboxes[i].removeAttribute("disabled");
                            checkboxes[i].parentNode.style.color = "";
                            checkboxes[i].parentNode.style.textDecoration = "";
                        }
                    }
                  }
            }
    })



































}
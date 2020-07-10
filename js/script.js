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
                colorOptions[i].style.display= "";
                colorOptions[0].setAttribute("selected","");
             }else{
                colorOptions[i].style.display= "none";
             }
         }
        }else if(changeValue === "heart js"){
            for(let i =0;i < colorOptions.length;i++){
                if(i < 6 && i > 2){
                   colorOptions[i].style.display= "";
                   colorOptions[3].setAttribute("selected","");
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


































}
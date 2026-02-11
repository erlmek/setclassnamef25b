const elname = document.getElementById("elementName");
const pbSetClassName = document.getElementById("pbSetStyle");
const inpStyleName = document.getElementById("styleName");

function setclassname(){
    const el = elname.value;
    console.log(el);
    const htmlel = document.querySelector("." + el);
    console.log(htmlel);
    const stname = inpStyleName.value;
    console.log(stname);
    //htmlel.className = stname;  className er en string. hvis tildeles array, så laves array om til string
    const orgname = el;
    htmlel.className=""
    htmlel.classList.add(orgname)
    htmlel.classList.add(stname)
}

pbSetClassName.addEventListener("click", setclassname)

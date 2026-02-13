const inpElementName = document.getElementById("inpElementName");
const pbSetClassName = document.getElementById("pbSetStyle");
const inpStyleName = document.getElementById("inpStyleName");
const pbSetTagStyle = document.getElementById("pbSetTagStyle");
const ddAvailableStyles = document.getElementById("ddAvailableStyles");
const pbTestFill = document.getElementById("pbTestFill");

function setClassName(){
    const orgElementName = inpElementName.value;
    const htmlel = document.querySelector("." + orgElementName);
    //htmlel.className = stname;  className er en string. hvis tildeles array, så laves array om til string
    htmlel.className=""; //fjern alt fra styles
    htmlel.classList.add(orgElementName) //sæt navnet på inputfeltet tilbage
    htmlel.classList.add(inpStyleName.value) //sæt den nye style indtastet
}

function setTagStyle() {
    const tagName = inpElementName.value; //indeholder et tag name, feks 'input' eller 'p'.
    const tags = document.getElementsByTagName(tagName);
    const tagArr = Array.from(tags);
    tagArr.forEach(elm => elm.className = inpStyleName.value)
}

function setTagStyleDropDown() {
    const tagName = inpElementName.value;
    const tags = document.getElementsByTagName(tagName);
    const tagArr = Array.from(tags);
    tagArr.forEach(elm => elm.className = ddAvailableStyles.value)
}

function fillAvailableStylesTest() {
    const styleList = document.styleSheets;
    console.log(styleList);
    for (let sheet of styleList) {
        console.log(sheet)
    }
}

function fillAvailableStyles() {
    const styles = new Set();

    // Loop through all stylesheets
    for (let sheet of document.styleSheets) {
        try {
            // Loop through all CSS rules in the stylesheet
            for (let rule of sheet.cssRules || sheet.rules) {
                if (rule.selectorText) {
                    // Extract class names from selectors
                    const matches = rule.selectorText.match(/\.([\w-]+)/g);
                    if (matches) {
                        matches.forEach(match => {
                            // Remove the dot and add to set
                            const className = match.substring(1);
                            // Only add classes that don't contain pseudo-elements/states
                            if (!className.includes(':')) {
                                styles.add(className);
                            }
                        });
                    }
                }
            }
        } catch (e) {
            // Skip stylesheets that can't be accessed (CORS issues)
            console.warn("Cannot access stylesheet:", sheet.href);
        }
    }

    const dropdown = document.getElementById("ddAvailableStyles");

    // Convert Set to sorted array and populate dropdown
    Array.from(styles).sort().forEach(style => {
        const option = document.createElement("option");
        option.addEventListener("focusin", setTagStyleDropDown); //virker ikke, har også prøvet andre
        option.value = style;
        option.textContent = style;
        dropdown.appendChild(option);
    });
}


pbSetClassName.addEventListener("click", setClassName)
pbSetTagStyle.addEventListener("click", setTagStyle)
ddAvailableStyles.addEventListener("change", setTagStyleDropDown)
pbTestFill.addEventListener("click", fillAvailableStylesTest)


//Har prøvet at fange event når man scroller ned igennem elementer i dropdown. Ikke lykkes.
//ddAvailableStyles.addEventListener("input", setTagStyleDropDown)
//ddAvailableStyles.addEventListener("focus", setTagStyleDropDown)
//ddAvailableStyles.addEventListener("blur", setTagStyleDropDown)
//ddAvailableStyles.addEventListener("mouseup", setTagStyleDropDown)
//document.addEventListener("keyup", setTagStyleDropDown)
//ddAvailableStyles.addEventListener("focusin", setTagStyleDropDown)

fillAvailableStyles()
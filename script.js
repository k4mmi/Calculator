// MORE BTN /////////////////////////////////////////////////////////
// Open more buttons

//For chacking if is more it opened
let moreBtnActive = false

// Function for btn
function moreBtn() {
    if (moreBtnActive === true){
        document.getElementById("calculatorAdditional").style.display = "none"

        // Change image of btn
        document.getElementById("moreBtnImage").src = "images/icons/more-closed.svg"

        // Mark that is it closed
        return moreBtnActive = false
    } else {
        document.getElementById("calculatorAdditional").style.display = "block"

        // Change image of btn
        document.getElementById("moreBtnImage").src = "images/icons/more-opened.svg"
        
        // Mark that is it closed
        return moreBtnActive = true
    }
}

// BTNs /////////////////////////////////////////////////////////

// user imput to be caunted, default is empty string
let count = ""

// Function for show result on display
function result() {
    try {
        if (count == "") {
            document.getElementById("input").innerHTML = ""
        } else if (eval(count) == Infinity || eval(count) == undefined ) {

            // clear mistake
            clearAll()
            document.getElementById("input").innerHTML = ""

            // display error
            document.getElementById("output").innerHTML = "Error"
        } else {
            let finalResult = Math.round(eval(count) * 100)/100    

            // Show on calculator display
            document.getElementById("output").innerHTML = editText(String(finalResult))
            document.getElementById("input").innerHTML = editText(count)

            // Final result to 
            return count = finalResult
        }
    } catch {

        // clear mistake
        clearAll()
        document.getElementById("input").innerHTML = ""

        // display error
        document.getElementById("output").innerHTML = "Error"
    }
}

// Clear display - AC btn

function clearAll() {
    count = ""
    document.getElementById("output").innerHTML = ""  
    document.getElementById("input").innerHTML = "" 
    bracketStatus = null
    return count
}

// Just backspace

function del() {
    return count = count.substring(0, count.length - 1), inputDisplay(count)
}

// Choose correct brackets

let bracketStatus = null

function brackets() {
    if (bracketStatus == null || bracketStatus == "closed") {
        return counting("("), bracketStatus = "opened"
    } else {
        return counting(")"), bracketStatus = "closed"
    }
}

// COUNTING /////////////////////////////////////////////////////////

function counting(input) {

    // Input to string
    input = String(input)

    // Filter
    input = input.replace(/piReplace/g, "3.14")
    
    // Add symbol
    return count = (count + String(input)), inputDisplay(count)
}

// DISPLAY /////////////////////////////////////////////////////////

function inputDisplay(countDisplay) {
    document.getElementById("output").innerHTML = editText(countDisplay)
}

// TEXT STYLE EDIT /////////////////////////////////////////////////////////

// Editing displayed text, for example this changing "*" to "×" (it's look more usesr friendly)
function editText(edit) {
    edit = edit.replace(/\*/g, "×");
    edit = edit.replace(/\//g, "÷");
    edit = edit.replace(/\./g, ",");
    return edit
}

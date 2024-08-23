// Version
let version = "v0.4.0-alpha"

// Version display in about
document.getElementById("about-version").innerHTML = "Verze aplikace: " + version

// Info
document.getElementById("info").innerHTML = "This is alpha version, do not trust the results.<br>" + version

// MORE BTN /////////////////////////////////////////////////////////

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

// MENU POPUP /////////////////////////////////////////////////////////
let menuPopupActive = false

function menu(){
    if (menuPopupActive === true){
        document.getElementById("menu").style.display = "none"
        
        // Mark that is it closed
        return menuPopupActive = false
    } else {
        document.getElementById("menu").style.display = "block"
        
        // Mark that is it closed
        return menuPopupActive = true
    }
}

// Open window
function bluredWindow(){
    document.getElementById("window").style.display = "block"
}

// Open settings
function settings(){
    document.getElementById("settings").style.display = "block"
}

// Open about
function about(){
    document.getElementById("about").style.display = "block"
}

// Close window
function closeWindow() {
    document.getElementById("about").style.display = "none"
    document.getElementById("settings").style.display = "none"
    document.getElementById("window").style.display = "none"
}

// BTNs /////////////////////////////////////////////////////////
// user imput to be caunted, default is empty string
let count = ""

// Function for show result on display
function result() {
    try {
        // Filter
        count = count.replace(/%/g, "/100");
        count = count.replace(/π/g, Math.PI);
        
        //Error checking
        if (count == "") {
            document.getElementById("input").innerHTML = ""
        } else if (eval(count) == Infinity || eval(count) == undefined) {
            
            // Clear mistake
            clearAll()
            document.getElementById("input").innerHTML = ""
            
            // Display error
            document.getElementById("output").innerHTML = "Error"
        } else {
            console.log(count)
            let finalResult = Math.round(eval(count) * 100)/100    
            
            // Show on calculator display
            document.getElementById("output").innerHTML = editText(String(finalResult))
            document.getElementById("input").innerHTML = editText(count)
            document.getElementById("output").style.fontSize = "62px"
            
            // Final result to 
            return count = String(finalResult)
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
    return count, fontSizeChanger()
}

// Just delete

function del() {
    // Hide user's input from display (id="input" in index.html)
    document.getElementById("input").innerHTML = editText("")

    // Just delete
    return count = count.substring(0, count.length - 1), fontSizeChanger(), inputDisplay(count)
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

function factorial() {

}
// COUNTING /////////////////////////////////////////////////////////

function counting(input) {
    input = String(input)
    
    // Filter
    // input = input.replace(/piReplace/g, "3.14")
    
    // Add symbol, 
    return count = (count + String(input)), inputDisplay(count),fontSizeChanger(), document.getElementById("input").innerHTML = "", eE() 
}

// Fix double signs. If user try new sign, a last one will be replaced the new one
function signFix() {
    // Save user sign input, because both signs will be deleted. saveLase gonna recover user output after deletion
    let saveLast = count.slice(-1)

    // Take last user input before this new one
    let input = count.slice(-2)
    input = input.substring(0, input.length - 1)
    
    // Checker
    if (input == "*" || input == "-" || input == "+" || input == "/" || input == ".") {
        // Delete both 
        delFunction(2)
        
        // Recover deleted new user input (yes, ik this is bad solution, but... it't somehow workin', so...)
        return count = (count + String(saveLast)), inputDisplay(count)
    } else {}
}

// DISPLAY /////////////////////////////////////////////////////////

function inputDisplay(countDisplay) {
    document.getElementById("output").innerHTML = editText(countDisplay)
}

// TEXT STYLE EDIT /////////////////////////////////////////////////////////

// Editing displayed text, for example this changing "*" to "×" (it's look more user friendly)
function editText(edit) {
    // Filter
    edit = edit.replace(/tan/g, "tang");
    edit = edit.replace(/Math./g, "");
    edit = edit.replace(/\*/g, "×");
    edit = edit.replace(/\//g, "÷");
    edit = edit.replace(/\./g, ",");
    return edit
}

// FONT SIZE CHANGING /////////////////////////////////////////////////////////

function fontSizeChanger() {
    if (count.length <= 7) {
        document.getElementById("output").style.fontSize = "82px"
    } else if (count.length == 8) {
        document.getElementById("output").style.fontSize = "70px"
    } else if (count.length == 9) {
        document.getElementById("output").style.fontSize = "62px"
    } else if (count.length == 10) {
        document.getElementById("output").style.fontSize = "56px"
    } else if (count.length == 11) {
        document.getElementById("output").style.fontSize = "52px"
    } else if (count.length == 12) {
        document.getElementById("output").style.fontSize = "47px"
    } else if (count.length == 13) {
        document.getElementById("output").style.fontSize = "45px"
    } else if (count.length == 14) {
        document.getElementById("output").style.fontSize = "42px"
    } else {
        console.log("if u read this, dont add more numbers, signs... pls, ty")
        // ik weird function
    }
}

// KEY LISTENER /////////////////////////////////////////////////////////

// Set key variable
let key

// Key listen
document.addEventListener("keydown", function(event){key = event.key; keyInput()})

// Keys run functions
function keyInput() {
    // console.log(key)

    if ((key >= 0 && key != " ") || key == "%") {counting(key)}
    else if(key == "/" || key == "*" || key == "-" || key == "+" || key == "," || key == ".") {counting(key); signFix()}
    else if(key == "Enter" || key == "=") {result()}
    else if(key == "s") {counting('Math.sin(')}
    else if(key == "c") {counting('Math.cos(')}
    else if(key == "t") {counting('Math.tan(')}
    else if(key == ")") {brackets()}
    else if(key == "(") {brackets()}
    else if(key == "Delete") {clearAll()}
    else if(key == "Backspace"){del()}
    else if(key == "Escape"){closeWindow()}
    else if(key == " ") {moreBtn()}
    else if(key == "p") {counting('π')}
    else {}
}

// OTHER /////////////////////////////////////////////////////////

// Delete, set mean how many last symbols will be deleted, default is 1
function delFunction(set = 1) {
    return count = count.substring(0, count.length - set), inputDisplay(count)
}

// Ignore pls, just easter egg
function eE(){
    if (count == "0.0") {
        console.log("%caaaaaaaaaaaaaaaaa, my code is f**kin' broken, I'm not dev, I'm grafic designer, why I code this? f*ck", "color: #f0f")
    } else {}
}

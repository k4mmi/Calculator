// Version
let version

// version = "unknown version"
version = "v0.5.2-alpha"

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
        count = count.replace(/π/g, "Math.PI");
        count = count.replace(/\$/g, "Math.sin(");
        count = count.replace(/\€/g, "Math.cos(");
        count = count.replace(/\&/g, "Math.tan(");
        count = count.replace(/\@/g, "cotg(");

        // console.log(count)
        
        //Error checking
        if (count == "") {
            document.getElementById("input").innerHTML = ""
        } else if (eval(count) == Infinity || eval(count) == undefined) {
            
            // Clear mistake
            clearAll()
            document.getElementById("input").innerHTML = ""
            
            // Reset font size
            resetFontSize()

            // Display error
            document.getElementById("output").innerHTML = "Error"
        } else {
            // console.log(count)
            let finalResult = Math.round(eval(count) * 100)/100    
            
            // Show on calculator display
            document.getElementById("output").innerHTML = editText(String(finalResult))
            document.getElementById("input").innerHTML = editText(count)
            
            // Final result to 
            return count = String(finalResult), fontSizeChanger(count), console.log(count.length)
        }
    } catch {
        
        // clear mistake
        clearAll()
        document.getElementById("input").innerHTML = ""

        // Reset font size
        resetFontSize()
        
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
    return count, fontSizeChanger(count)
}

// Just delete

function del() {
    // Hide user's input from display (id="input" in index.html)
    document.getElementById("input").innerHTML = editText("")

    // Just delete
    return count = count.substring(0, count.length - 1), fontSizeChanger(count), inputDisplay(count)
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

// Contangent function

function cotg(x) { 
    return 1 / Math.tan(x); 
}

// COUNTING /////////////////////////////////////////////////////////

// Counting function, add signs and numbers :)

function counting(input) {
    
    // Add symbol, 
    return count = (count + String(input)), inputDisplay(count), document.getElementById("input").innerHTML = "", eE() 
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
    edit = edit.replace(/Math./g, "");
    edit = edit.replace(/\*/g, "×");
    edit = edit.replace(/\//g, "÷");
    edit = edit.replace(/\./g, ",");
    edit = edit.replace(/\$/g, "sin(");
    edit = edit.replace(/\€/g, "cos(");
    edit = edit.replace(/\&/g, "tan(");
    edit = edit.replace(/\@/g, "cotg(");

    // Change size of numbers...

    fontSizeChanger(edit)

    return edit
}

// FONT SIZE CHANGING /////////////////////////////////////////////////////////

function fontSizeChanger(input) {
    input = input.length

    if (input >= 6 && input <= 12) {
        let fontSize = 82 * (1-(input - 6)/13)
        document.getElementById("output").style.fontSize = fontSize + "px"
        // console.log(input)
    } 
    else {
        document.getElementById("output").style.fontSize = "82px"
    }
}

function resetFontSize(){
    document.getElementById("output").style.fontSize = "82px"
}

// KEY LISTENER /////////////////////////////////////////////////////////

// Set key variable
let key

// Key listen
document.addEventListener("keydown", function(event){key = event.key; keyInput()})

// Keys run functions
function keyInput() {
    // console.log(key)

    // Key binds
    if ((key >= 0 && key != " ") || key == "%") {counting(key)}
    else if(key == "/" || key == "*" || key == "-" || key == "+" || key == "," || key == ".") {counting(key); signFix()}
    else if(key == "Enter" || key == "=") {result()}
    else if(key == "s") {counting('$'), bracketStatus = 'opened'}
    else if(key == "c") {counting('€'), bracketStatus = 'opened'}
    else if(key == "t") {counting('&'), bracketStatus = 'opened'}
    else if(key == "g") {counting('@'), bracketStatus = 'opened'}
    else if(key == ")") {brackets()}
    else if(key == "(") {brackets()}
    else if(key == "Delete") {clearAll()}
    else if(key == "Backspace"){del()}
    else if(key == "Escape"){closeWindow()}
    else if(key == " ") {moreBtn()}
    else if(key == "p") {counting('π')}
}

// Disable browers find function by pressing "/"

document.addEventListener("keydown",function (keyFind) {
    // console.log(keyFind.keyCode)
    if (keyFind.keyCode === 111 || (keyFind.shiftKey && keyFind.keyCode === 191)) { 
        keyFind.preventDefault();
    }
})

// OTHER /////////////////////////////////////////////////////////

// Delete, set mean how many last symbols will be deleted, default is 1
function delFunction(set = 1) {
    return count = count.substring(0, count.length - set), inputDisplay(count)
}

// Ignore pls, just easter egg hehe
function eE(){
    if (count == "0.0") {
        console.log("%caaaaaaaaaaaaaaaaa, my code is f**kin' broken, I'm not dev, I'm grafic designer, why I code this? f*ck... this code is horrible 😭", "color: #f0f")
    } else {}
}

// Calculatorfetch :3

function calcfetch() {
    console.log("Calcfetch")
    console.log("Version: " + version)
}
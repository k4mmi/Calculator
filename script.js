// Version
let version

// version = "unknown version"
version = "v0.6.0-alpha"

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
        
        power()

        // Close square root brackets
        powerSquareRootChacker(true, "invisible")

        // Filter for fix syntax for eval function
        let countTemp = count

        count = count.replace(/%/g, "/100");
        count = count.replace(/π/g, "Math.PI");
        count = count.replace(/\$/g, "Math.sin(");
        count = count.replace(/\€/g, "Math.cos(");
        count = count.replace(/\&/g, "Math.tan(");
        count = count.replace(/\@/g, "cotg(");
        count = count.replace(/\#/g, "Math.sqrt(");
        count = count.replace(/\]/g, ")");
        count = count.replace(/\;/g, ",");
        count = count.replace(/\¶/g, "Math.pow(");

        console.log(count)

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
            // Show on calculator display
        
            document.getElementById("input").innerHTML = editText(countTemp)

            // console.log(count)
            let finalResult = Math.round(eval(count) * 100)/100    
            
            // Show on calculator display
            document.getElementById("output").innerHTML = editText(String(finalResult))
            
            // Final result to 
            return count = String(finalResult), fontSizeChanger(count) //, console.log(count.length)
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
    powerRootStatusDeactive()
    countingNumBin("clear")
    powerRootStatusDeactive(), console.log("powerRootStatusDeactive")
    powerStatusDective()
    return count, fontSizeChanger(count)
}

// Just delete

function del() {
    // Hide user's input from display (id="input" in index.html)
    document.getElementById("input").innerHTML = editText("")
    
    // Auto fix brackets
    if (count.slice(-1) == ")") {
        bracketStatus = "opened"
    } else if (count.slice(-1) == "(") {
        bracketStatus = "closed"
    }
    
    // Fix for square root brackets
    if (count.slice(-1) == "#" || count.slice(-1) == "¶") { /* If user delete the square root symbol "#" */
        powerRootStatusDeactive(), console.log("powerRootStatusDeactive")
    } 
    // else if (count.slice(-1) == "]") { /* If user delete the close bracket "#" */
    //     powerRootStatusActive(), console.log("powerRootStatusActive")
    // }

    
    // Auto del stuck "¶" from power function
    // if (count.slice(-9) == "¶") {
    //     count = count.slice(0, -9)
    // }

    // Auto del stuck "¶", "¶" is part power function, if we don't delete it, it will break whole calculator
    

    let loopCount = 1

    if (count.slice(-1) == ";") {
        for (let i = 0; count.length >= i; ++i){

            let x = 2
            let firstCountTrim = count.slice(-1*(i + 1))
    
            // Fix for first interval
            if (i > 0) {
                x = 1
            }
            
            let secondCountTrim = firstCountTrim.slice(0, -firstCountTrim.length + x)
    
            // Just set second trim to new variable
            let countChacker = secondCountTrim

            if (countChacker == "¶") {

                let countTempPower = count.slice(-loopCount + 1)
                count = count.slice(0, -loopCount)
                count = count + countTempPower 

            } else {

                loopCount = ++loopCount

            }
        }
    }

    if (count.slice(-2, -1) == "]") {
        powerRootStatusActive(), console.log("powerRootStatusActive")
        
        // Delete two last symbols
        return count = count.substring(0, count.length - 2), fontSizeChanger(count), inputDisplay(count), console.log(count)
    }
    
    // Just delete last symbol
    return count = count.substring(0, count.length - 1), fontSizeChanger(count), inputDisplay(count),console.log(count)
}

function testNum() {
    counting("7739+¶579;3")
}

function test() {

    let loopCount = 1

    if (count.slice(-1) == ";") {
        for (let i = 0; count.length >= i; ++i){
            console.log("i'm workin' :3")

            console.log("fLC" + loopCount)

            let x = 2
            let firstCountTrim = count.slice(-1*(i + 1))
    
            // Fix for first interval
            if (i > 0) {
                x = 1
            }
            
            let secondCountTrim = firstCountTrim.slice(0, -firstCountTrim.length + x)
    
            // Just set second trim to new variable
            let countChacker = secondCountTrim

            console.log(countChacker)
            if (countChacker == "¶") {

                console.log("I found ¶")
                let countTempPower = count.slice(-loopCount + 1)
                count = count.slice(0, -loopCount)
                return count = count + countTempPower 
            } else {
                console.log("else")
                loopCount = ++loopCount
            }
            console.log("LC " + loopCount)
            
        }
    }
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

// Square root function

let powerRootStatus = null

function powerRootStatusActive() {
    return powerRootStatus = true
}

function powerRootStatusDeactive() {
    return powerRootStatus = false
}

// Chack where is new number/sign
function powerSquareRootChacker(input, inputVisibility) {
    if (powerRootStatus === true) {
        if (typeof newInputSymbol != "number" && newInputSymbol !== "#" && newInputSymbol !== ";") {
            
            // Deactivate root status
            powerRootStatusDeactive()
            powerRootStatus = false
                        
            // Add special bracket
            return count = String(count) + "]"
            
        } 
        else if (inputVisibility == "visible" && input == true) {
            return count = String(count) + "}", powerRootStatusDeactive(), powerRootStatus = false
            
            
        } else if (inputVisibility == "invisible" && input == true) {
            return count = String(count) + "]", powerRootStatusDeactive(), powerRootStatus = false
            
        }
    }
}

let powerLoopStatus = false

function powerStatusActive() {

    // powerLoopStatus allowing continue
    return powerLoopStatus = true, console.log("power loop status ACTIVATED")
}

function powerStatusDective() {

    // powerLoopStatus allowing continue, this will deactivate the power status
    return powerLoopStatus = false, console.log("power loop status DEACTIVATED")
}

// Power function
function power() {

    // Count all cycles, where was scaned new number/symbol. Useful for know dow many symbol temporary delete.
    let loopCount = 0

    // Instant counting after start cycle
    let loopCountInstant = 0

    console.log(++count.length)
    for (let i = 0; i < (++count.length) && powerLoopStatus == true; ++i) {


        // Instant counting of cycles, KEEP IN HIGH (above if/else)!
        loopCountInstant = ++loopCountInstant

        let x = 2
        let firstCountTrim = count.slice(-1*(i + 1))

        // Fix for first interval
        if (i > 0) {
            x = 1
        }
        
        let secondCountTrim = firstCountTrim.slice(0, -firstCountTrim.length + x)

        // Just set second trim to new variable
        let countChacker = secondCountTrim
        
        // If the symbol is still num, watch count of cycles

        // console.log("count.length "+count.length)
        // console.log("loopCount.length "+loopCount.length)

        if ((Number(countChacker) >= 0 || countChacker == ";") && count.length >= loopCountInstant) {

            // If the symbol is still num
            loopCount = ++loopCount
            // console.group("IF")
            // console.log("Daný symbol po ořezech: "+countChacker)
            // // console.log(powerLoopStatus)
            // console.log("Počet cyklů ořezávání: "+loopCount)
            // console.groupEnd()
            
        } else {
            // Symbol is not num :(

            // console.group("ELSE")
            powerLoopStatus = false
            // console.log("Stop: " + powerLoopStatus)
            // console.log(count.length - loopCount)
            let countTempPower = count.slice(-loopCount)
            count = count.slice(0, -loopCount)
            // console.groupEnd()
            return count = count + "¶" + countTempPower, console.log("Final: " + count)
        }
    }
}

// COUNTING /////////////////////////////////////////////////////////

// New symbol from input
let newInputSymbol

// Bin for numbers
let countNumBin = ""

// Counting function, add signs and numbers :)
function counting(input) {
// countingNumBin(input)    
    return newInputSymbol = input, powerSquareRootChacker(), count = (count + String(input)), inputDisplay(count), document.getElementById("input").innerHTML = "", console.log(count)
}

//Num bin is nosence, I gonna keep this function for future
function countingNumBin(input) {

    // Convert input to string
    if (input == "clear") {
        return countNumBin = ""
    }
    else if (Number(input) >= 0) {
        input = String(input)
        return countNumBin = countNumBin + input, console.log("countNumBin = " + countNumBin)
    } else {
        return countNumBin = ""
    }
}

// This function do stuff when u click some sign btn
function sign() {

    // Active power function 
    power()
}

// Fix double signs. If user try new sign, a last one will be replaced the new one
function signFix() {
    
    // Save user sign input, because both signs will be deleted. saveLase gonna recover user output after deletion
    let saveLast = count.slice(-1)
    
    // Take last user input before this new one
    let input = count.slice(-2)
    input = input.substring(0, input.length - 1)
    
    // Checker
    if (input == "*" || input == "-" || input == "+" || input == "/" || input == "." || input == "#") {
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
    edit = edit.replace(/\&/g, "tang(");
    edit = edit.replace(/\@/g, "cotg(");
    edit = edit.replace(/\#/g, "√");
    edit = edit.replace(/\]/g, "");
    edit = edit.replace(/\}/g, ")");
    edit = edit.replace(/\;/g, "^");
    edit = edit.replace(/\¶/g, "");

    // Change size of numbers...

    fontSizeChanger(edit)

    return edit
}

function indexNums(edit) {
    // Filter
    edit = edit.replace(/0/g, "⁰");
    edit = edit.replace(/1/g, "¹");
    edit = edit.replace(/2/g, "²");
    edit = edit.replace(/3/g, "³");
    edit = edit.replace(/4/g, "⁴");
    edit = edit.replace(/5/g, "⁵");
    edit = edit.replace(/6/g, "⁶");
    edit = edit.replace(/7/g, "⁷");
    edit = edit.replace(/8/g, "⁸");
    edit = edit.replace(/9/g, "⁹");
    return edit
}

// FONT SIZE CHANGING /////////////////////////////////////////////////////////

function fontSizeChanger(input) {
    input = input.length

    if (input >= 6 && input <= 12) {
        let fontSize = 82 * (1-(input - 6)/13)
        document.getElementById("output").style.fontSize = fontSize + "px"
        // console.log(input)
    } else if (input >= 13) {
        let fontSize = 82 * (1-7/13)
        document.getElementById("output").style.fontSize = fontSize + "px"
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
    console.log(key)

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
    else if(key == "w") {powerRootStatusActive(), counting(';'), powerStatusActive(), bracketStatus = 'opened'}
    else if(key == "r") {powerRootStatusActive(), counting('#')}
    else if(key == "a") {counting('^w^')}
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

// Calculatorfetch :3

function calcfetch() {
    console.group("Calcfetch")
    console.log("Version: " + version)
    console.groupEnd()
}
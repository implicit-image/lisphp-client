
const interpreter_url = "http://127.0.0.1:8081/index.php"
let input_line = document.querySelector("#repl-input")

let replHistory = []

function handleKeyPress(event) {
  switch (event.code) {
    case "Enter":
      //submit code
      submitExpr(event.target)
      break;
    case "KeyL":
      if (event.ctrlKey) {
        event.preventDefault()
        clearRepl(event.target)
        console.log("clearing console")
      }
      break;
    default:
      return 0
  }
}

async function submitExpr(input) {
  let expression = input.value

  input_line.value = "";
  let results = { return_value: 20, stdout_output: "hewwo" }//await sendCode(expression)
  let history = document.querySelector("#repl-history")
  let new_history_entry = createHistoryEntry(`  Lisp> ${expression}`,
                                             results.return_value,
                                             results.stdout_output)
  history.appendChild(new_history_entry)
}

function clearRepl(event) {
  let repl_frame = document.querySelector("#repl-frame")

  // input_line.scroll(0, 30)
  window.scroll(0, -700)


}



function createHistoryEntry(expr, return_value, eval_results) {
  let new_history_entry = document.createElement("div")
  let expression_div    = document.createElement("div")
  let return_value_div  = document.createElement("div")
  let stdout_div        = document.createElement("div")

  replHistory.push({
    expression: expr,
    return_value: return_value,
    eval_results: eval_results
  })

  expression_div.innerHTML   = expr
  return_value_div.innerHTML = return_value
  stdout_div.innerHTML       = eval_results

  new_history_entry.append(expression_div, return_value_div, stdout_div)
  //add containers for all three values
  new_history_entry.classList.add(["repl-history-entry"])
  return new_history_entry
}



async function sendCode(code) {
  try {
    const res = await fetch(interpreter_url , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: code
    })
    const result = await res.json()
    console.log(result)
    return JSON.parse(result)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
}



input_line.addEventListener("keydown", handleKeyPress)

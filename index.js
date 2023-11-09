
const interpreter_url = "http://127.0.0.1:8081/index.php"
let input_line = document.querySelector("#repl-input")
let submit_button = document.querySelector("#run-button")


function createHistoryEntry(code, returnValue, evalResults) {
  let new_history_entry = document.createElement("div")
  let expression_div = document.createElement("div")
  let return_value_div = document.createElement("div")
  let stdout_div = document.createElement("div")
  expression_div.innerHTML = code
  return_value_div.innerHTML = returnValue
  stdout_div.innerHTML = evalResults

  new_history_entry.append(expression_div, return_value_div, stdout_div)
  //add containers for all three values
  new_history_entry.classList.add(["repl-history-entry"])
  return new_history_entry
}


async function onCodeSubmit(event) {
  let expression = event.target.value
  if (event.code == "Enter") {

    input_line.value = "";
    let results = await sendCode(expression)
    let history = document.querySelector("#repl-history")
    let new_history_entry = createHistoryEntry(expression,
                                               results.return_value,
                                               results.stdout_output)
    history.appendChild(new_history_entry)
  }
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



input_line.addEventListener("keydown", onCodeSubmit)

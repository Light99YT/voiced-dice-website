let speech = new SpeechSynthesisUtterance();
let nextId = 0;
let dices = [];
let diceResult = 10;

const rollButton = document.querySelector("#roll");
// randomizar un dado de 6 caras --> Math.floor(Math.random() * 6) + 1;

function Dice(faces){
    this.id = nextId++;
    this.faces=faces;

    this.roll = function() {
        return Math.floor(Math.random() * this.faces) + 1;
    }
}

document.getElementById("create").addEventListener("click", () =>{
    const form = document.forms["infoDado"];
    const faces = Number(form.elements.faces.value);
    let veces = Number(form.elements.num.value);

    if ((!Number.isInteger(faces) || faces<=0) || (!Number.isInteger(veces) || veces<=0)){
        alert("Error al introducir los datos del dado.");
        return;
    }

    for (let i=0; i<veces;i++){
        dices.push(new Dice(faces))
    };

    form.reset();
    updateButtonState();
    updateDiceDivState();
    renderDices();
});

function updateButtonState() {
    rollButton.disabled = dices.length === 0;
}

function updateDiceDivState() {
    document.querySelector("#dices").style.display = dices.length === 0 ? "none" : "block";
}

function renderDices(){
    const contenedor = document.getElementById("dices");
    contenedor.innerHTML="<h1>Dados seleccionados: </h1>";
    dices.forEach((dice, index) => {
        const div = document.createElement("div");
        div.classList.add("dice");
        div.textContent = `🎲 ${dice.faces} caras`;

        div.addEventListener("click", (e) => {
            e.stopPropagation();
            showDiceOptions(dice.id, div);
        });
        
        contenedor.appendChild(div);
    });
    const deleteAllBtn = document.createElement("button");
    deleteAllBtn.id="deleteAll";
    deleteAllBtn.textContent="Eliminar Todos"
    deleteAllBtn.addEventListener("click", () => {
        dices.length = 0;
        renderDices();
        updateButtonState();
        updateDiceDivState();
    });
    contenedor.appendChild(deleteAllBtn);
}

function showDiceOptions(id, div){
    document.querySelectorAll(".menu").forEach(m=>m.remove());

    const menu = document.createElement("div");
    menu.classList.add("menu");
    
    const cloneBtn = document.createElement("button");
    cloneBtn.textContent = "Clonar";
    cloneBtn.addEventListener("click", () =>{
        cloneDice(id);
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Eliminar";
    deleteBtn.addEventListener("click", () => {
        deleteDice(id);
    })

    menu.appendChild(cloneBtn);
    menu.appendChild(deleteBtn);
    div.appendChild(menu);
}

function cloneDice(id) {
    const original = dices.find(d => d.id === id);

    if (!original) return;

    dices.push(new Dice(original.faces));

    renderDices();
    updateButtonState();
    updateDiceDivState();
}

function deleteDice(id) {
    dices = dices.filter(d => d.id !== id);

    renderDices();
    updateButtonState();
    updateDiceDivState();
}

rollButton.addEventListener("click", () =>{
    diceResult = dices.reduce((suma, dice) => {
        return suma + dice.roll();
    }, 0);
    speech.text = diceResult.toString();
    window.speechSynthesis.speak(speech);
    document.querySelector("#resultadoDiv").style.display = "flex";
    document.querySelector("#resultado").value = diceResult;
})

document.querySelector("#d4").addEventListener("click", () => {
    dices.push(new Dice(4))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

document.querySelector("#d6").addEventListener("click", () => {
    dices.push(new Dice(6))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

document.querySelector("#d8").addEventListener("click", () => {
    dices.push(new Dice(8))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

document.querySelector("#d10").addEventListener("click", () => {
    dices.push(new Dice(10))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

document.querySelector("#d12").addEventListener("click", () => {
    dices.push(new Dice(12))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

document.querySelector("#d20").addEventListener("click", () => {
    dices.push(new Dice(20))
    updateButtonState();
    updateDiceDivState();
    renderDices();
})

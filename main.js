const addCounter = document.querySelector(".add-counter-button");
const countersContainer = document.querySelector(".counters-container");
const counters = localStorage.getItem("_counters_array_") ? JSON.parse(localStorage.getItem("_counters_array_")) : [];

for (let counter of counters)
    countersContainer.append(create_counter(counter.name, counter.value, counter.id, counters).markup);

addCounter.addEventListener("click", () => {
    const counter = create_counter("counter label", 0, create_random_id(100), counters);

    counters.push({ name: counter.name, value: counter.value, id: counter.id });
    localStorage.setItem("_counters_array_", JSON.stringify(counters));
    countersContainer.append(counter.markup);
});

function create_random_id(length) {
    let id;

    id = '';
    for (let i = 0; i < length; i++) {
        let number;

        do
            number = Math.floor(Math.random() * 94) + 33;
        while (number == 34 || number == 39 || number == 96 || number == 92);
        id += String.fromCharCode(number);
    }
    return id;
}

function create_counter(name, value, id, array) {
    const counter = document.createElement("div");
    const counterName = document.createElement("h3");
    const counterInput = document.createElement("input");
    const counterContent = document.createElement("div");
    const plus = document.createElement("button");
    const counterValue = document.createElement("span");
    const minus = document.createElement("button");
    const changeContent = document.createElement("div");
    const reset = document.createElement("button");
    const remove = document.createElement("button");

    counter.classList.add("counter");
    counterName.classList.add("counter-name");
    counterInput.classList.add("counter-input");
    counterContent.classList.add("counter-content");
    changeContent.classList.add("change-content");
    plus.classList.add("plus");
    minus.classList.add("minus");
    reset.classList.add("reset");
    remove.classList.add("remove");

    counterName.innerText = name;
    counterInput.value = name;
    counterValue.innerText = value;
    counterInput.setAttribute("placeholder", "counter label");
    counterInput.setAttribute("type", "text");
    value = Number(value);

    counter.append(counterName);
    counter.append(counterContent);
    counter.append(changeContent);
    changeContent.append(remove);
    changeContent.append(reset);
    counterContent.append(plus);
    counterContent.append(counterValue);
    counterContent.append(minus);

    counterInput.addEventListener("focusout", () => {
        counterName.innerText = counterInput.value ? counterInput.value : "counter label";
        counterInput.replaceWith(counterName);
        update_data("name", counterName.innerText);
    });

    counterName.addEventListener("click", () => {
        counterInput.value = counterName.innerText;
        counterName.replaceWith(counterInput);
        counterInput.focus();
    });

    document.addEventListener("keypress", event => {
        if (event.key == "Enter" && document.activeElement == counterInput)
            document.activeElement.blur();
    });

    plus.addEventListener("click", () => {
        value++;
        counterValue.innerText = value;
        update_data("value", value);
    });

    minus.addEventListener("click", () => {
        value--;
        counterValue.innerText = value;
        update_data("value", value);
    });

    reset.addEventListener("click", () => {
        value = 0;
        counterValue.innerText = value;
        update_data("value", 0);
    });

    remove.addEventListener("click", () => {
        let index;

        index = array.findIndex(cn => cn.id == id);
        array.splice(index, 1);
        counter.parentElement.removeChild(counter);
    });

    function update_data(prop, val) {
        let obj;

        obj = array.filter(cn => cn.id == id)[0];
        obj[prop] = val;
        localStorage.setItem("_counters_array_", JSON.stringify(array));
    }

    return { markup: counter, name, value, id };
}
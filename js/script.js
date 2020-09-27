
var globalInputA = document.querySelector("#inputA");
var globalInputB = document.querySelector("#inputB");

function formatNumber(number){
    var num = new Intl.NumberFormat('pt-BR').format(number);
    num.toFixed(2);
    return num
}

var globalCalculations = [
    {
      id: 1,
      description: "Soma (a + b):",
      calculate: function soma(a, b) {
        return a + b;
      },
      type: "a_b"
    },
  
    {
      id: 2,
      description: "Subtração 1 (a - b):",
      calculate: function sub(a, b) {
        return a - b;
      },
      type: "a_b"
    },
  
    {
      id: 3,
      description: "Subtração 2 (b - a):",
      calculate: function sub(b, a) {
        return b - a;
      },
      type: "b_a"
    },
  
    {
      id: 4,
      description: "Multiplicação (a x b):",
      calculate: function mult(a, b) {
        return a * b;
      },
      type: "a_b"
    },
  
    {
      id: 5,
      description: "Divisão 1(a / b):",
      calculate: function div(a, b) {
        if (b === 0)
            return 'Divisão por 0'

        var result = a/b;
        return formatNumber(result);
      },
      type: "a_b"
    },
  
    {
      id: 6,
      description: "Divisão 2(b / a):",
      calculate: function div(b, a) {
        if (a === 0)
            return 'Divisão por 0'

        var result = b/a;
        return formatNumber(result);
      },
      type: "b_a"
    },
  
    {
      id: 7,
      description: "Quadrado de a (a^2):",
      calculate: function sqrt(a) {
        return formatNumber(a*a);
      },
      type: "a"
    },
  
    {
        id: 8,
        description: "Quadrado de b (b^2):",
        calculate: function sqrt(b) {
            return formatNumber(b*b);
        },
        type: "b"
    },
    {
        id: 9,
        description: "Divisões inteiros de a:",
        calculate: function inteiros(a) {
            return 0
        },
        type: "a"
    },
    {
        id: 10,
        description: "Divisões inteiros de b:",
        calculate: function inteiros(b) {
            return 0
        },
        type: "b"
    },
    {
        id: 11,
        description: "Fatorial de a (a!):",
        calculate: function fat(a) {
            return 0
        },
        type: "a"
    },
    {
        id: 12,
        description: "Fatorial de b (b!):",
        calculate: function fat(b) {
            return 0
        },
        type: "b"
    }
  ];


function start() {
    globalInputA.addEventListener("input", handleChangeInputA);
    globalInputB.addEventListener("input", handleChangeInputB);

    calculate();
}

function handleChangeInputA() {
    calculate();
}

function handleChangeInputB() {
    calculate();
}

function calculate() {
    var a;
    var b;
    parseInt(globalInputA.value, a);
    parseInt(globalInputB.value, b);

    /**
     * Obtendo a div onde serão exibidos
     * todos os cálculos
     */
    var divCalculations = document.querySelector("#calculations");

    /**
     * Criando div interna que será
     * preenchida dinamicamente
     */
    var innerCalculations = document.createElement("div");

    /**
     * Adicionando class "row" que faz
     * parte do modelo de grid do Materialize
     * https://materializecss.com/grid.html
     */
    innerCalculations.classList.add("row");

    /**
     * Geração dinâmica dos cálculos
     */
    for (var i = 0; i < globalCalculations.length; i++) {
        /**
         * Apelidando cálculo atual em currentCalculation
         */
        var currentCalculation = globalCalculations[i];

        /**
         * Montando id único
         */
        var id = "input_" + currentCalculation.id;

        /**
         * Calculando o valor conforme a função
         * calculate e type
         */
        var value = getCalculationFrom(
        currentCalculation.type,
        currentCalculation.calculate,
        a,
        b
        );

        /**
         * Montando os elementos conforme
         * regras do Materialize
         */
        var div = getMaterializeDiv();
        var input = getMaterializeInput(id, value);
        var label = getMaterializeLabel(id, currentCalculation.description);

        div.appendChild(input);
        div.appendChild(label);
        innerCalculations.appendChild(div);
}


function getMaterializeDiv() {
    var div = document.createElement("div");
    div.classList.add("input-field", "col", "s12", "m6", "l4");

    return div;
}


function getMaterializeInput(id, value) {
    var input = document.createElement("input");
    input.readOnly = true;
    input.type = "number";
    input.id = id;
    input.value = value;
  
    return input;
}


function getMaterializeLabel(id, description) {
    var label = document.createElement("label");
    label.for = id;
    label.textContent = description;
    label.classList.add("active");
  
    return label;
}

function getCalculationFrom(type, calculationFunction, a, b) {
    var value = "";
    
    switch (type) {
        case "a":
        value = calculationFunction(a);
        break;
    
        case "b":
        value = calculationFunction(b);
        break;
    
        case "a_b":
        value = calculationFunction(a, b);
        break;
    
        case "b_a":
        value = calculationFunction(b, a);
        break;
    
        default:
        value = "Cálculo não identificado.";
    }
    
    return value;
}

start();
// Acima de 40,0. Obesidade. grau III. ...
// Entre 35,0 e 39,9. Obesidade. grau II. ...
// Entre 30,0 e 34,9. Obesidade grau I. Sinal de alerta! ...
// Entre 25,0 e 29,9. Sobrepeso. ...
// Entre 18,6 e 24,9. Normal. ...
// 18,5 ou menos. Abaixo do normal.


    const form = document.querySelector('.calcimc');
    const mensagem = document.querySelector('.mensagem');

    function calcIMC(peso, altura) {
        return peso / (altura * altura);
    }

    function checarValidade(peso, altura) {
        return !isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0;
    }

    function definirCategoria(imc) {
        if (imc <= 18.5) {
            return `Seu IMC é de ${imc.toFixed(2)}, Abaixo do normal.`;
        } else if (imc <= 24.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Normal.`;
        } else if (imc <= 29.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Sobrepeso.`;
        } else if (imc <= 34.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau I. Sinal de alerta!`;
        } else if (imc <= 39.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau II.`;
        } else {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau III.`;
        }
    }

    function rodarPrograma(evento) {
        evento.preventDefault(); // Impede o envio do formulário

        // Obtendo e convertendo os valores dos inputs
        let peso = parseFloat(form.querySelector('.peso').value);
        let altura = parseFloat(form.querySelector('.altura').value);
        
        if (altura > 3) {
            altura = altura/100
        }

        
        if (checarValidade(peso, altura)) {
            const imc = calcIMC(peso, altura); 
            const resultado = definirCategoria(imc); 
            mensagem.innerHTML = resultado;
        } else {
            mensagem.innerHTML = "Peso e altura precisam estar preenchedos e serem maiores que 0.";
        }
    }


        

    form.addEventListener('submit', rodarPrograma);

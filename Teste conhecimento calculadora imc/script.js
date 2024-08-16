    
    const form = document.querySelector('.calcimc'); // Seleciona o formulário no arquivo html
    const mensagem = document.querySelector('.mensagem'); // Seleciona a div mensagem, para imprimir no html um texto posteriormente
    

    // Função para calcular o imc
    function calcIMC(peso, altura) {
        return peso / (altura * altura);
    }

    // Função para verificar se os campos estão preenchidos com valor inválidos (iguais ou inferiores a 0)
    function checarValidade(peso, altura) {
        return  peso > 0 && altura > 0;
    }

    // Função para classificar o individuo em uma das faixas de imc
    function definirCategoria(imc) {
        if (imc <= 18.5) {
            return `Seu IMC é de ${imc.toFixed(2)}, Abaixo do normal, estado de desnutrição`;
        } else if (imc <= 24.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Normal.`;
        } else if (imc <= 29.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Sobrepeso. comece a realizar exercícios físicos.`;
        } else if (imc <= 34.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau I. Sinal de alerta!, procure um nutricionista`;
        } else if (imc <= 39.9) {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau II`;
        } else {
            return `Seu IMC é de ${imc.toFixed(2)}, Obesidade grau III.`;
        }
    }

    // Função para rodar todas as outras funções
    function rodarPrograma(evento) {
        evento.preventDefault(); // Evitar que a pagina seja recarregada apagando os dados

        
        let peso = parseFloat(form.querySelector('.peso').value);  // Armazena os valores dos campos peso e altura e insere eles dentro das variaveis de mesmo nome
        let altura = parseFloat(form.querySelector('.altura').value);
        
        // Transforma a altura em metros caso o usuário digite em centimetros
        if (altura > 3) {
            altura = altura/100
        }

        let pesoideal = (altura * 100) - 100
        // Roda a função checarValidade e prossegue com o código somente se o resultado for true, ou seja, maior que 0. Caso contrário, retorna uma mensagem 
        if (checarValidade(peso, altura)) {
            const imc = calcIMC(peso, altura); 
            const resultado = definirCategoria(imc); 
            mensagem.innerHTML = resultado + ` Seu peso ideal é ${pesoideal} kg`;
        } else {
            mensagem.innerHTML = "Peso e altura precisam estar preenchedos e serem números válidos e maiores que 0.";
        }
    }


        
    // Executa o programa caso o formulário seja enviado
    form.addEventListener('submit', rodarPrograma);

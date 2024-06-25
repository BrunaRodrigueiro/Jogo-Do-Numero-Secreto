let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    /*funcionalidade com intuito de fazer com que o computador leia tudo que está escrito, onde adicionamos o parâmetro 'texto' em seguida da voz que consta na documentação e a velocidade '{rate:1.2}';*/
    responseVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value; //valor que a pessoa irá digitar
    // console.log(chute == numeroSecreto);

    //se o chute for igual ao número secreto irá exibir no h1
    if(chute == numeroSecreto) {

        exibirTextoNaTela('h1', 'Acertou');
        //variável criada para mostrar o número de tentativas utilizando ternários
        let palavraTentativas = tentativas > 1 ? 'tentativas':'tentativas' ;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //removendo atributo para ativar o botão de novo jogo

    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');

        tentativas++;
        limparCampo();
    }
}

//função criada para gerar números aleátorios
function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementos = listaDeNumerosSorteados.length;

    //Se a quantidade de elementos da lista for igual a 3 irá limpar
    if(quantidadeElementos == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    //se o número já foi sorteado irá retornar um novo número
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//função para limpar campo
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//função para reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //restaurar o status da nossa aplicação com o campo 'Novo jogo' desabilitado onde só é habilitado quando acerta o número secreto.
}

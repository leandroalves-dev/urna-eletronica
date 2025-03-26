const candidatura = [
    {
        titulo: 'VEREADOR',
        numeros: 5,
        candidatos: [
            {
                numero: '10001',
                nome: 'Fulano',
                partido: 'ABC',
                fotos: [
                    {url: './images/img-1.jpg', legenda: 'Vereador'}
                ]
                },
                {
                numero: '10002',
                nome: 'Beltrano',
                partido: 'DEFG',
                fotos: [
                    {url: './images/img-2.jpg', legenda: 'Vereadora'}
                ]
            },
        ]
    },
    {
        titulo: 'DEPUTADO',
        numeros: 4,
        candidatos: [
            {
                numero: '1000',
                nome: 'Fulano',
                partido: 'ABC',
                fotos: [
                    {url: './images/img-1.jpg', legenda: 'Deputado'}
                ]
                },
                {
                numero: '2000',
                nome: 'Beltrano',
                partido: 'DEFG',
                fotos: [
                    {url: './images/img-2.jpg', legenda: 'Deputada'}
                ]
            },
        ]
    },
    {
        titulo: 'SENADOR',
        numeros: 3,
        candidatos: [
            {
                numero: '123',
                nome: 'Fulano',
                partido: 'ABC',
                fotos: [
                    {url: './images/img-1.jpg', legenda: 'Senador'}
                ]
                },
                {
                numero: '321',
                nome: 'Beltrano',
                partido: 'DEFG',
                fotos: [
                    {url: './images/img-2.jpg', legenda: 'Senadora'}
                ]
            },
        ]
    },
    {
        titulo: 'GOVERNADOR',
        numeros: 2,
        candidatos: [
            {
                numero: '10',
                nome: 'Ciclano',
                partido: 'ERD',
                fotos: [
                    {url: './images/img-1.jpg', legenda: 'Vereador'}
                ]
                },
                {
                numero: '20',
                nome: 'Beltrano',
                partido: 'OLM',
                fotos: [
                    {url: './images/img-2.jpg', legenda: 'Vereadora'}
                ]
            },
        ]
    },
    {
        titulo: 'PRESIDENTE',
        numeros: 2,
        candidatos: [
            {
                numero: '10',
                nome: 'Ciclano',
                partido: 'ERD',
                fotos: [
                    {url: './images/img-1.jpg', legenda: 'Presidente'}
                ]
                },
                {
                numero: '11',
                nome: 'Beltrano',
                partido: 'OLM',
                fotos: [
                    {url: './images/img-2.jpg', legenda: 'Presidenta'}
                ]
            },
        ]
    }
];

/*SCREEN VOTO*/

const listaCanditatos  = document.querySelector('.listaCanditatos');

const screenVoto = document.querySelector('#screenVoto');
const containerVoto = document.querySelector('.containerVoto');
const colDados = document.querySelector('#col-dados');
const cargo = document.querySelector('.cargo');
const numberCandidato = document.querySelector('.numberCandidato');
const containerInformation = document.querySelector('.container-information');
const colDadosInformation = document.querySelector('.col-dados-information h1');
const colDadosExtras = document.querySelector('.col-dados-extras');

const contentText = document.querySelector('#contentText');
const nomeCandidato = document.querySelector('.nomeCandidato strong');
const numeroPartido = document.querySelector('.numeroPartido');
const siglaPartido = document.querySelector('.siglaPartido strong');
const colDadosFoto = document.querySelector('.col-dados-foto img');

/*BUTTONS*/
const anular = document.querySelector('#anular');
const corrige = document.querySelector('#corrige');
const confirma = document.querySelector('#confirma');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

let juntarNumeros = '';

function processInit() {
    
    const process = candidatura[etapaAtual];
    cargo.textContent = process.titulo;
    
    let qtdaNumbers = process.numeros;

    votoBranco = false;
    juntarNumeros = '';
    let spansHTML = '';

    let getCandidatos = candidatura[etapaAtual].candidatos

    listaCanditatos.innerHTML = '';
    getCandidatos.map( items => {

        let html = `
            <li>
                <div class="info">
                    <div class="infNumero"><span>Candidato a ${items.fotos[0].legenda}: ${items.numero}</span></div>
                </div>                
            </li>
        `;

        listaCanditatos.innerHTML += html;
    }); 

    for( let i = 0; i < qtdaNumbers; i++ ){
        spansHTML += `<span class="number"></span>`;
    }

    numberCandidato.innerHTML = spansHTML;
   
    focusFirstNumber();
   
}

function focusFirstNumber(){
    const spanHtml = numberCandidato.querySelectorAll('span');
    for( let i = 0; i < spanHtml.length; i++ ){
        if( spanHtml[i].innerHTML === '' ){
            spanHtml[i].classList.add('focus');
            break;
        }
    }
}

function buttonClick(num){
    
    const spanHtml = numberCandidato.querySelectorAll('span');
    
    for (let i = 0; i < spanHtml.length; i++) {
        
        if (spanHtml[i].innerHTML === "") {            
            spanHtml[i].innerHTML = num;

            const spanFocus = document.querySelector('span.focus');
            spanFocus.classList.remove('focus');
            if( spanFocus.nextElementSibling !== null ){
                spanFocus.nextElementSibling.classList.add('focus');
            }

            break;
        }
        
    }

    const todosPreenchidos = Array.from(numberCandidato.querySelectorAll("span")).every(span => span.innerHTML !== "");

    if (todosPreenchidos) {
        atualizaTelaDeVotos();
        tocarInterno();
    }
}

function atualizaTelaDeVotos(){
    const process = candidatura[etapaAtual];

    const spanNumbers = numberCandidato.querySelectorAll('.number');
    
    for( let i = 0; i < spanNumbers.length; i++ ){
        juntarNumeros += spanNumbers[i].textContent;
    }

    let candidato = process.candidatos.filter((item) => {
        if(item.numero === juntarNumeros) {
            return true;
        }else{
            return false;
        }
    });
   
    
    if( candidato.length > 0 ){
        candidato = candidato[0];
        contentText.classList.remove('hide');
        const titleNumero = document.createElement('h3');
        titleNumero.textContent = 'Numero: ';
        numberCandidato.prepend(titleNumero);
        nomeCandidato.textContent = `${candidato.nome}`;
        siglaPartido.textContent = `${candidato.partido}`;
        colDadosFoto.setAttribute('src', candidato.fotos[0].url);
        colDadosFoto.parentNode.classList.remove('hide');
        colDadosExtras.classList.remove('hide');
        colDadosInformation.classList.remove('hide');
        return false
        
    }else{
        votoEmBranco();
    }
}

function votoEmBranco(){
    if( !votoBranco){
        tocarInterno();
        votoBranco = true;
        colDadosInformation.classList.remove('hide');
        numberCandidato.classList.add('hide');
        const titleEmBranco = document.createElement('section')
        titleEmBranco.classList.add('votou-em-branco')
        const titleSpan = document.createElement('span');
        titleSpan.textContent = 'VOTO EM BRANCO';
        titleEmBranco.appendChild(titleSpan);
        containerInformation.nextElementSibling.before(titleEmBranco);
        colDadosExtras.classList.remove('hide');
    }
}

anular.addEventListener('click', () => {
    votoEmBranco();  
});

corrige.addEventListener('click', () => {
    processInit();
});

confirma.addEventListener('click', () => {
    const sectionTItleBranco = colDados.querySelector('.votou-em-branco');

    
    if( sectionTItleBranco !== null && numberCandidato.classList.contains('hide')){
        sectionTItleBranco.remove();
        numberCandidato.classList.remove('hide');
    }

    const process = candidatura[etapaAtual];
    let votoCorreto = false;
    
    if(votoBranco === true) {
        votoCorreto = true;
        votos.push({
            process: candidatura[etapaAtual].titulo,
            voto: 'branco'
        });
       
    } else if(juntarNumeros.length === process.numeros) {
        votoCorreto = true;
        votos.push({
            process: candidatura[etapaAtual].titulo,
            voto: juntarNumeros
        });
    }

    if( votoCorreto ){
        etapaAtual++
        if(candidatura[etapaAtual] !== undefined) {
            colDadosInformation.classList.add('hide');
            colDadosExtras.classList.add('hide');
            contentText.classList.add('hide');
            colDadosFoto.parentNode.classList.add('hide');
            nomeCandidato.textContent = '';
            siglaPartido.textContent = '';
            processInit();
        } else {
            clearDados();
            tocarFim();
            addLocalStorage(votos)
            setTimeout( () => { location.reload(true) },4000);
            console.log('votei em', votos);
        }
    }
});

function addLocalStorage(votos){
    let totalVotos = getLocalStorage();
    totalVotos.push(votos);
    localStorage.setItem('votos', JSON.stringify(totalVotos));
}

function getLocalStorage(){
    return localStorage.getItem('votos', JSON.stringify) ? JSON.parse(localStorage.getItem('votos')) : [];
}

function clearDados(){
    colDadosExtras.classList.add('hide');
    containerInformation.classList.add('hide');

    const progress = document.querySelector('.progress');
    progress.classList.remove('hide');   

    const date = new Date();
    const dateActual = date.toLocaleDateString();
    const hours = date.toLocaleTimeString('pt-BR');

    setTimeout( () => {
        progress.classList.add('hide');
        const fim = document.createElement('section');
        const spanFim = document.createElement('span');
        const data = document.createElement('div');
        const textVotou = document.createElement('span');

        data.textContent = `${dateActual} - ${hours}`;
        fim.appendChild(data);
        spanFim.textContent = 'FIM';
        fim.appendChild(spanFim);
        textVotou.textContent = 'VOTOU';
        textVotou.classList.add('votou');
        fim.appendChild(textVotou);
        
        sessionStorage.removeItem('cargo');
        colDados.appendChild(fim);
    },2000);

}

function tocarInterno(){
    let urlMusica = "js/interno.mp3";
    let audio = new Audio(urlMusica);
    audio.play();
}

function tocarFim(){
    let urlMusica = "js/fim.mp3";
    let audio = new Audio(urlMusica);
    audio.play();
}

processInit();
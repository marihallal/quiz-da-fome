const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const explainElement = document.getElementById('explain');
const grafElement = document.getElementById('grafico');
const rAnswer = document.getElementById('right-answers');

let shuffledQuestions, currentQuestionIndex;
let quizScore =0;

let img = document.createElement('img');
let parent = document.getElementById('media');
parent.append(img);

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click' ,() => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    img.src = question.media;
    questionElement.innerHTML = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    explainElement.innerHTML = question.explain;
    grafElement.innerHTML = question.grafico;
}



function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    explainElement.classList.add('hide');
    img.classList.add('hide');
    grafElement.classList.add("hide");
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Recome??ar";
        startButton.classList.remove("hide");
    }
    if(selectedButton.dataset = correct) {
        quizScore++;
    }
    explainElement.classList.remove('hide');
    grafElement.classList.remove("hide");
    rAnswer.innerHTML = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    };
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Entre 2008 e 2018 o percentual da popula????o desnutrida no Brasil???',
        explain: "O percentual da popula????o desnutrida no Brasil permaneceu em 2,5% durante os anos de 2008 e 2018. No mesmo per??odo, a m??dia mundial caiu de 10,3% para 8,9%",
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9850675/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9850675/?utm_source=embed&utm_campaign=visualisation/9850675' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: '...caiu pela metade', correct: false},
            { text: '...permaneceu est??vel', correct: true},
            { text: '...aumentou em 24,3%', correct: false},
            { text: '...aumentou em 43,8%', correct: false}
        ],
    },
    {
        question: 'Na compara????o entre 2000 e 2020, o n??mero de <b>mortes por desnutri????o</b> entre crian??as com menos de 1 ano???',
        explain: 'O Brasil conseguiu reduzir significativamente a morte de crian??as por desnutri????o nas duas ??ltimas d??cadas. Em 2000, foram registradas 1.462 mortes de beb??s com menos de um ano de idade. Vinte anos depois o n??mero caiu para 289.',
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9850707/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9850707/?utm_source=embed&utm_campaign=visualisation/9850707' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        media: "grafico.png",
        answers: [
            { text: '...reduziu 80%', correct: true},
            { text: '...permaneceu est??veis', correct: false},
            { text: '...aumentou 4%', correct: false},
            { text: '...aumentou 42%', correct: false}
        ],
    },
    {
        question: 'Qual <b>faixa et??ria</b> concentra o maior n??mero de mortes por desnutri????o nos ??ltimos 20 anos (2000 a 2020)?',
        explain: 'Ao contr??rio do que muitos pensam, os idosos s??o o grupo mais afetado pela desnutri????o no Brasil. De acordo com o Sistema ??nico de Sa??de, 46% das pessoas que morreram por desnutri????o no per??odo (2000-2020) tinham mais de 80 anos.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9850600/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9850600/?utm_source=embed&utm_campaign=visualisation/9850600' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: 'Crian??as at?? 1 ano', correct: false},
            { text: 'Crian??as entre 5 e 9 anos', correct: false},
            { text: 'Adultos entre 18 e 59 anos', correct: false},
            { text: 'Idosos com mais de 80 anos', correct: true}
        ],
    },
    {
        question: 'Qual o percentual de fam??lias Nordestinas e Sulistas, respectivamente, que afirmavam viver em <b>seguran??a alimentar</b> entre novembro e dezembro de 2020?',
        explain: "De acordo com a pesquisa 'Efeitos da pandemia na alimenta????o e na situa????o da seguran??a alimentar no Brasil', h?? uma grande desigualdade entre as regi??es brasileiras quando o assunto ?? seguran??a alimentar. O Nordeste ?? o local onde h?? mais inseguran??a alimentar ??? estima-se que 73% dos habitantes estejam nessa situa????o. Em seguia vem o Norte (67,7%) e o Centro-Oeste. O Sudeste (53,5%) e o Sul (51,6%) s??o os que menos sofrem com falta de comida.",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9850710/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9850710/?utm_source=embed&utm_campaign=visualisation/9850710' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        media: "grafico.png",
        answers : [
            { text: '40,8% e 60,2%', correct: false},
            { text: '26,9% e 48,4%', correct: true},
            { text: '12,1% e 35,3%', correct: false},
            { text: '62,9% e 70,1%', correct: false}
        ],
    },
    {
        question: "Entre 2000 e 2020, o n??mero de morte de idosos (acima de 60 anos) por desnutri????o...",
        explain: 'O n??mero de morte por desnutri????o entre idosos ?? grande e continua crescendo. Em 2020, eles foram 56,5% das v??timas de doen??as relacionadas ao problema.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9850713/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='no' style='width:100%;height:600px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe><div style='width:100%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9850713/?utm_source=embed&utm_campaign=visualisation/9850713' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: '...aumentou 20%', correct: false},
            { text: '...caiu 25%', correct: false},
            { text: '...aumentou 30%', correct: true},
            { text: '...permaneceu est??vel', correct: false}
        ],
    },
    {
        question: "Qual Estado tem o menor consumo de carne per capita no Brasil, segundo o IBGE?",
        explain: 'O Esp??rito Santo ?? o Estado que menos consome carne de acordo com a Pesquisa de Or??amentos Familiares de 2017/2018. Em m??dia, cada cidad??o come 15,62 Kg de carne no ano.',
        media: "grafico.png",
        grafico: "<iframe src='https://flo.uri.sh/visualisation/9694153/embed' title='Interactive or visual content' class='flourish-embed-iframe' frameborder='0' scrolling='yes' style='width:90%;height:500px;margin-left:4px;' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe> <div style='width:80%!;margin-top:4px!important;text-align:right!important;'><a class='flourish-credit' href='https://public.flourish.studio/visualisation/9694153/?utm_source=embed&utm_campaign=visualisation/9694153' target='_top' style='text-decoration:none!important'><img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' style='width:105px!important;height:16px!important;border:none!important;margin:0!important;'> </a></div>",
        answers : [
            { text: 'Paran??', correct: false},
            { text: 'Distrito Federal', correct: false},
            { text: 'Tocantins', correct: false},
            { text: 'Esp??rito Santo', correct: true}
        ],
    },
]

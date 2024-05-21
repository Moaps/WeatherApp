//const signWindowHTML = "<div style='display: flex; align-items: flex-end;'> <img style='width: 30px; height: 30px; margin-right: 10px' src='https://raw.githubusercontent.com/Moaps/images/f2b25d20b5f8e1ba57b50e19543f3a9a0b4d4703/pastel_logo.svg'><span style='font-size: 20px; font-weight: bold'>WeatherApp</span></div>"
const signWindow = new dhx.Window({
    width: 800,
    height: 500,
    closable: false
});

const signupForm = new dhx.Form(null, {
    rows: [
        {
            type: "container",
            html: "<div style='display: flex; align-items: flex-end;'> <img style='width: 30px; height: 30px; margin-right: 10px' src='https://raw.githubusercontent.com/Moaps/images/f2b25d20b5f8e1ba57b50e19543f3a9a0b4d4703/pastel_logo.svg'><span style='font-size: 20px; font-weight: bold'>WeatherApp</span></div>"
        },
        {
            cols: [
                {
                    width: 380,
                    rows: [
                        {
                            padding: "20px 0px 0px 0px",
                            label: "Nome",
                            placeholder: "Fulano",
                            type: "input",
                            name: "nome",
                            validation: function(value) {
                                return value && value.length >= 3;
                            },
                            errorMessage: "ERRO: Nome muito curto!",
                            successMessage: "Nome Válido",
                            preMessage: "Pelo menos 3 caracteres"
                        },
                        {
                            label: "Email",
                            type: "input",
                            name: "email",
                            placeholder: "fulano@email.com",
                            errorMessage: "ERRO: Email Inválido!",
                            successMessage: "Email Válido",
                            validation: "email",
                            inputType: "email"
                        },
                        {
                            label: "Usuário",
                            type: "input",
                            name: "usuario",
                            placeholder: "Fulaninho12",
                            validation: function(value) {
                                return value && value.length >= 0;
                            },
                            errorMessage: "ERRO: Escolha um nome de usuário!",
                            successMessage: "Usuário Válido"
                        },
                        {
                            label: "Senha",
                            type: "input",
                            name: "pass",
                            inputType: "password",
                            helpMessage: "Requisitos mínimos para a Senha:<br><br>- 6 caracteres<br>- 1 letra maiúscula<br>- 1 letra minúscula<br>- 1 Símbolo<br>- 1 Número",
                            placeholder: "Senha123@",
                            validation: function(value) {
                                var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
                                return regex.test(value);
                            },
                            errorMessage: "ERRO: Senha inválida!",
                            successMessage: "Senha Válida"
                        },
                        {
                            align: "end",
                            cols: [
                                {
                                    name: "loginSF",
                                    type: "button",
                                    size: "medium",
                                    view: "flat",
                                    circle: "true",
                                    text: "Entrar",
                                    color: "secondary"
                                },
                                {
                                    name: "signupSF",
                                    type: "button",
                                    padding: "0px 0px 0px 10px",
                                    size: "medium",
                                    view: "flat",
                                    circle: "true",
                                    submit: true,
                                    text: "Criar Conta"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "container",
                    html: `
                            <div style='display: flex; justify-content: center; align-items: center; height: 100%;'>
                                <img style='width: 300px; height: 300px; margin-left: 30px;' src='https://media.baamboozle.com/uploads/images/557138/1638721977_47847_gif-url.gif'>
                            </div>
                        `
                },
            ],
        },
    ],
})

const loginForm = new dhx.Form(null, {
    rows: [
        {
            type: "container",
            html: "<div style='display: flex; align-items: flex-end;'> <img style='width: 30px; height: 30px; margin-right: 10px' src='https://raw.githubusercontent.com/Moaps/images/f2b25d20b5f8e1ba57b50e19543f3a9a0b4d4703/pastel_logo.svg'><span style='font-size: 20px; font-weight: bold'>WeatherApp</span></div>"
        },
        {
            cols: [
                {
                    width: 380,
                    rows: [
                        {
                            padding: "20px 0px 0px 0px",
                            label: "Usuário",
                            type: "input",
                            name: "usuario",
                            placeholder: "Fulaninho12"
                        },
                        {
                            label: "Senha",
                            type: "input",
                            name: "pass",
                            inputType: "password",
                            placeholder: "Senha123@"
                        },
                        {
                            align: "end",
                            cols: [
                                {
                                    name: "signupLF",
                                    type: "button",
                                    size: "medium",
                                    view: "flat",
                                    circle: "true",
                                    text: "Criar Conta",
                                    color: "secondary"
                                },
                                {
                                    name: "loginLf",
                                    type: "button",
                                    padding: "0px 0px 0px 10px",
                                    size: "medium",
                                    view: "flat",
                                    circle: "true",
                                    submit: true,
                                    text: "Entrar"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "container",
                    html: `
                            <div style='display: flex; justify-content: center; align-items: center; height: 100%;'>
                                <img style='width: 250px; height: 200px;' src='https://cdn.myportfolio.com/bf9b0c2c-6f59-48fb-8339-8e9515c85bfd/44f2c95a-5186-44e8-851e-d305d0fcf754_rw_600.GIF?h=fc73348bea548bc594979d0cbeee1ebe'>
                            </div>
                        `
                },
            ],
        },
    ],
})

signWindow.attach(signupForm);
signWindow.show();

// Adicione um evento ao botão "Entrar" no signupForm
signupForm.getItem("loginSF").events.on("click", function() {
  signWindow.attach(loginForm);
  signWindow.setSize(800, 335)
});

// Adicione um evento ao botão "Criar Conta" no loginForm
loginForm.getItem("signupLF").events.on("click", function() {
  signWindow.attach(signupForm);
  signWindow.setSize(800, 500)
});

// Adicione um evento ao botão "Criar Conta" no loginForm
loginForm.getItem("loginLf").events.on("click", function() {
  signWindow.hide();
  mainWindow.show();
  mainWindow.setFullScreen();
});

const mainWindowHTML = "<div style='display: flex; align-items: flex-end;'> <img style='width: 30px; height: 30px; margin-right: 10px' src='https://raw.githubusercontent.com/Moaps/images/f2b25d20b5f8e1ba57b50e19543f3a9a0b4d4703/pastel_logo.svg'><span style='font-size: 20px; font-weight: bold'>WeatherApp</span></div>"
const mainWindow = new dhx.Window({
    closable: false,
    html: mainWindowHTML
});

const buttonForm = new dhx.Form(null, {
    rows: [
        {
            type: "container",
            html: "<div style='display: flex; align-items: flex-end;'> <img style='width: 30px; height: 30px; margin-right: 10px' src='https://raw.githubusercontent.com/Moaps/images/f2b25d20b5f8e1ba57b50e19543f3a9a0b4d4703/pastel_logo.svg'><span style='font-size: 20px; font-weight: bold'>WeatherApp</span></div>"
        },
        {
            cols: [
                {
                    name: "rating",
                    type: "button",
                    size: "medium",
                    view: "flat",
                    circle: "true",
                    text: "Avalie a previsão"
                },
                {
                    name: "newEvent",
                    type: "button",
                    padding: "0px 0px 0px 10px",
                    size: "medium",
                    view: "flat",
                    circle: "true",
                    text: "Crie um novo evento "
                }
            ]
        }
    ]
})

mainWindow.attach(buttonForm);

// Adicione um evento ao botão "Entrar" no signupForm
buttonForm.getItem("rating").events.on("click", function() {
  ratingWindow.show();
});

// Adicione um evento ao botão "Criar Conta" no loginForm
buttonForm.getItem("newEvent").events.on("click", function() {
  eventWindow.show();
});


// Cria uma nova instância do objeto Date para obter a data atual
const today = new Date();

// Formata a data no formato "dd/mm/yyyy"
const day = ("0" + today.getDate()).slice(-2); // Adiciona zero à esquerda, se necessário
const month = ("0" + (today.getMonth() + 1)).slice(-2); // Meses são de 0 a 11
const year = today.getFullYear();
const todayText = day + "/" + month + "/" + year;


/*
    POPUP - EVENTO IMPREVISTO
*/


// const windowHTML = "<p>Hoje, dd/mm/yy.</p><img style='display: block; width: 200px; height: 200px; margin-top: 20px; margin-left: auto; margin-right: auto' src='https://snippet.dhtmlx.com/codebase/data/common/img/01/developer-01.svg'>";
const eventWindow = new dhx.Window({
    width: 800,
    height: 327,
    title: "Registrar evento imprevisto - "+todayText,
    modal: true
});

const eventForm = new dhx.Form("form", {
    padding: 0,
    width: 800,
    rows: [
        {
            name: "selectEvent",
            type: "select",
            label: "Tipo de Evento",
            labelPosition: "top",
            labelWidth: 140,
            value: "0",
            required: true,
            validation: function(value) {
                return value !== "0";
            },
            errorMessage: "ERRO: Selecione um valor válido!",
            options: [
                {
                    value: "0",
                    content: ""
                },
                {
                    value: "1",
                    content: "Chuva"
                },
                {
                    value: "2",
                    content: "Chuva com Granizo"
                },
                {
                    value: "3",
                    content: "Tempestade"
                },
                {
                    value: "4",
                    content: "Tempestade de Neve"
                },
                {
                    value: "5",
                    content: "Tempestade com Granizo"
                },
                {
                    value: "6",
                    content: "Geada"
                },
                {
                    value: "7",
                    content: "Neve"
                },
                {
                    value: "8",
                    content: "Neblina Baixa"
                },
                {
                    value: "9",
                    content: "Ventania"
                },
                {
                    value: "10",
                    content: "Furacão ou Tufão"
                }
            ]
        },
        {
            name: "commentEvent",
            type: "textarea",
            label: "Comentário",
            required: false,
            labelWidth: 140,
            labelPosition: "top",
            height: "100px"
        },
        {
            align: "end",
            name: "salvarEvento",
            type: "button",
            submit: true,
            text: "Salvar",
            size: "medium",
            view: "flat",
            circle: true,
            color: "secondary",
            icon: "dxi dxi-content-save"
        }
    ]
});
eventWindow.attach(eventForm);

/*
    POPUP - Avaliação
*/

const ratingWindow = new dhx.Window({
    width: 800,
    height: 420,
    title: "Avalie a previsão - "+todayText,
    modal: true
});

const ratingForm = new dhx.Form("form", {
    padding: 0,
    width: 800,
    rows: [
        {
            name: "selectTemperature",
            type: "select",
            label: "Temperatura",
            labelPosition: "top",
            labelWidth: 140,
            value: "0",
            required: true,
            validation: function(value) {
                return value !== "0";
            },
            errorMessage: "ERRO: Selecione um valor válido!",
            options: [
                {
                    value: "0",
                    content: ""
                },
                {
                    value: "1",
                    content: "Previsão Correta"
                },
                {
                    value: "2",
                    content: "Previsão Incorreta"
                }
            ]
        },
        {
            name: "selectPluviosity",
            type: "select",
            label: "Pluviosidade",
            labelPosition: "top",
            labelWidth: 140,
            value: "0",
            required: true,
            validation: function(value) {
                return value !== "0";
            },
            errorMessage: "ERRO: Selecione um valor válido!",
            options: [
                {
                    value: "0",
                    content: ""
                },
                {
                    value: "1",
                    content: "Previsão Correta"
                },
                {
                    value: "2",
                    content: "Previsão Incorreta"
                }
            ]
        },
        {
            name: "commentRating",
            type: "textarea",
            label: "Comentário",
            required: false,
            labelWidth: 140,
            labelPosition: "top",
            height: "100px"
        },
        {
            align: "end",
            name: "salvarEvento",
            type: "button",
            submit: true,
            text: "Salvar",
            size: "medium",
            view: "flat",
            circle: true,
            color: "secondary",
            icon: "dxi dxi-content-save"
        }
    ]
});
ratingWindow.attach(ratingForm);
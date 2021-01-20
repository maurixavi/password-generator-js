(function () {
    var app = document.getElementById('app');
    var inputLength = document.getElementById('password-length');

    var config = {
        length: parseInt(inputLength.value),
        symbols: true,
        numbers: true,
        uppercaseLetters: true,
        lowercaseLetters: true
    }

    var characters = {
        symbols: '! ; # $ % & ( ) * + , - . / : ; < = > ? @ [ ] ^ _ { | } ~',
        numbers: '0 1 2 3 4 6 7 8 9',
        uppercaseLetters: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowercaseLetters: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    app.addEventListener('submit', function(e) {
       e.preventDefault(); 
    });

    /*Counters*/
    function increaseLengthCounter(){
        app.elements.namedItem('btn-decrease').addEventListener('click', function() {
            if (config.length > 8) {
                config.length--;
                inputLength.value = config.length;
                console.log(inputLength.value);
            }
        })
    }
    increaseLengthCounter()
    
    function decreaseLengthCounter(){
        app.elements.namedItem('btn-increase').addEventListener('click', function() {
            config.length++;
            inputLength.value = config.length;
            console.log(inputLength.value);
        })
    }
    decreaseLengthCounter()

    /*Buttons*/
    function btnChecker(){
        var buttons_lst = ['btn-symbols', 'btn-numbers', 'btn-uppercase'];
        for (let i = 0; i < buttons_lst.length; i++) {
            app.elements.namedItem(buttons_lst[i]).addEventListener('click', function() {
                console.log(app.elements.namedItem(buttons_lst[i]));
                btnToggle(this);
                switch (buttons_lst[i]) {
                    case 'btn-symbols':
                        config.symbols = !config.symbols;
                        break;
                    case 'btn-numbers':
                        config.numbers = !config.numbers;
                        break;
                    case 'btn-uppercase':
                        config.uppercaseLetters = !config.uppercaseLetters;
                        break;
                    default:
                        break;
                }
            })
        }
    }
    btnChecker()

    function btnToggle(element) {
        element.classList.toggle('false');
        element.childNodes[0].classList.toggle('fa-check'); //accede a <i class="fas fa-check"></i>
        element.childNodes[0].classList.toggle('fa-times');
    }

    /*Generate Password*/
    app.elements.namedItem('btn-generate').addEventListener('click', function(){
        generatePassword();
    });

    function generatePassword() {
        var passCharacters = '';
        var password = '';

        for(prop in config){
            if (config[prop] == true) { //valid type of input
                passCharacters += characters[prop] + ' ';
            }
        }
        
        passCharacters = passCharacters.trim().split(' ');
        console.log(passCharacters);

        for (let i = 0; i < config.length; i++) {
            var randomPos = Math.floor(Math.random() * passCharacters.length);
            password += passCharacters[randomPos]
        }
        //console.log(password);

        app.elements.namedItem('password-input').value = password;
        console.log(app.elements.namedItem('password-input').value);
    }

    generatePassword()

    /*Copy Password*/
    app.elements.namedItem('password-input').addEventListener('click', function() {
        copyPassword();
    });

    function copyPassword() {
        app.elements.namedItem('password-input').select();
        document.execCommand('copy');
        document.getElementById('copied-alert').classList.add('active');

        setTimeout(function() {
            document.getElementById('copied-alert').classList.remove('active');
        }, 2000)
    }

} ())
class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const isFieldsValid = this.validFields();
        const validPasswords = this.arePasswordsValid();

        if(isFieldsValid && validPasswords) {
            alert('Formulario enviado com sucesso');
            this.formulario.submit();
        }

    }

    arePasswordsValid(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repSenha = this.formulario.querySelector('.repSenha');

        if(senha.value !== repSenha.value){
            valid = false;
            this.createError(senha, 'Campo senha e repetir senha precisam ser iguais');
            this.createError(repSenha, 'Campo senha e repetir senha precisam ser iguais');
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.createError(senha, 'senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }


    validFields(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.errorText')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;
            if(!campo.value){
                this.createError(campo, `Campo "${label}" não pode estar vazio`);
                valid = false;
            }
            if(campo.classList.contains('cpf')){
                    if(!this.ValidaCPF(campo)) {
                        valid = false;
                    }
            }
            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) {
                    valid = false;
                }
        }
        }
        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;
        if(usuario.length > 12 || usuario.length < 3) {
            this.createError(campo, 'Usuario precisa ter entre 3 e 12 caracteres');
            valid = false;
        }
        if(!usuario.match(/[a-zA-Z0-9]+/g)) {
            this.createError(campo, 'Usuario so pode conter letras e numeros');
            valid = false;
        }
        return valid;
    }


    ValidaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.createError(campo, 'CPF invalido');
            return false;
        }

        return true;
    }


    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('errorText');
        campo.insertAdjacentElement('afterend', div);
        
    }

}

const valida = new ValidaFormulario();
const FormUtil = {
    getFormValues(form) {

        let data = {};

        let inputs = form.querySelectorAll("input,select,textarea");

        for (let input of inputs) {

            if (this.isButton(input)) {
                continue;
            }

            if (input instanceof HTMLInputElement && input.type === 'checkbox' && !input.checked) {
                continue;
            }

            let inputName = input["name"];
            let inputValue = input["value"];

            let datum = data[inputName];


            if (!datum) {
                data[inputName] = inputValue;
                continue;
            }

            if (datum instanceof Array) {
                datum.push(inputValue);
                continue;
            }

            data[inputName] = [data[inputName], inputValue];

        }

        return data;
    },
    isButton(el) {
        if (!el instanceof HTMLInputElement && !el instanceof HTMLButtonElement) {
            return false;
        }

        if (el instanceof HTMLButtonElement) {
            return true;
        }

        if (el instanceof HTMLInputElement && !!['submit', 'button', 'reset'].find(item => item === el.type)) {
            return true;
        }

        return false;


    }


}
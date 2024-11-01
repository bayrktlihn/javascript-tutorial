const ObjectUtil = {
    isNullOrUndefined(val) {
        return val === null || val === undefined;
    }
}

const FormInputUtil = {
    isButton(el) {
        if (!el instanceof HTMLInputElement || !el instanceof HTMLButtonElement) {
            return false;
        }

        if (el instanceof HTMLButtonElement) {
            return true;
        }

        if (el instanceof HTMLInputElement && ['submit', 'button', 'reset'].findIndex(item => item === el.type) < 0) {
            return true;
        }

        return false;
    },
    isCheckBox(el) {
        return el instanceof HTMLInputElement && el.type === 'checkbox'
    }
}


const FormUtil = {
    getFormValues(form) {

        if (ObjectUtil.isNullOrUndefined(form)) {
            return null;
        }

        let data = {};

        let inputs = form.querySelectorAll("input,select,textarea");

        for (let input of inputs) {

            if (FormInputUtil.isButton(input)) {
                continue;
            }

            if (FormInputUtil.isCheckBox(input) && !input.checked) {
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
    }


}
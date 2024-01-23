const formFields = [
    {
        name: 'selectedCurrency',
        label: 'Currency',
        required: true,
    },
    {
        name: 'amount',
        label: 'Amount',
        required: true,
    },
    {
        name: 'date',
        label: 'Date',
        required: true,
    },
    {
        name: 'purchasePrice',
        label: 'Purchase Price',
        required: true,
        pattern: /^[0-9]*[.,]?[0-9]+$/,
    },
];

function validateFormFields(formData) {
    const errors = {};

    formFields.forEach((field) => {
        if (field.required && !formData[field.name]) {
            errors[field.name] = `${field.label} is required`;
        }

        if (field.pattern && !field.pattern.test(formData[field.name])) {
            errors[field.name] = `Invalid ${field.label}`;
        }
    });

    return errors;
}

export default validateFormFields;

const trimFormValues = (formData) => {
    return Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    );
}

export default trimFormValues;

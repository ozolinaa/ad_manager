import React from "react";

export interface FormProps<T> {
    obj: T,
    fields: {
        fieldName: keyof T,
        getValidationMessage?: (input: string) => string
    }[],
    handlePartialUpdate: (partial: Partial<T>) => void
}

const Form = <T extends { [key: string]: any } >(props: FormProps<T>) => {

    const handleFieldChange = (fieldName: keyof T, updatedValue: unknown) => {
        const hasUpdatedFieldValue: Partial<T> = {};
        hasUpdatedFieldValue[fieldName] = updatedValue as T[keyof T];
        props.handlePartialUpdate(
            {
                ...props.obj,
                ...hasUpdatedFieldValue
            }
        );
    }

    return (
        <div>
            {props.fields.map(f => {
                return (
                    <div key={f.fieldName as string}>
                        <label>{f.fieldName}</label>
                        <input 
                            type={'text'} 
                            value={(props.obj[f.fieldName] as unknown as string || '').toString()}
                            onChange={(e) => {
                                handleFieldChange(f.fieldName, e.target.value)
                            }}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Form;

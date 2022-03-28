import React from "react";
import Form from "src/common/components/Form";
import { Tag } from "../../ad/types";

export interface ArrayFormManagerProps<T> {
    arr: T[],
    fields: {
        fieldName: keyof T,
        getValidationMessage?: (input: string) => string
    }[],
    handleUpdate: (updatedArr: T[]) => void
}

const ArrayFormManager = <T extends { [key: string]: any } >(props: ArrayFormManagerProps<T>) => {

    const handleDelete = React.useCallback((idx: number) => {
        props.arr.splice(idx, 1);
        props.handleUpdate(props.arr);
    }, [props.arr]);

    const handleUpdate = React.useCallback((idx: number, partial: Partial<T>) => {
        props.arr[idx] = {
            ...props.arr[idx],
            ...partial
        };
        props.handleUpdate([...props.arr]);
    }, [props.arr]);

    const handleAdd = React.useCallback(() => {
        props.handleUpdate([...props.arr, undefined as unknown as T]);
    }, [props.arr]);

    return (
        <div>
            {props.arr.map((item, idx) => {
                return(
                    <div key={idx} >
                        <Form 
                            obj={item || {}} 
                            fields={props.fields} 
                            handlePartialUpdate={(partialData) => {
                                handleUpdate(idx, partialData);
                            }}
                        />
                        <button onClick={() => handleDelete(idx)}>Delete</button>
                    </div>
                )
            })}
            <div>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default ArrayFormManager;

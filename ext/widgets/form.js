
import React, {useEffect} from 'react';
import {useForm, FormProvider, useFormContext, useFormState} from 'react-hook-form';
import {isString, isNil} from 'lodash';


export const formContext = useFormContext;

export function Form({onSubmit, className, style, options, children}) {
    const methods = useForm(options);

    return (
        <FormProvider {...methods} >
            <form className={className} style={style} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>

            <style jsx > {`
                form :global(input) {
                    border: 1px solid darkgray;
                    border-radius: 3px;                }
                form :global(input.invalid) {
                    border-color: red;
                    background-color: #fff8fa;
                }
                form :global(label) {
                    display: inline-block;
                }
            `}</style>

        </FormProvider>
    );
}

export function Input({label, name, ...props}) {
    const {register, control} = useFormContext();
    const {errors} = useFormState({control, name});
    const {required, maxLength, minLength, max, min, pattern, validate, title, ...rest} = props;
    const {text, ...labelProps} = isString(label) ? {text: label} : label;
    const inputCN = 'form-input' + (errors[name] ? ' invalid' : '');
    const ititle = errMsg(name, errors, props) || title;
    return (
        <div>
            <label className='form-label' htmlFor={name} title={title} {...labelProps}>{text}</label>
            <input {...{...rest, name, className:inputCN, title:ititle}} {...register(name, {required, maxLength, minLength, max, min, pattern, validate})} />
        </div>
    );
}

export function Select({label, name='', defaultValue,  ...props}) {
    const {register, control, setValue} = useFormContext();
    const {errors} = useFormState({control, name});
    const {options, onChange, title, ...rest} = props;
    const {text, ...labelProps} = isString(label) ? {text: label} : label;
    const inputCN = 'form-input' + (errors[name] ? ' invalid' : '');
    const ititle = errMsg(name, errors, props) || title;

    useEffect( () => {
        setValue(name, defaultValue || options?.[0]?.value);
    }, [name, options]);

    return (
        <div>
            <label className='form-label' htmlFor={name} title={title} {...labelProps}>{text}</label>
            <select {...rest} {...{name, className:inputCN, title: {ititle}}} {...register(name)} >
                {options?.map(({value, text}) => (
                    <option key={value} value={value}>{text || value}</option>
                ))}
            </select>
        </div>
    );
}

function errMsg(name, errors, props) {
    const {required, maxLength, minLength, max, min, pattern} = props;
    if (errors?.[name]) {
        let constrains = '';
        constrains += required ? 'Input is required' : 'Input is optional';
        constrains += isNil(max) ? '' : `\nValue must be less than ${max}`;
        constrains += isNil(min) ? '' : `\nValue must be greater than ${min}`;
        constrains += isNil(pattern) ? '' : `\nValue must match pattern: ${pattern}`;
        constrains += isNil(maxLength) ? '' : `\nValue must be less than ${maxLength} characters`;
        constrains += isNil(minLength) ? '' : `\nValue must be greater than ${minLength} characters`;
        return constrains;
    }
}
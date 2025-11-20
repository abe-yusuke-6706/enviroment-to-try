import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface forwardRefProps extends InputHTMLAttributes<HTMLInputElement> {
    // type?: string,
    // className?: string,
    isFocused?: boolean,
}

export interface focusRefProps {
    focus: () => void,
}

export default forwardRef<focusRefProps, forwardRefProps>(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
        />
    );
});

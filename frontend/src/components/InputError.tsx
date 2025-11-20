export default function InputError({ message, className = '', ...props } : {message?: string, className?: string}) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}

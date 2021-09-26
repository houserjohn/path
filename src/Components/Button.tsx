type callback_type = (e: any) => void

interface Button_Props {
    onClick: callback_type,
    children: string,
    mods: string,
}

const Button = (props: Button_Props) => {
    return (
        <button onClick={props.onClick} className={`${props.mods} px-1 w-auto text-gray-600 border shadow inline-block hover:bg-gray-200`} >
            {props.children}
        </button>
    );
}

export default Button;
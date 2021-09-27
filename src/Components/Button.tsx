type callback_type = (e: any) => void

interface Button_Props {
    onClick?: callback_type,
    children: string,
    mods?: string,
}

const Button = (props: Button_Props) => {
    return (
        <button onClick={props.onClick} className={`${props.mods} px-1 text-sm border shadow inline-block`} >
            {props.children}
        </button>
    );
}

export default Button;
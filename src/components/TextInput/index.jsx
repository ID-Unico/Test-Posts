import './styles.css'

export const TextInput = ({actionFn, inputValue}) => {

    return (
        <input 
            className ='textinput'
            onChange={actionFn}
            defaultValue={inputValue}
        />
    );
}
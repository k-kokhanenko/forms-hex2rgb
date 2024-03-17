import { useState } from "react"
import './style.css';

export const ColorConverter = () => {
    const initState = {
        hex : '',
        rgb: ''
    }

    const [form, setForm] = useState(initState);

    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    const validateColor = (str) => {
        if (str.startsWith("#") && str.length === 7) {
            let hex = str.substring(1);
            if (hex.match(/[0-9A-Fa-f]{6}/)) {
                return hexToRgb(hex);
            } else {
                return null;
            }
        } else {
            return null;
        }   
    }  
    
    const handleOnChange = ({target}) => {
        const { value } = target;

        let result = validateColor(value);
        let rgbValue = result ? `RGB(${result['r']}, ${result['g']}, ${result['b']})` : 'Ошибка!';

        if (result) {
            //const body = document.getElementsByTagName('body');
            document.body.style.background = rgbValue;
        }
                
        setForm (data=> ({...data, hex : value, rgb : rgbValue}));
    }

    return (    
        <form className='center-form'>
            <input id='hex' name='hex' value={form.hex} onChange={handleOnChange}/>
            <br/>
            <input id='rgb' name='rgb' value={form.rgb} readOnly/>
        </form>
    )
}

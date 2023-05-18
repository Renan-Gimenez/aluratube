import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
    const [values, setValues] = useState(propsDoForm.initialValues);

    return {
        values, 
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name
            setValues({
                ...values, 
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Davy Jones", url: "https://youtube.com" }
    });
    const [formVisivel, setFormVisivel] = useState(true);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)} >
                +
            </button>
            {formVisivel && (
                <form onSubmit={
                    (e) => e.preventDefault();
                    setFormVisivel(false);
                    formCadastro.clearForm();
                }>
                    <div>
                        <button className="close-modal" onClick={() => setFormVisivel(false)} >
                            X
                        </button>
                        <input 
                            placeholder="Título do vídeo" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange} 
                        />
                        <input 
                            placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url} 
                            onChange={formCadastro.handleChange} 
                        />
                        <button type="submit" >
                            Cadastrar
                        </button>
                    </div>
                </form>
            )}
        </StyledRegisterVideo>
    )
}

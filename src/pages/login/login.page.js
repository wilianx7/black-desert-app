import Axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8000/auth';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
        };
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    login = async (event) => {
        try {
            event.preventDefault();

            const response = await Axios.post(BASE_URL, { login: this.state.login, password: this.state.password });

            localStorage.setItem('user', JSON.stringify(
                {
                    id: response.data.user,
                    token: response.data.token
                }
            ));

            window.location.href = '/regioes';
        } catch (err) {
            toast.error('Credenciais inválidas');
        }
    }

    render() {
        return (
            <div className="h-screen w-screen bg-gray-200" style={{ backgroundImage: "url('login-wallpaper.jpg')" }}>
                <div className="flex h-full w-full justify-center items-center">
                    <div className="flex lg:shadow-lg w-full lg:w-4/12 lg:max-w-xl h-screen lg:h-auto bg-white mx-auto">
                        <div className="flex flex-col w-full p-4 lg:p-8 self-center">
                            <form className="flex w-full mx-auto" onSubmit={this.login}>
                                <div className="flex flex-col w-full">
                                    <p className="font-semibold text-xl text-gray-600 text-center">
                                        Entrar na Plataforma
                                    </p>

                                    <span className="mb-2 text-sm">Usuário:</span>
                                    <input className="block w-full" type="text" id="login" name="loginInput" onChange={this.handleInput} value={this.state.login} placeholder="Nome de usuário"></input>

                                    <span className="mt-3 mb-2 text-sm">Senha:</span>
                                    <input className="block w-full" type="password" id="password" name="passwordInput" onChange={this.handleInput} value={this.state.password} placeholder="Senha"></input>

                                    <button className="block w-full mt-4 bg-green-500" type="submit">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

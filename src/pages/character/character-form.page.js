import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CharacterForm from '../../components/character/character-form.component';

const BASE_URL = 'http://localhost:8000/characters';

export default class CharacterFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            id: '',
            name: '',
            primaryWeapon: '',
            secondaryWeapon: '',
            awakeningWeapon: ''
        };
    }

    componentDidMount() {
        const characterId = window.location?.search?.substr(4);

        if (characterId) {
            this.loadCharacterById(characterId)
                .then((character) => {
                    if (character) {
                        this.setState(
                            {
                                id: character._id,
                                name: character.name,
                                primaryWeapon: character.primaryWeapon,
                                secondaryWeapon: character.secondaryWeapon,
                                awakeningWeapon: character.awakeningWeapon
                            }
                        );
                    }
                });
        }
    }

    loadCharacterById = async (characterId) => {
        try {
            return (await Axios.get(`${BASE_URL}/${characterId}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            })).data;
        } catch (err) {
            toast.error('Houve um erro ao carregar o personagem');
        }
    }

    updateState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    save = async (event) => {
        try {
            event.preventDefault();

            const data = {
                name: this.state.name,
                primaryWeapon: this.state.primaryWeapon,
                secondaryWeapon: this.state.secondaryWeapon,
                awakeningWeapon: this.state.awakeningWeapon,
            };

            const headers = {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            };

            if (this.state.id) {
                await Axios.put(`${BASE_URL}/${this.state.id}`, data, headers);
            } else {
                await Axios.post(BASE_URL, data, headers);
            }

            window.location.href = '/personagens';
        } catch (err) {
            toast.error('Houve um erro ao salvar');
        }
    }

    render() {
        return (
            <div className="h-screen w-screen relative" style={{ backgroundColor: '#f0f0f0' }}>
                <div className="flex h-full w-full items-center">
                    <div className="flex md:shadow-lg w-full md:max-w-screen-xl h-screen md:h-auto bg-white mx-auto rounded-lg">
                        <div className="flex flex-col w-full self-center overflow-auto" style={{ maxHeight: '80vh' }}>
                            <div className="flex w-full text-blue-500 text-xl py-2 px-4 border-b items-center">
                                <svg className="self-center fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512">
                                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" /></svg>

                                <span className="ml-4 font-semibold text-lg">Formulário de Personagens</span>
                            </div>

                            <form onSubmit={this.save}>
                                <div className="p-4">
                                    <CharacterForm name={this.state.name} primaryWeapon={this.state.primaryWeapon} secondaryWeapon={this.state.secondaryWeapon}
                                        awakeningWeapon={this.state.awakeningWeapon} updateState={this.updateState}>
                                    </CharacterForm>
                                </div>

                                <div className="flex flex-wrap w-full px-4 pb-4 mt-4">
                                    <button type="submit" className="block md:w-64 w-full md:mb-0 mb-3 bg-green-500">
                                        Salvar
								    </button>

                                    <Link className="flex justify-center md:w-64 w-full md:ml-6 rounded focus:outline-none cursor-pointer bg-blue-500 text-white text-sm px-4 py-2"
                                        to="/personagens">
                                        Voltar
								    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

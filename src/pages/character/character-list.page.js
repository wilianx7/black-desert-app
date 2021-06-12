import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CharacterDatatable from '../../components/character/character-datatable.component';

const BASE_URL = 'http://localhost:8000/characters';

export default class CharacterListPage extends React.Component {
    constructor(props) {
        super(props);

        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            searchTerm: '',
            characters: []
        };
    }

    componentDidMount() {
        if (!this.AUTHENTICATED_USER?.token) {
            window.location.href = '/login';
        }

        this.getData();
    }

    getData = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}?limit=9999&name=${this.state.searchTerm}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            });

            this.setState({ characters: response.data });
        } catch (err) {
            toast.error('Não foi possível carregar a listagem');
        }
    }

    delete = async (character) => {
        try {
            await Axios.delete(`${BASE_URL}/${character._id}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            });

            toast.success('Excluído com sucesso!');
            this.getData();
        } catch (err) {
            toast.error('Houve um erro ao excluir o registro');
        }
    }

    handleSearch = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.getData();
        }, 500);
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

                                <span className="ml-4 font-semibold text-lg">Listagem de Personagens</span>

                                <div className="flex ml-auto text-gray-600 items-center justify-end text-sm">
                                    <input className="block mr-6" type="text" id="searchTerm" name="searchInput"
                                        onChange={this.handleSearch} value={this.state.searchTerm} placeholder="Pesquisar...">
                                    </input>

                                    <Link className="p-1 rounded-full hover:bg-green-500 cursor-pointer hover:text-white w-6 h-6"
                                        title="Cadastrar" to="/personagens/incluir">
                                        <svg className="self-center fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.4 0l-4.8 0 0 9.6 -9.6 0 0 4.8 9.6 0 0 9.6 4.8 0 0 -9.6 9.6 0 0 -4.8 -9.6 0 0 -9.6z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-4">
                                <CharacterDatatable characters={this.state.characters} delete={this.delete}></CharacterDatatable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import ItemForm from '../../components/item/item-form.component';

const BASE_URL = 'http://localhost:8000/items';

export default class ItemFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            id: '',
            name: '',
            attackPower: '',
            defensePower: '',
            precision: '',
            type: ''
        };
    }

    componentDidMount() {
        const itemId = window.location?.search?.substr(4);

        if (itemId) {
            this.loadItemById(itemId)
                .then((item) => {
                    if (item) {
                        this.setState(
                            {
                                id: item._id,
                                name: item.name,
                                attackPower: item.attackPower,
                                defensePower: item.defensePower,
                                precision: item.precision,
                                type: item.type,
                            }
                        );
                    }
                });
        }
    }

    loadItemById = async (itemId) => {
        try {
            return (await Axios.get(`${BASE_URL}/${itemId}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            })).data;
        } catch (err) {
            toast.error('Houve um erro ao carregar o item');
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
                attackPower: this.state.attackPower,
                defensePower: this.state.defensePower,
                precision: this.state.precision,
                type: this.state.type,
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

            window.location.href = '/itens';
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
                                <svg className="self-center fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M352.57 128c-28.09 0-54.09 4.52-77.06 12.86l12.41-123.11C289 7.31 279.81-1.18 269.33.13 189.63 10.13 128 77.64 128 159.43c0 28.09 4.52 54.09 12.86 77.06L17.75 224.08C7.31 223-1.18 232.19.13 242.67c10 79.7 77.51 141.33 159.3 141.33 28.09 0 54.09-4.52 77.06-12.86l-12.41 123.11c-1.05 10.43 8.11 18.93 18.59 17.62 79.7-10 141.33-77.51 141.33-159.3 0-28.09-4.52-54.09-12.86-77.06l123.11 12.41c10.44 1.05 18.93-8.11 17.62-18.59-10-79.7-77.51-141.33-159.3-141.33zM256 288a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" /></svg>

                                <span className="ml-4 font-semibold text-lg">Formulário de Itens</span>
                            </div>

                            <form onSubmit={this.save}>
                                <div className="p-4">
                                    <ItemForm name={this.state.name} attackPower={this.state.attackPower} defensePower={this.state.defensePower}
                                        precision={this.state.precision} type={this.state.type} updateState={this.updateState}>
                                    </ItemForm>
                                </div>

                                <div className="flex flex-wrap w-full px-4 pb-4 mt-4">
                                    <button type="submit" className="block md:w-64 w-full md:mb-0 mb-3 bg-green-500">
                                        Salvar
								    </button>

                                    <Link className="flex justify-center md:w-64 w-full md:ml-6 rounded focus:outline-none cursor-pointer bg-blue-500 text-white text-sm px-4 py-2"
                                        to="/itens">
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

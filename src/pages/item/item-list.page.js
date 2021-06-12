import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import ItemDatatable from '../../components/item/item-datatable.component';

const BASE_URL = 'http://localhost:8000/items';

export default class ItemListPage extends React.Component {
    constructor(props) {
        super(props);

        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            searchTerm: '',
            items: []
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
            const response = await Axios.get(`${BASE_URL}?limit=9999&type=${this.state.searchTerm}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            });

            this.setState({ items: response.data });
        } catch (err) {
            toast.error('Não foi possível carregar a listagem');
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

    delete = async (item) => {
        try {
            await Axios.delete(`${BASE_URL}/${item._id}`, {
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

    render() {
        return (
            <div className="h-screen w-screen relative" style={{ backgroundColor: '#f0f0f0' }}>
                <div className="flex h-full w-full items-center">
                    <div className="flex md:shadow-lg w-full md:max-w-screen-xl h-screen md:h-auto bg-white mx-auto rounded-lg">
                        <div className="flex flex-col w-full self-center overflow-auto" style={{ maxHeight: '80vh' }}>
                            <div className="flex w-full text-blue-500 text-xl py-2 px-4 border-b items-center">
                                <svg className="self-center fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M352.57 128c-28.09 0-54.09 4.52-77.06 12.86l12.41-123.11C289 7.31 279.81-1.18 269.33.13 189.63 10.13 128 77.64 128 159.43c0 28.09 4.52 54.09 12.86 77.06L17.75 224.08C7.31 223-1.18 232.19.13 242.67c10 79.7 77.51 141.33 159.3 141.33 28.09 0 54.09-4.52 77.06-12.86l-12.41 123.11c-1.05 10.43 8.11 18.93 18.59 17.62 79.7-10 141.33-77.51 141.33-159.3 0-28.09-4.52-54.09-12.86-77.06l123.11 12.41c10.44 1.05 18.93-8.11 17.62-18.59-10-79.7-77.51-141.33-159.3-141.33zM256 288a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" /></svg>

                                <span className="ml-4 font-semibold text-lg">Listagem de Itens</span>

                                <div className="flex ml-auto text-gray-600 items-center justify-end text-sm">
                                    <input className="block mr-6" type="text" id="searchTerm" name="searchInput"
                                        onChange={this.handleSearch} value={this.state.searchTerm} placeholder="Pesquisar...">
                                    </input>

                                    <Link className="p-1 rounded-full hover:bg-green-500 cursor-pointer hover:text-white w-6 h-6"
                                        title="Cadastrar" to="/itens/incluir">
                                        <svg className="self-center fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.4 0l-4.8 0 0 9.6 -9.6 0 0 4.8 9.6 0 0 9.6 4.8 0 0 -9.6 9.6 0 0 -4.8 -9.6 0 0 -9.6z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-4">
                                <ItemDatatable items={this.state.items} delete={this.delete}></ItemDatatable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

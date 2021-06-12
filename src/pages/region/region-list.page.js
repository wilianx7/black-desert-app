import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import RegionDatatable from '../../components/region/region-datatable.component';

const BASE_URL = 'http://localhost:8000/regions';

export default class RegionListPage extends React.Component {
    constructor(props) {
        super(props);

        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            searchTerm: '',
            regions: []
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

            this.setState({ regions: response.data });
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

    delete = async (region) => {
        try {
            await Axios.delete(`${BASE_URL}/${region._id}`, {
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
                                <svg className="self-center fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512">
                                    <path
                                        d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" /></svg>

                                <span className="ml-4 font-semibold text-lg">Listagem de Regiões</span>

                                <div className="flex ml-auto text-gray-600 items-center justify-end text-sm">
                                    <input className="block mr-6" type="text" id="searchTerm" name="searchInput"
                                        onChange={this.handleSearch} value={this.state.searchTerm} placeholder="Pesquisar...">
                                    </input>

                                    <Link className="p-1 rounded-full hover:bg-green-500 cursor-pointer hover:text-white w-6 h-6"
                                        title="Cadastrar" to="/regioes/incluir">
                                        <svg className="self-center fill-current" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.4 0l-4.8 0 0 9.6 -9.6 0 0 4.8 9.6 0 0 9.6 4.8 0 0 -9.6 9.6 0 0 -4.8 -9.6 0 0 -9.6z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-4">
                                <RegionDatatable regions={this.state.regions} delete={this.delete}></RegionDatatable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

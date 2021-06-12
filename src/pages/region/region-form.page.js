import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import RegionForm from '../../components/region/region-form.component';

const BASE_URL = 'http://localhost:8000/regions';

export default class RegionFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.AUTHENTICATED_USER = JSON.parse(localStorage.getItem('user'));

        this.state = {
            id: '',
            name: '',
            latitude: '',
            longitude: ''
        };
    }

    componentDidMount() {
        const regionId = window.location?.search?.substr(4);

        if (regionId) {
            this.loadRegionById(regionId)
                .then((region) => {
                    if (region) {
                        this.setState(
                            {
                                id: region._id,
                                name: region.name,
                                latitude: region.latitude,
                                longitude: region.longitude
                            }
                        );
                    }
                });
        }
    }

    loadRegionById = async (regionId) => {
        try {
            return (await Axios.get(`${BASE_URL}/${regionId}`, {
                headers: {
                    'Authorization': this.AUTHENTICATED_USER.token
                }
            })).data;
        } catch (err) {
            toast.error('Houve um erro ao carregar a região');
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
                latitude: this.state.latitude,
                longitude: this.state.longitude,
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

            window.location.href = '/regioes';
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
                                    viewBox="0 0 576 512">
                                    <path
                                        d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" /></svg>

                                <span className="ml-4 font-semibold text-lg">Formulário de Regiões</span>
                            </div>

                            <form onSubmit={this.save}>
                                <div className="p-4">
                                    <RegionForm name={this.state.name} latitude={this.state.latitude} longitude={this.state.longitude}
                                        updateState={this.updateState}>
                                    </RegionForm>
                                </div>

                                <div className="flex flex-wrap w-full px-4 pb-4 mt-4">
                                    <button type="submit" className="block md:w-64 w-full md:mb-0 mb-3 bg-green-500">
                                        Salvar
								    </button>

                                    <Link className="flex justify-center md:w-64 w-full md:ml-6 rounded focus:outline-none cursor-pointer bg-blue-500 text-white text-sm px-4 py-2"
                                        to="/regioes">
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

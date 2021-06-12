import React from 'react';
import { Link } from 'react-router-dom';

export default class RegionDatatableItem extends React.Component {
    render() {
        return (
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                <td className="border border-l-0 hover:bg-gray-100 py-2 px-4">
                    {this.props.region.name}
                </td>

                <td className="border border-l-0 hover:bg-gray-100 py-2 px-4">
                    {this.props.region.latitude}
                </td>

                <td className="border border-l-0 hover:bg-gray-100 py-2 px-4">
                    {this.props.region.longitude}
                </td>

                <td className="border border-l-0 hover:bg-gray-100 py-2 px-4">
                    <div className="flex items-center justify-center text-gray-600">
                        <Link className="p-1 rounded-full hover:bg-blue-500 cursor-pointer hover:text-white h-6 w-6 mx-1"
                            title="Editar" to={`/regioes/incluir?id=${this.props.region._id}`}>
                            <svg className="self-center fill-current" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M0 19l0 5 5 0 14.74 -14.74 -5 -5 -14.74 14.74zm23.61 -13.61c0.52,-0.52 0.52,-1.36 0,-1.88l-3.12 -3.12c-0.52,-0.52 -1.36,-0.52 -1.88,0l-2.44 2.44 5 5 2.44 -2.44z" />
                            </svg>
                        </Link>

                        <div className="p-1 rounded-full hover:bg-red-500 cursor-pointer hover:text-white w-6 h-6 mx-1"
                            title="Excluir" onClick={() => this.props.delete(this.props.region)}>
                            <svg className="self-center fill-current" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M4 21.33c0,1.47 1.2,2.67 2.67,2.67l10.66 0c1.47,0 2.67,-1.2 2.67,-2.67l0 -16 -16 0 0 16zm17.33 -20l-4.66 0 -1.34 -1.33 -6.66 0 -1.34 1.33 -4.66 0 0 2.67 18.66 0 0 -2.67z" />
                            </svg>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

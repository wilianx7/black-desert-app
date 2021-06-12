import React from 'react';

import RegionDatatableItem from './region-datatable-item.component';

export default class RegionDatatable extends React.Component {
    render() {
        const bodyData = this.props.regions.map(
            (region) => <RegionDatatableItem key={region._id} region={region} delete={this.props.delete}></RegionDatatableItem>
        );

        return (
            <table className="flex flex-row w-full flex-no-wrap overflow-hidden text-gray-800 shadow-lg text-sm"
                style={{ display: 'inline-table' }}>
                <thead>
                    <tr className="flex flex-col flex-no wrap text-white bg-gray-700 sm:table-row font-semibold">
                        <th className="py-2 px-4 border-r border-white text-left">Nome</th>

                        <th className="py-2 px-4 border-r border-white text-left">Latitude</th>

                        <th className="py-2 px-4 border-r border-white text-left">Longitude</th>

                        <th className="py-2 px-4 text-center">Ações</th>
                    </tr>
                </thead>

                <tbody className="flex-1 sm:flex-none">
                    {bodyData}
                </tbody>
            </table>
        );
    }
}

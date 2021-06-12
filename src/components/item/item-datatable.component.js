import React from 'react';

import ItemDatatableItem from './item-datatable-item.component';

export default class ItemDatatable extends React.Component {
    render() {
        const bodyData = this.props.items.map(
            (item) => <ItemDatatableItem key={item._id} item={item} delete={this.props.delete}></ItemDatatableItem>
        );

        return (
            <table className="flex flex-row w-full flex-no-wrap overflow-hidden text-gray-800 shadow-lg text-sm"
                style={{ display: 'inline-table' }}>
                <thead>
                    <tr className="flex flex-col flex-no wrap text-white bg-gray-700 sm:table-row font-semibold">
                        <th className="py-2 px-4 border-r border-white text-left">Nome</th>

                        <th className="py-2 px-4 border-r border-white text-left">Ataque</th>

                        <th className="py-2 px-4 border-r border-white text-left">Defesa</th>

                        <th className="py-2 px-4 border-r border-white text-left">Precisão</th>

                        <th className="py-2 px-4 border-r border-white text-left">Tipo</th>

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

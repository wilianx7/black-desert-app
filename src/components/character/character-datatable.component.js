import React from 'react';

import CharacterDatatableItem from './character-datatable-item.component';

export default class CharacterDatatable extends React.Component {
    render() {
        const bodyData = this.props.characters.map(
            (character) => <CharacterDatatableItem key={character._id} character={character} delete={this.props.delete}></CharacterDatatableItem>
        );

        return (
            <table className="flex flex-row w-full flex-no-wrap overflow-hidden text-gray-800 shadow-lg text-sm"
                style={{ display: 'inline-table' }}>
                <thead>
                    <tr className="flex flex-col flex-no wrap text-white bg-gray-700 sm:table-row font-semibold">
                        <th className="py-2 px-4 border-r border-white text-left">Nome</th>

                        <th className="py-2 px-4 border-r border-white text-left">Arma Principal</th>

                        <th className="py-2 px-4 border-r border-white text-left">Arma Secundária</th>

                        <th className="py-2 px-4 border-r border-white text-left">Arma Despertada</th>

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

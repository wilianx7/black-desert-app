import React from 'react';

export default class ItemForm extends React.Component {
    handleInput = (event) => {
        this.props.updateState(event.target.id, event.target.value);
    }

    render() {
        return (
            <div className="flex flex-col w-full">
                <span className="text-sm">Nome:</span>
                <input className="block w-full" type="text" id="name" name="nameInput" onChange={this.handleInput} value={this.props.name}
                    placeholder="Machado" required={true}>
                </input>

                <span className="mt-3 text-sm">Ataque:</span>
                <input className="block w-full" type="number" min='-999999999' max='9999999999' id="attackPower" name="attackPowerInput"
                    onChange={this.handleInput} value={this.props.attackPower} placeholder="44" step="any" required={true}>
                </input>

                <span className="mt-3 text-sm">Defesa:</span>
                <input className="block w-full" type="number" min='-999999999' max='9999999999' id="defensePower" name="defensePowerInput"
                    onChange={this.handleInput} value={this.props.defensePower} placeholder="55" step="any" required={true}>
                </input>

                <span className="mt-3 text-sm">Precisão:</span>
                <input className="block w-full" type="number" min='-999999999' max='9999999999' id="precision" name="precisionInput"
                    onChange={this.handleInput} value={this.props.precision} placeholder="120" step="any" required={true}>
                </input>

                <span className="mt-3 text-sm">Tipo:</span>
                <input className="block w-full" type="text" id="type" name="typeInput" onChange={this.handleInput} value={this.props.type}
                    placeholder="Arma principal" required={true}>
                </input>
            </div>
        );
    }
}

import React from 'react';

export default class CharacterForm extends React.Component {
    handleInput = (event) => {
        this.props.updateState(event.target.id, event.target.value);
    }

    render() {
        return (
            <div className="flex flex-col w-full">
                <span className="text-sm">Nome:</span>
                <input className="block w-full" type="text" id="name" name="nameInput" onChange={this.handleInput} value={this.props.name}
                    placeholder="Drackar" required={true}>
                </input>

                <span className="mt-3 text-sm">Arma Principal:</span>
                <input className="block w-full" type="text" id="primaryWeapon" name="primaryWeaponInput" onChange={this.handleInput}
                    value={this.props.primaryWeapon} placeholder="Espada" required={true}>
                </input>

                <span className="mt-3 text-sm">Arma Secundária:</span>
                <input className="block w-full" type="text" id="secondaryWeapon" name="secondaryWeapon" onChange={this.handleInput}
                    value={this.props.secondaryWeapon} placeholder="Escudo" required={true}>
                </input>

                <span className="mt-3 text-sm">Arma Despertada:</span>
                <input className="block w-full" type="text" id="awakeningWeapon" name="awakeningWeaponInput" onChange={this.handleInput}
                    value={this.props.awakeningWeapon} placeholder="Espada" required={true}>
                </input>
            </div>
        );
    }
}

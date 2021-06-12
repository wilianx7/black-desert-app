import React from 'react';

export default class RegionForm extends React.Component {
    handleInput = (event) => {
        this.props.updateState(event.target.id, event.target.value);
    }

    render() {
        return (
            <div className="flex flex-col w-full">
                <span className="text-sm">Nome:</span>
                <input className="block w-full" type="text" id="name" name="nameInput" onChange={this.handleInput} value={this.props.name}
                    placeholder="Heidel" required={true}>
                </input>

                <span className="mt-3 text-sm">Latitude:</span>
                <input className="block w-full" type="number" min='-999999999' max='9999999999' id="latitude" name="latitudeInput"
                    onChange={this.handleInput} value={this.props.latitude} placeholder="-44,542587" step="any" required={true}>
                </input>

                <span className="mt-3 text-sm">Longitude:</span>
                <input className="block w-full" type="number" min='-999999999' max='9999999999' id="longitude" name="longitudeInput"
                    onChange={this.handleInput} value={this.props.longitude} placeholder="22,542587" step="any" required={true}>
                </input>
            </div>
        );
    }
}

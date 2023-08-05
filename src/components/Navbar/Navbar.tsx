import * as React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import "./NavbarStyles.scss";

export interface INavbarProps {
    handleOnStart: () => void,
    handleOnClear: () => void,
    generateMaze:()=> void
}

export default function Navbar(props: INavbarProps) {
    const {
        handleOnStart,
        handleOnClear,
        generateMaze
    } = props;

    const startContent = (
        <React.Fragment>
            <Button label="Clear Grid" icon="pi pi-plus" className="mr-2" onClick={handleOnClear} />
            <Button label="Start" icon="pi pi-upload" className="p-button-success" onClick={handleOnStart}/>
            <Button label="generateMaze" icon="pi pi-upload" className="p-button-success" onClick={generateMaze}/>
        </React.Fragment>
    );

    return (
        <Toolbar
            className='navbar' 
            start={startContent} 
        />
    );
}

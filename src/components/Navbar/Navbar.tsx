import * as React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import "./NavbarStyles.scss";

export interface INavbarProps {
    handleOnStart: () => void,
    handleOnClear: () => void
}

export default function Navbar(props: INavbarProps) {
    const {
        handleOnStart,
        handleOnClear
    } = props;

    const startContent = (
        <React.Fragment>
            <Button label="Clear Grid" icon="pi pi-plus" className="mr-2" onClick={handleOnClear} />
            <Button label="Start" icon="pi pi-upload" className="p-button-success" onClick={handleOnStart}/>
        </React.Fragment>
    );

    return (
        <Toolbar
            className='navbar' 
            start={startContent} 
        />
    );
}

import * as React from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import "./NavbarStyles.scss";

export interface INavbarProps {
    handleOnStart: () => void,
    handleOnClear: () => void,
    generateMaze: () => void
}

export default function Navbar(props: INavbarProps) {
    const {
        handleOnStart,
        handleOnClear,
        generateMaze
    } = props;

    const startContent = (
        <React.Fragment>
            <h4 onClick={handleOnClear} className="title">PATH FINDER VISUALIZER</h4>
            {/* <div className='buttons-wrapper'>
                <Button label="generateMaze" icon="pi pi-upload" className="navbar-button" onClick={generateMaze} />
                <Button label="Start" icon="pi pi-upload" className="p-button-success visualize-button" onClick={handleOnStart} />
                <Button label="Clear Grid" icon="pi pi-plus" className="mr-2 navbar-button" onClick={handleOnClear} />
            </div> */}
        </React.Fragment>
    );

    const centerContent = (
        <React.Fragment>
            <Button label="Generate Maze" icon="pi pi-upload" className="navbar-button" onClick={generateMaze} />
            <Button label="Start" icon="pi pi-upload" className="p-button-success visualize-button" onClick={handleOnStart} />
            <Button label="Clear Grid" icon="pi pi-plus" className="mr-2 navbar-button" onClick={handleOnClear} />
        </React.Fragment>
    )

    const endContent = (
        <React.Fragment>
            <h4 onClick={handleOnClear} className="title">PATH FINDER VISUALIZER</h4>
        </React.Fragment>
    )


    return (
        <Toolbar
            className='navbar'
            start={startContent}
            center={centerContent}
            end={endContent}
        />
    );
}

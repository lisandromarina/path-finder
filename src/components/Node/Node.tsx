import React from 'react';
import "./NodeStyles.scss"

export interface INodeProps {
    column: number
    row: number,
    isVisited: boolean,
    isWall: boolean,
    isStart: boolean,
    isFinish: boolean,
    distance: number,
    handleOnDown: (column: number, row: number) => void,
    handleOnUp: () => void,
    handleOnEnter: (column: number, row: number) => void
}

export default function Node(props: INodeProps) {
    const {
        row,
        column,
        /* isVisited,
        distance, */
        isWall,
        isStart,
        isFinish,
        handleOnDown,
        handleOnUp,
        handleOnEnter
    } = props;

    const extraClassName = isFinish
        ? 'node-finish'
        : isStart
            ? 'node-start'
            : isWall
                ? 'node-wall'
                : '';

    return (
        <div
            id={`node-${row}-${column}`}
            className={'node ' + extraClassName}
            onMouseDown={() => handleOnDown(column, row)}
            onMouseUp={handleOnUp}
            onMouseEnter={() => handleOnEnter(column, row)}
        >
        </div>
    );
}


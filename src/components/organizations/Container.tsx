import React from 'react'
import { DivProps } from '../../types/element'

export interface ContainerProps {
    rootProps?: DivProps
    innerDivProps?: DivProps
    children?: DivProps['children']
};

const Container: React.FC<ContainerProps> = ({ rootProps, innerDivProps, children }) => {
    return (
        <div
            {...rootProps}
            className={(rootProps?.className || '') + ' flex justify-center mt-10'}
        >
            <div
                {...innerDivProps}
                className={(innerDivProps?.className || '') + ' container'}
            >
                {children}
            </div>
        </div>
    )
}

export default Container
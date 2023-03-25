import React from 'react'
import { 
    GridColumnMenuContainer,
    GridColumnMenuFilterItem, 
    GridColumnMenuHideItem

    } from '@mui/x-data-grid'

const CustomColumnMenu = (props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
        <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}

        >
            <GridColumnMenuFilterItem 
            colDef={currentColumn}
            onClick={hideMenu}
            //  column={currentColumn}

             />
            <GridColumnMenuHideItem 
                colDef={currentColumn}
                onClick={hideMenu}
            //  onClick={hideMenu} column={currentColumn}
            // onClick={hideMenu} column={currentColumn}
            // colDef={colDef} 
            
            />

        </GridColumnMenuContainer>
    )
}

export default CustomColumnMenu
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, InputAdornment } from '@mui/material'
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from 'components/Flexbox/FlexBetween';

const DataGridCustomToolbar = (
    {searchInput, setSearchInput, setSearch}
    ) => {
  return (
    <div>
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>

                <TextField 
                label = "Search..."
                sx={{mb: "0.5rem", width:"15rem"}}
                onChange= {(e) => setSearchInput(e.target.value)}
                value={searchInput}
                variant="standard"
                InputProps = {{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => {
                                setSearch(searchInput);
                                setSearchInput("");
                            }} >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    </div>
  )
}

export default DataGridCustomToolbar
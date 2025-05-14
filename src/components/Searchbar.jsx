import React from 'react'
import { Paper, InputBase, Box, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {

  return (

    <Box sx={{
      height: "60px",
      bgcolor: "snow",
      display: "flex",
      justifyContent: "center"
    }}>

  
      <Paper
        sx={{
          width: "30%",
          bgcolor: "snow",
          mt: "15px",
          padding: "8px",
          display: "flex",
          justifyContent: "space-between"
        }} elevation={10}>

        <InputBase placeholder='Pesquise' fullWidth></InputBase>

        <SearchIcon color='primary' sx={{ fontSize: "30px"}} />
      </Paper>

    </Box>

  )
}

export default Searchbar

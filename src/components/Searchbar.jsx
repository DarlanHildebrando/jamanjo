import React, { useContext, useState } from 'react'
import { Paper, InputBase, Box, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { GlobalContext } from '../contexts/GlobalContext';

function Searchbar() {

  const {search} = useContext(GlobalContext)

  function handleSearch(value){

    search(value)

  }

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

        <InputBase placeholder='Pesquise' fullWidth onChange={(e) => {const value = e.target.value; handleSearch(value);}}></InputBase>

        <SearchIcon color='primary' sx={{ fontSize: "30px"}}/>

      </Paper>

    </Box>

  )
}

export default Searchbar

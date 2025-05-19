import React, { useContext } from 'react';
import { Paper, InputBase, Box, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalContext } from '../contexts/GlobalContext';

function Searchbar() {
  const { search } = useContext(GlobalContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSearch(value) {
    search(value);
  }

  return (
    <Box
      sx={{
        height: 'auto',
        bgcolor: 'snow',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '10px',
        mb: '10px',
        position: 'relative',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '600px',
          bgcolor: 'snow',
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
          height: isMobile ? '50px' : '60px',
        }}
        elevation={10}
      >
        <InputBase
          placeholder="Pesquise aqui..."
          fullWidth
          sx={{
            fontSize: isMobile ? '16px' : '18px',
          }}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <SearchIcon
          color="secondary"
          sx={{
            fontSize: isMobile ? '24px' : '30px',
            ml: 1,
          }}
        />
      </Paper>
    </Box>
  );
}

export default Searchbar;

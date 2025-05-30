import React, { useContext, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
import { GlobalContext } from '../contexts/GlobalContext';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import Searchbar from './Searchbar';
import NotFound from './NotFound';


// Componente Card envolvido com motion
const MotionCard = motion.create(({ resource, ...rest }) => (
  <div {...rest}>
    <Card r={resource} />
  </div>
));

function Body() {
  const { categories, resources, handleFilter, filteredResources, setFilteredBySearch } = useContext(GlobalContext);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchNotFound, setNotFound] = useState(false);


  // Calculando colunas responsivas
  const getColumnCount = () => {
    if (window.innerWidth < 600) return 1; // xs
    if (window.innerWidth < 960) return 2; // sm
    if (window.innerWidth < 1280) return 3; // md
    return 4; // lg e acima
  };

  const [columns, setColumns] = useState(getColumnCount());

  // Gerenciar redimensionamento
  useEffect(() => {
    // console.log("===================================");
    console.log("***********************************");
    console.log("Que bom te ver por aqui!!!");
    console.log("Agora aproveita e visita o repositório: https://github.com/rafaellindemann/jamanjo")
    console.log("Deixa uma estrelinha bonitinha lá pro tio :D");
    console.log("***********************************");
    // console.log("===================================");

    const handleResize = () => {
      setColumns(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gerenciar filteredResources e carregamento inicial
  useEffect(() => {
    if (isInitialLoad) {
      // Carregamento inicial - mostrar todos os itens sem animação de scroll
      setVisibleItems(filteredResources);
      setIsInitialLoad(false);
    } else {
      // Mudança de filtro - reset e animação
      setVisibleItems([]);
      
      // Pequena pausa antes de mostrar os novos itens
      const timer = setTimeout(() => {
        setVisibleItems(filteredResources);
        setNotFound(filteredResources.length === 0);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [filteredResources, isInitialLoad]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05, // Reduzido para acelerar a animação
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <Box
      sx={{
        bgcolor: 'snow',
        color: 'text.primary',
        minHeight: '100vh',
        py: 3,
        // borderLeft: '30px solid #6B8E23',
        // borderRight: '30px solid #4caf50',
        // borderBottom: '30px solid #4caf50',
        px: { xs: 2, sm: 4 },
        // boxShadow: 'inset 0px 0px 10px 10px #8B4513',
        // boxShadow: 'inset 0px 0px 10px 10px #6B8E23',
        // borderRadius: 20,
        boxShadow: 'inset 0px 0px 20px 10px #6B8E23'
      }}
    >

      <Searchbar />

      <Container maxWidth="xl">
        <AnimatePresence>

  {/*Renderização condicional, searchNotFound muda de estado com setNotFound(filteredResources.length === 0); 
  no UseEffect monitorado por filteredResources e IsInitiaLoad*/}
  {searchNotFound ? (
    //Caso searchbar não encontre nenhuma informação, exibe componente de não encontrado (NotFound)
    //Não é adicionada dentro de mansory pois suas propriedades afetam negativamente o componente NotFound
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <NotFound />
    </Box>
  ) : (
    //Mansory só é renderizada caso visibleItems.length seja maior que 0
    <Masonry columns={columns} spacing={2}>
      {visibleItems.map((resource, index) => (
        <MotionCard
          key={resource.id}
          resource={resource}
          custom={Math.min(index, 10)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cardVariants}
          layout
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        />
      ))}
    </Masonry>
  )}
</AnimatePresence>

      </Container>
    </Box>
  );
}

export default Body;


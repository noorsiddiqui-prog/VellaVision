import React, {useEffect, useState} from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, rating, useTheme, useMediaQuery, Rating, CardMedia, CircularProgress} from "@mui/material";
import { useGetProductsQuery } from 'state/api/api';
import Header from 'components/Header';
import { useSelector } from 'react-redux';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  imageUrl
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.default,
      borderRadius: '0.75rem',
      boxShadow: theme.shadows[5],
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[10],
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={name}
        sx={{ borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem", objectFit: 'cover' }}
      />
      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.secondary.main, mb: 1 }}
        >
          {category}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 1 }}
        >
          {name}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, mb: 1 }}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly sx={{ mb: 1 }} />
        <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant='contained' color='primary' size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'See More'}
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ bgcolor: theme.palette.background.paper }}>
          <Typography variant="body2">ID: {_id}</Typography>
          <Typography variant="body2">Supply: {supply}</Typography>
          <Typography variant="body2">Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography variant="body2">Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const searchValue = useSelector((state) => state.global.searchValue);
  const [filteredData, setFilteredData] = useState()

  useEffect(() => {
    if(searchValue){
      const filtered = data.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredData(filtered)
      return () => {
        // Clean up when searchValue changes
        // (e.g., reset filteredData back to original data)
        // filteredData = data;
      }
    }
  }, [searchValue])

  const dataSource = searchValue ? filteredData : data;

  return (
    <Box>
      <Box m="1.5rem 2.5rem">
        <Header title="Products" subTitle="See your list of products" />
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <Box 
            mt="20px" 
            display="grid" 
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap="20px"
          >
            {dataSource && dataSource.length > 0 ? (
              dataSource.map(({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat,
                image
              }) => (
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat}
                  imageUrl={image}
                />
              ))
            ) : (
              <Typography variant="h6" color="textSecondary">
                No products available
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Products

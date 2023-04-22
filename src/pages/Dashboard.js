import React, { Fragment } from "react";
import BasicCard from "../components/BasicCard";
import { Stack, Container, Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { fetchTotalCustomers, fetchTotalSales, fetchTotalProducts } from './db.js';

const Dashboard = () => {
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        const totalCustomersData = await fetchTotalCustomers();
        setTotalCustomers(totalCustomersData);
  
        const totalSalesData = await fetchTotalSales();
        setTotalSales(totalSalesData);
  
        const totalProductsData = await fetchTotalProducts();
        setTotalProducts(totalProductsData);
      };
  
      fetchData();
    }, []);
  
    const fetchTotalCustomers = () => {
      const query = 'SELECT COUNT(*) as total_customers FROM customers';
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) reject(error);
          else resolve(results[0].total_customers);
        });
      });
    };
    
    const fetchTotalSales = () => {
      const query = 'SELECT SUM(price) as total_sales FROM products_sold';
      return new Promise((resolve, reject) => {
        DataTransfer.query(query, (error, results) => {
          if (error) reject(error);
          else resolve(results[0].total_sales);
        });
      });
    };
    
    const fetchTotalProducts = () => {
      const query = 'SELECT COUNT(*) as total_products FROM products';
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) reject(error);
          else resolve(results[0].total_products);
        });
      });
    };
 
  return (
    <Fragment>
      <Container>
        <Box mt={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}>
            <BasicCard title="CUSTOMERS' DATA" data="1000" />
            <BasicCard title="PRODUCTS ON HAND" data="1000" />
            <BasicCard title="TOTAL SALES" data="1000" />
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
};


export default Dashboard;

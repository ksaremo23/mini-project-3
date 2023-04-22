import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/dashboard')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
           <h3>Total Customers</h3> 
          </Typography>
          <Typography variant="h5" component="h2">
            {data.total_customers}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <h3>Total Sales</h3>
          </Typography>
          <Typography variant="h5" component="h2">
            {data.total_sales}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <h3>Total Products</h3>
          </Typography>
          <Typography variant="h5" component="h2">
            {data.total_products}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

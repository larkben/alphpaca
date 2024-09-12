"use client"

import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Avatar, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar alt="User Profile" src="/path/to/userimage.jpg" sx={{ width: 100, height: 100, margin: 'auto' }} />
          <Typography variant="h5" style={{ marginTop: '10px' }}>User Name</Typography>
          <Typography variant="body2">Crypto Address: 0x1234567890abcdef</Typography>
        </Grid>
      </Grid>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab label="Owned NFTs" />
          <Tab label="Active Battles" />
          <Tab label="NFTs to Upgrade" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* Here you would list or display the NFTs */}
        <Typography>List of your NFTs would go here.</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Display active battles */}
        <Typography>Your active battles are listed here.</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Display NFTs that need upgrading */}
        <Typography>NFTs ready for upgrade are shown here.</Typography>
      </TabPanel>
    </div>
  );
};

export default Dashboard;
"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Dialog, 
  DialogTitle, 
  DialogContent as MuiDialogContent, 
  DialogActions, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Chip, 
  Button, 
  Grid 
} from "@mui/material";
import { DollarSign, RefreshCw } from "lucide-react";

type NFT = {
  id: number;
  name: string;
  image: string;
  category: "sale" | "update" | "inventory";
  price?: number;
  lastUpdated?: string;
  rarity?: string;
  collection?: string;
};

type TabValue = "sale" | "update" | "inventory";
const categories: TabValue[] = ['sale', 'update', 'inventory'];

export function SimplifiedNftProfileViewer() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [value, setValue] = useState('sale');

  const user = {
    name: "Satoshi Nakamoto",
    username: "@satoshi",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    nfts: [
      { id: 1, name: "CryptoPunk #3100", image: "/placeholder.svg?height=300&width=300", category: "sale", price: 1000, rarity: "Rare", collection: "CryptoPunks" },
      { id: 2, name: "Bored Ape #7495", image: "/placeholder.svg?height=300&width=300", category: "update", lastUpdated: "2023-05-15", rarity: "Legendary", collection: "Bored Ape Yacht Club" },
      // ... other NFTs
    ] as NFT[]
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderNFTGrid = (category: NFT["category"]) => (
    <Grid container spacing={2}>
      {user.nfts.filter(nft => nft.category === category).map((nft) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={nft.id}>
          <Card onClick={() => setSelectedNFT(nft)} style={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              height="194"
              image={nft.image}
              alt={nft.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {nft.name}
              </Typography>
              {nft.category === "sale" && <Typography variant="body2" color="text.secondary">Price: {nft.price} ETH</Typography>}
              {nft.category === "update" && <Typography variant="body2" color="text.secondary">Last Updated: {nft.lastUpdated}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: 2 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'start' }, gap: 2 }}>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" component="div" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.username}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab 
          label="Listed on Sale" 
          value="sale" 
          sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
        />
      <Tab 
          label="Need Update" 
          value="update" 
          sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
        />
      <Tab 
          label="Inventory" 
          value="inventory" 
          sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
        />
      </Tabs>

      {categories.map((category) => (
      <TabPanel value={value} index={category} key={category}>
        <Typography variant="h5" gutterBottom>
          NFTs {category === 'sale' ? 'Listed on Sale' : category === 'update' ? 'That Need Update' : 'in Inventory'}
        </Typography>
        {renderNFTGrid(category)}
      </TabPanel>
      ))}

      <Dialog open={!!selectedNFT} onClose={() => setSelectedNFT(null)}>
        <DialogTitle>{selectedNFT?.name}</DialogTitle>
        <MuiDialogContent>
          <img src={selectedNFT?.image} alt={selectedNFT?.name} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px' }} />
          <Chip label={selectedNFT?.rarity} style={{ marginTop: '10px' }} />
          {selectedNFT?.category === "sale" && <Typography variant="h6">Price: {selectedNFT.price} ETH</Typography>}
          {selectedNFT?.category === "update" && <Typography variant="body2" color="text.secondary">Last Updated: {selectedNFT.lastUpdated}</Typography>}
        </MuiDialogContent>
        <DialogActions>
          {selectedNFT?.category === "sale" && <Button onClick={() => setSelectedNFT(null)} startIcon={<DollarSign />}>Cancel Listing</Button>}
          {selectedNFT?.category === "update" && <Button onClick={() => setSelectedNFT(null)} startIcon={<RefreshCw />}>Update NFT</Button>}
          {selectedNFT?.category === "inventory" && <Button onClick={() => setSelectedNFT(null)} startIcon={<DollarSign />}>List for Sale</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function TabPanel(props: { children?: React.ReactNode; index: any; value: any; }) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
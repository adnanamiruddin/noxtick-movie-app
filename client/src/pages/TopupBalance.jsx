import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TopupModal from "../components/common/TopupModal";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const amounts = [
  { value: 50000, label: "Rp 50.000" },
  { value: 75000, label: "Rp 75.000" },
  { value: 100000, label: "Rp 100.000" },
  { value: 150000, label: "Rp 150.000" },
  { value: 200000, label: "Rp 200.000" },
  { value: 500000, label: "Rp 500.000" },
  { value: 750000, label: "Rp 750.000" },
  { value: 1000000, label: "Rp 1.000.000" },
  { value: 1500000, label: "Rp 1.500.000" },
];

const TopupBalance = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
  };

  const handleClose = () => setIsTopupModalOpen(false);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="700" marginBottom={4} textAlign="center">
            SELECT THE NOMINAL
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            sx={{ gap: { xs: 2, md: 3 } }}
          >
            {amounts.map((amount) => (
              <Button
                key={amount.value}
                variant="contained"
                onClick={() => handleAmountSelection(amount.value)}
                sx={{
                  flexBasis: { xs: "75%", sm: "45%", md: "30%" },
                  backgroundColor: "secondary.main",
                  padding: 2,
                  fontSize: "1rem",
                  ...uiConfigs.style.typoLines(1, "center"),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <AttachMoneyOutlinedIcon sx={{ fontSize: "2rem" }} />
                {amount.label}
              </Button>
            ))}
          </Box>

          {selectedAmount ? (
            <Box
              marginTop={4}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 3,
              }}
            >
              <Typography variant="h6" fontWeight="500">
                Selected Nominal: RP {selectedAmount.toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setIsTopupModalOpen(true)}
              >
                Top Up
              </Button>
            </Box>
          ) : (
            ""
          )}

          <TopupModal
            open={isTopupModalOpen}
            onClose={handleClose}
            selectedAmount={selectedAmount}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TopupBalance;

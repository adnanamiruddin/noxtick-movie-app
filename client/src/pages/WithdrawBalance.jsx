import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import WithdrawModal from "../components/common/WithdrawModal";
import Container from "../components/common/Container";
import UserDetail from "../components/common/UserDetail";
import uiConfigs from "../configs/ui.configs";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const nominals = [
  { value: 50000, label: "Rp 50.000" },
  { value: 75000, label: "Rp 75.000" },
  { value: 100000, label: "Rp 100.000" },
  { value: 150000, label: "Rp 150.000" },
  { value: 200000, label: "Rp 200.000" },
  { value: 500000, label: "Rp 500.000" },
];

const WithdrawBalance = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  const handleAmountButtonClick = (value) => {
    setSelectedAmount(value);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container>
        <UserDetail />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="700" textAlign="center">
            SELECT THE NOMINAL TO WITHDRAW
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          sx={{ gap: { xs: 2, md: 3 } }}
        >
          {nominals.map((nominal) => (
            <Button
              key={nominal.value}
              variant={selectedAmount === nominal.value ? "contained" : "outlined"}
              fullWidth
              onClick={() => handleAmountButtonClick(nominal.value)}
              sx={{
                flexBasis: { xs: "75%", sm: "45%", md: "30%" },
                padding: 2,
                fontSize: "1rem",
                ...uiConfigs.style.typoLines(1, "center"),
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <AttachMoneyOutlinedIcon sx={{ fontSize: "2rem" }} />
              <Typography variant="h6">{nominal.label}</Typography>
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            padding: 4,
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2.5,
          }}
        >
          <Typography variant="caption" textAlign="center" fontStyle="italic">
            Note: You can also enter a manual amount to withdraw
          </Typography>

          <TextField
            type="number"
            label="Amount"
            variant="outlined"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)}
            inputProps={{ inputProps: { min: 0, max: 500000 } }}
            sx={{ width: "50%", fontWeight: 700 }}
          />

          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{ height: 55, width: "max-content", padding: "0 2rem" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Withdraw
            </Typography>
          </Button>
        </Box>

        <WithdrawModal
          open={isModalOpen}
          onClose={handleClose}
          selectedAmount={selectedAmount}
        />
      </Container>
    </Box>
  );
};

export default WithdrawBalance;

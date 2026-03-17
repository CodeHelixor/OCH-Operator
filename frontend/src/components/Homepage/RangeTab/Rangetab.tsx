import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Rangechangebox from "./Rangechangebox";
import Rangetable from "./Rangetable";
import { RangeTabProps } from "./types";

const Rangetab = ({ ranges, visible, onSearch }: RangeTabProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-1 flex-col min-h-0" style={{ display: visible }}>
      <div className="mt-3 mb-3 w-full max-w-full lg:max-w-[55%] ml-0 flex flex-col flex-shrink-0">
        <div className="flex justify-start mb-2 ml-8">
          <Button
            variant="contained"
            color="primary"
            onClick={openModal}
            sx={{ whiteSpace: "nowrap", px: 3, py: 1.5 }}
          >
            Click here to manage range
          </Button>
        </div>
      </div>
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        aria-labelledby="manage-range-dialog-title"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle id="manage-range-dialog-title" sx={{ m: 0, p: 2, pb: 0 }}>
          Manage range
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1.5, px: 2, pb: 2 }}>
          <Rangechangebox />
        </DialogContent>
      </Dialog>
      <Box sx={{ px: 4, pt: 3, pb: 1, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }} className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <Rangetable ranges={ranges} onSearch={onSearch} />
      </Box>
    </div>
  );
};

export default Rangetab;

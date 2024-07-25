import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import axios from "axios";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toast";

interface ReportActionModalProps {
  open: boolean;
  onClose: () => void;
  hotelId: string;
  ownerId: string;
  id: string;
}

const ReportActionModal: React.FC<ReportActionModalProps> = ({
  open,
  onClose,
  hotelId,
  ownerId,
  id,
}) => {
  console.log(hotelId,"hotel",ownerId,"owner",id,"idddd");
  
  const handleAction = async (url: string, action: string) => {
    try {
      await axios.patch(url);
      await updateReporting(action);
      onClose();
    } catch (error:any) {
      showToast(error.response?.data?.message || `Failed to ${action}`, "error");
    }
  };

  const updateReporting = async (action: string) => {
    try {
      const response = await axios.patch(`${ADMIN_API}/updateReporting/${id}`, {
        action,
      });
      console.log(response.data);
      
      showToast(response.data.message, "success");
    } catch (error:any) {
      showToast(error.response?.data?.message || "Failed to update reporting", "error");
    }
  };

  const handleHotelBlock = () => handleAction(`${ADMIN_API}/block_hotel/${hotelId}`, "blocked Hotel");
  const handleOwnerBlock = () => handleAction(`${ADMIN_API}/block_user/${ownerId}`, "blocked Owner");

  return (
    <Dialog
      open={open}
      handler={onClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Action Required</DialogHeader>
      <DialogBody>Please take an appropriate action on this report.</DialogBody>
      <MenuItem className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md" onClick={handleOwnerBlock}>
        <img
          src="https://docs.material-tailwind.com/icons/metamask.svg"
          alt="metamask"
          className="h-6 w-6"
        />
        <Typography className="uppercase" color="blue-gray" variant="h6">
          Block the Owner
        </Typography>
      </MenuItem>
      <MenuItem className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md" onClick={handleHotelBlock}>
        <img
          src="https://docs.material-tailwind.com/icons/coinbase.svg"
          alt="coinbase"
          className="h-6 w-6 rounded-md"
        />
        <Typography className="uppercase" color="blue-gray" variant="h6">
          Block the Hotel
        </Typography>
      </MenuItem>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReportActionModal;

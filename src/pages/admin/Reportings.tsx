import axios from "axios";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Button } from "@material-tailwind/react";
import ReportActionModal from "../../components/admin/ReportingModal";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toast";

interface Report {
  _id: string;
  userId: { name: string };
  hotelId: { name: string; _id: string; ownerId: string };
  bookingId: { checkInDate: string; checkOutDate: string };
  reason: string;
  action: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [state, changState] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const { data} = useSWR(`${ADMIN_API}/reportings`, fetcher);

  useEffect(() => {
    if (data) {
      setReports(data.result);
    }
  }, [data,state]);

  const handleOpen = (report: Report) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  const handleReject = async (id: string) => {
    try {
      const response = await axios.patch(`${ADMIN_API}/updateReporting/${id}`, {
        action: "rejected",
      });
      console.log(response.data);
      
      showToast(response.data.message, "success");
changState(!state);
    } catch (err:any) {
      showToast(err.response.data.message, "error");
    }
  };
console.log(selectedReport,"selected.........");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Username</th>
            <th className="py-2">Hotel Name</th>
            <th className="py-2">Check In</th>
            <th className="py-2">Check Out</th>
            <th className="py-2">Reason</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report:any) => (
            <tr key={report.id} className="text-center">
              <td className="py-2">{report.userId.name}</td>
              <td className="py-2">{report.hotelId.name}</td>
              <td className="py-2">
                {new Date(report.bookingId.checkInDate).toLocaleDateString()}
              </td>
              <td className="py-2">
                {new Date(report.bookingId.checkOutDate).toLocaleDateString()}
              </td>
              <td className="py-2">{report.reason}</td>
              <td className="py-2 flex justify-center gap-2">
                {report.action === "pending" ? (
                  <>
                    <Button
                      onClick={() => handleOpen(report)}
                      color="green"
                      variant="gradient"
                    >
                      Take Action
                    </Button>
                    <Button
                      onClick={() => handleReject(report._id)}
                      color="red"
                      variant="gradient"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <span className="text-lg">{report.action}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReport && (
        <ReportActionModal
          open={open}
          onClose={handleClose}
          hotelId={selectedReport.hotelId._id}
          ownerId={selectedReport.hotelId.ownerId}
          id={selectedReport._id}
        />
      )}
    </div>
  );
};

export default AdminReports;

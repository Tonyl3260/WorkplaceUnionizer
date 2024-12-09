import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import './ManageMembersModal.css'

type Member = {
  id: string;
  userId: string;
  displayName: string | null;
  role: string;
};

interface ManageMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  unionId: string;
}

const ManageMembersModal: React.FC<ManageMembersModalProps> = ({ isOpen, onClose, unionId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) fetchMembers();
  }, [isOpen]);

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/unions/${unionId}/members`);
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      setMembers(data.data);
    } catch (err) {
      setError("Unable to fetch members.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMembers = async () => {
    if (selectedMembers.length === 0) {
      alert("No members selected for removal.");
      return;
    }
  
    try {
      console.log("Removing members:", selectedMembers);
      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/unions/remove-members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unionId, userIds: selectedMembers }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.message || "Failed to remove members");
      }
  
      const data = await response.json();
      alert(data.message);
      fetchMembers(); // Refresh the list
      setSelectedMembers([]); // Clear the selection
    } catch (err) {
      alert("Failed to remove members. Please try again.");
      console.error("Frontend error:", err.message);
    }
  };
  

  const toggleSelectMember = (userId: string) => {
    console.log("Toggling member:", userId);
    setSelectedMembers((prev) => {
      const updated = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];
      console.log("Updated selectedMembers:", updated);
      return updated;
    });
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="manage-members-modal">
        <h2>Manage Members</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
            <ul className="members-list">
            {members.map((member) => (
              <li key={member.id} className="member-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleSelectMember(member.id)}
                  />
                  {member.displayName || "Unknown"} - {member.role}
                </label>
              </li>
            ))}
          </ul>
          
        )}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleRemoveMembers} className="remove-button">
            Remove Selected Members
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ManageMembersModal;

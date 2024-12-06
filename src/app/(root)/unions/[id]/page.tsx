import { useState, useEffect } from "react";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import Layout from "@/components/Layout";

const UnionPage = ({ params }: { params: { id: string } }) => {
  const unionId = params.id; // Extract the union ID from the URL params
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(`http://localhost:5000/polls?unionId=${unionId}`);
        if (!response.ok) throw new Error("Failed to fetch polls.");
        const data = await response.json();
        setPolls(data.polls); // Assuming backend returns { polls: [...] }
      } catch (error) {
        console.error("Error fetching polls:", error);
        setPolls([]); // Handle errors gracefully
      }
    };

    if (unionId) {
      fetchPolls();
    }
  }, [unionId]);

  return (
    <Layout>
      <AppSidebar polls={polls} unionId={unionId} />
      <div>
        {/* Other union-related content */}
        <h1>Union Details</h1>
      </div>
    </Layout>
  );
};

export default UnionPage;

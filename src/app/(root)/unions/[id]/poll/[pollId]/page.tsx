"use client";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks/redux";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

interface PageProps {
  params: {
    unionId: string;
    pollId: string;
  };
}

const PollPage: FC<PageProps> = ({ params }) => {
  const { pollId } = params;
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);

        // Fetch poll details from the backend
        const response = await fetch(
          `http://localhost:5000/polls/${pollId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch poll data.");
        }

        const data = await response.json();
        setPoll(data.Poll); 
        setError(null);
      } catch (error) {
        console.error("Error fetching poll data:", error);
        setError("Unable to fetch poll data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId]);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>{error}</Layout>;
  }

  if (!poll) {
    return <Layout>No poll found.</Layout>;
  }

  return (
    <Layout>
      <div className="poll-details">
        <h1>{poll.name}</h1>
        <p>{poll.description}</p>
        <div>
          <strong>Yes Votes:</strong> {poll.yesCount}
        </div>
        <div>
          <strong>No Votes:</strong> {poll.noCount}
        </div>
      </div>
    </Layout>
  );
};

export default PollPage;

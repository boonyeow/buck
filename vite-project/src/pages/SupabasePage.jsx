import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import LoginForm from "../components/LoginForm";

const SupabasePage = () => {
  const client = supabase;
  console.log(client);
  const [fetchError, setFetchError] = useState(null);
  const [bucky, setBucky] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    setAccessToken(localStorage.getItem("ACCESS_TOKEN"));
  }, []);

  const fetchBucky = async () => {
    const { data, error } = await supabase.from("bucky").select();

    if (error) {
      setFetchError(error);
      setBucky(null);
      console.log(error);
    }

    if (data) {
      setFetchError(null);
      setBucky(data);
    }
  };

  useEffect(() => {
    fetchBucky();
  }, []);
  return (
    <div>
      <Link to="/">home</Link>
      {fetchError && <p>{JSON.stringify(fetchError)}</p>}
      {bucky && bucky.map((x) => <p>{JSON.stringify(x)}</p>)}

      <div>
        <CreateUserForm />
      </div>

      <div>
        <LoginForm />
      </div>
      <button onClick={fetchBucky}>refetch</button>
    </div>
  );
};

export default SupabasePage;

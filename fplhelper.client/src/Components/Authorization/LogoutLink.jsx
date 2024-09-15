import { useNavigate } from "react-router-dom";

function LogoutLink({ children }) {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""
        })
            .then((data) => {
                if (data.ok) {
                    navigate("/login");
                } else {
                    console.log("Logout failed");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <a href="#" onClick={handleSubmit}>{children}</a>
        </>
    );
}

export default LogoutLink;

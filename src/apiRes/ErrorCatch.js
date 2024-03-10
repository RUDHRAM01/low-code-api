import toast from "react-hot-toast";


const Error = (res) => {
    toast.error(res.response.data.error, {
        position: "top-center",
        duration: 4000,
    });
}

export {Error};

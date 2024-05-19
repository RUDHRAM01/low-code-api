import toast from "react-hot-toast";

const Error = (res) => {
    if(res.response){
        toast.error(res.response.data.error, {
            position: "top-center",
            duration: 4000,
        });
    }else{
        toast.error(res, {
            position: "top-center",
            duration: 4000,
        });
    }
}

export {Error};

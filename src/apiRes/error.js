const { toast } = require('react-hot-toast')

const Error = (res) => {
    return toast.error(res)
}

module.exports = {
    Error
}
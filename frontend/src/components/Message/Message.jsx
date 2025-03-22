
const Message = ({type, message}) => {
    const messageStyle = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white'
    }

    return (
        <div className={`p-4 rounded-lg mb-4 ${messageStyle[type]}`}>
            {message}
        </div>
    )
}

export default Message;
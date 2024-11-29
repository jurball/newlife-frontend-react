export default function FileEdit({ fileId })  {
    return (
        <form action={`/edit/${fileId}`} style={{display: 'block', margin: '0 10px'}}>
            <button style={{width: "100%"}}>Edit</button>
            <div className="err"></div>
        </form>
    );
};
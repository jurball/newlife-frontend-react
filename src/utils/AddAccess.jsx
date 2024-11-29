export default function AddAccess({ fileId })  {
    return (
        <form action={`/accesses/${fileId}`} style={{ display: 'block', margin: '0 10px'  }}>
            <button style={{width: "100%"}}>Access</button>
            <div className="err"></div>
        </form>
    );
};
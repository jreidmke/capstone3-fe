import {useState, useEffect} from 'react';
import PrintApi from '../api/api';
import { useParams } from "react-router-dom";

function WriterDetails() {
    const { writerId } = useParams();
    const [writer, setWriter] = useState();
    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
        };
        getWriter();
    }, []);
    return(
        <div>
            <h1>Writer Details</h1>
            {writer ? <h1>{writer.firstName} {writer.lastName}</h1> : <h1>Loading</h1>}
        </div>
    )
};

export default WriterDetails
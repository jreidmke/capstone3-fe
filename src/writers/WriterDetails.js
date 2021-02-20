import {useState, useEffect} from 'react';
import PrintApi from '../api/api';
import { useParams } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';

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
    console.log(writer)
    return(
        <div>
            <h1>Writer Details</h1>
            {writer ? <h1>{writer.firstName} {writer.lastName} {writer.bio}</h1> : <h1>Loading</h1>}
            <h2>Portfolios</h2>
            {writer ? writer.portfolios.map(p => <PortfolioCard portfolio={p} key={p.id}/>) : "Pizza"}

        </div>
    )
};

export default WriterDetails
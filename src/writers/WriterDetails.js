import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';

function WriterDetails() {
    const { currentUser } = useContext(UserContext);
    const { writerId } = useParams();
    const [writer, setWriter] = useState();

    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
        };
        getWriter();
    }, []);

    console.log(currentUser)

    return(
        <div>
            <h1>Writer Details</h1>
            {writer ? <h1>{writer.firstName} {writer.lastName} {writer.bio}</h1> : <h1>Loading</h1>}
            <h2>Portfolios</h2> {currentUser.writerId==writerId ? <button><Link to={`/writers/${writerId}/portfolios/new`}>Add New Portfolio</Link></button> : ""}
            {writer ? writer.portfolios.map(p => <PortfolioCard portfolio={p} key={p.id}/>) : ""}

            <h2>Pieces {currentUser.writerId==writerId ? <button><Link to={`/writers/${writerId}/pieces/new`}>Add New Piece</Link></button> : ""}</h2>

            <h2><Link to={`/writers/${writerId}/pieces`}>Click here to see writer pieces</Link></h2>
            {currentUser.writerId == writerId ? <h1>This belongs to the writer</h1> : "THIS DOES NOT BELONG TO WRITER"}
        </div>
    )
};

export default WriterDetails